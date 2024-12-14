import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  Skeleton,
  toast,
} from '@0xintuition/1ui'
import { GetAtomQuery } from '@0xintuition/graphql'

import { multivaultAbi } from '@lib/abis/multivault'
import { useSaveListMutation } from '@lib/hooks/mutations/useSaveListMutation'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import { transactionReducer } from '@lib/hooks/useTransactionReducer'
import { saveListModalAtom } from '@lib/state/store'
import { useGenericTxState } from '@lib/utils/use-tx-reducer'
import { useLocation } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { MIN_DEPOSIT } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'
import { useAtomValue } from 'jotai'
import { Address, decodeEventLog, formatUnits } from 'viem'
import { useAccount, usePublicClient } from 'wagmi'

import SaveButton from './save-button'
import SaveForm from './save-form'
import SaveToast from './save-toast'
import UnsaveButton from './unsave-button'

const initialTxState: TransactionStateType = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

interface SaveListModalProps {
  userWallet: string
  open: boolean
  tagAtom: GetAtomQuery['atom'] | null
  atom: GetAtomQuery['atom'] | null
  contract: string
  onClose?: () => void
  min_deposit?: string
}

export default function SaveListModal({
  userWallet,
  open = false,
  tagAtom,
  atom,
  contract,
  onClose = () => {},
  min_deposit,
}: SaveListModalProps) {
  const formattedMinDeposit = min_deposit
    ? formatUnits(BigInt(BigInt(min_deposit)), 18)
    : null
  const [val, setVal] = useState(formattedMinDeposit ?? MIN_DEPOSIT)
  const [mode, setMode] = useState<'deposit' | 'redeem'>('deposit')
  const [showErrors, setShowErrors] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const { state, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)
  const publicClient = usePublicClient()

  const [isLoading, setIsLoading] = useState(true)

  const { id: vaultId } = useAtomValue(saveListModalAtom)

  const queryClient = useQueryClient()
  const { data: vaultDetails } = useGetVaultDetails(
    contract,
    vaultId ?? '',
    undefined,
    {
      queryKey: ['get-vault-details', contract, vaultId],
      enabled: open,
    },
  )

  useEffect(() => {
    if (vaultDetails) {
      setIsLoading(false)
    }
  }, [vaultDetails])

  const {
    mutateAsync: stake,
    txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = useSaveListMutation(
    contract,
    vaultDetails?.user_conviction ?? '0',
    mode as 'deposit' | 'redeem',
  )

  const handleAction = async () => {
    try {
      const txHash = await stake({
        val,
        userWallet,
        vaultId: vaultId ?? '',
      })

      if (publicClient && txHash) {
        dispatch({ type: 'TRANSACTION_PENDING' })
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })

        dispatch({
          type: 'TRANSACTION_COMPLETE',
          txHash,
          txReceipt: receipt,
        })

        await queryClient.refetchQueries({
          queryKey: ['get-vault-details', contract, vaultId],
        })
      }
    } catch (error) {
      console.error('Stake error:', error) // Add error logging
      dispatch({
        type: 'TRANSACTION_ERROR',
        error: 'Error processing transaction',
      })
    }
  }

  useEffect(() => {
    if (isError) {
      reset()
    }
  }, [isError, reset])

  useEffect(() => {
    let assets = ''
    const receipt = txReceipt
    const action = mode === 'deposit' ? 'Save' : 'Unsave'

    type BuyArgs = {
      sender: Address
      receiver?: Address
      owner?: Address
      senderAssetsAfterTotalFees: bigint
      sharesForReceiver: bigint
      entryFee: bigint
      id: bigint
    }

    type SellArgs = {
      sender: Address
      receiver?: Address
      owner?: Address
      shares: bigint
      assetsForReceiver: bigint
      exitFee: bigint
      id: bigint
    }

    type EventLogArgs = BuyArgs | SellArgs

    if (
      txReceipt &&
      receipt?.logs[0].data &&
      receipt?.transactionHash !== lastTxHash
    ) {
      const decodedLog = decodeEventLog({
        abi: multivaultAbi,
        data: receipt?.logs[0].data,
        topics: receipt?.logs[0].topics,
      })

      const topics = decodedLog as unknown as {
        eventName: string
        args: EventLogArgs
      }

      if (topics.args.sender === (userWallet as `0x${string}`)) {
        assets =
          mode === 'deposit'
            ? (topics.args as BuyArgs).senderAssetsAfterTotalFees.toString()
            : (topics.args as SellArgs).assetsForReceiver.toString()

        toast.custom(() => (
          <SaveToast
            action={action}
            assets={assets}
            txHash={txReceipt.transactionHash}
          />
        ))
        setLastTxHash(txReceipt.transactionHash)
      }
    }
  }, [txReceipt, userWallet, mode, reset, lastTxHash])

  useEffect(() => {
    if (awaitingWalletConfirmation) {
      dispatch({ type: 'APPROVE_TRANSACTION' })
    }
    if (awaitingOnChainConfirmation) {
      dispatch({ type: 'TRANSACTION_PENDING' })
    }
    if (isError) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        error: 'Error processing transaction',
      })
    }
  }, [
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    dispatch,
  ])

  const { address } = useAccount()

  const walletBalance = useGetWalletBalance(
    address ?? (userWallet as `0x${string}`),
  )

  const handleSaveButtonClick = async () => {
    if (!vaultDetails) {
      throw new Error('Missing required parameters')
    }
    if (+val < +MIN_DEPOSIT || +val > +walletBalance) {
      setShowErrors(true)
      return
    }
    handleAction()
  }

  const handleUnsaveButtonClick = async () => {
    if (!vaultDetails) {
      throw new Error('Missing required parameters')
    }
    if (+val > +(vaultDetails.user_conviction ?? '0')) {
      setShowErrors(true)
      return
    }
    handleAction()
  }

  const location = useLocation()

  useEffect(() => {
    dispatch({ type: 'START_TRANSACTION' })
    // avoids adding dispatch since we only want to re-render on this single type
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [location])

  const handleClose = () => {
    onClose()
    setMode('deposit')
    setIsLoading(true)
    setVal(formattedMinDeposit ?? MIN_DEPOSIT)
    setShowErrors(false)
    setValidationErrors([])
    setTimeout(() => {
      dispatch({ type: 'START_TRANSACTION' })
      reset()
    }, 500)
  }

  useEffect(() => {
    if (open) {
      setMode('deposit')
      setVal(formattedMinDeposit ?? MIN_DEPOSIT)
      setShowErrors(false)
      setValidationErrors([])
      dispatch({ type: 'START_TRANSACTION' })
    }
  }, [open, dispatch])

  const isTransactionStarted = [
    'approve-transaction',
    'transaction-pending',
    'awaiting',
    'confirm',
  ].includes(state.status)

  return vaultId ? (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={() => {
        handleClose()
      }}
    >
      <DialogContent
        className="flex flex-col md:w-[476px] gap-0"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SaveForm
          tagAtom={tagAtom}
          atom={atom}
          user_assets={vaultDetails?.user_assets ?? '0'}
          entry_fee={vaultDetails?.formatted_entry_fee ?? '0'}
          exit_fee={vaultDetails?.formatted_exit_fee ?? '0'}
          min_deposit={min_deposit ?? vaultDetails?.min_deposit ?? '0'}
          val={val}
          setVal={setVal}
          mode={mode}
          dispatch={dispatch}
          state={state}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
          isLoading={isLoading}
        />
        <DialogFooter className="!justify-center !items-center gap-5">
          {!isTransactionStarted ? (
            isLoading && state.status !== 'complete' ? (
              <>
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-7 w-40" />
              </>
            ) : (
              <>
                <UnsaveButton
                  setMode={setMode}
                  handleAction={handleUnsaveButtonClick}
                  handleClose={handleClose}
                  dispatch={dispatch}
                  state={state}
                  vaultId={vaultId}
                  user_conviction={vaultDetails?.user_conviction ?? '0'}
                  className={`${(vaultDetails?.user_conviction && vaultDetails?.user_conviction > '0' && state.status === 'idle') || mode !== 'deposit' ? '' : 'hidden'}`}
                />
                <SaveButton
                  val={val}
                  setMode={setMode}
                  handleAction={handleSaveButtonClick}
                  handleClose={handleClose}
                  dispatch={dispatch}
                  state={state}
                  vaultId={vaultId}
                  min_deposit={vaultDetails?.min_deposit ?? '0'}
                  walletBalance={walletBalance}
                  conviction_price={vaultDetails?.conviction_price ?? '0'}
                  user_assets={vaultDetails?.user_assets ?? '0'}
                  setValidationErrors={setValidationErrors}
                  setShowErrors={setShowErrors}
                  className={`${mode === 'redeem' && 'hidden'}`}
                />
              </>
            )
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null
}
