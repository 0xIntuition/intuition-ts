import { useEffect, useRef, useState } from 'react'

import { Dialog, DialogContent, DialogFooter, toast } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  IdentityPresenter,
  TagEmbeddedPresenter,
} from '@0xintuition/api'

import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateTriple } from '@lib/hooks/useCreateTriple'
import { useDepositTriple } from '@lib/hooks/useDepositTriple'
import { useLoaderFetcher } from '@lib/hooks/useLoaderFetcher'
import { useRedeemTriple } from '@lib/hooks/useRedeemTriple'
import { transactionReducer } from '@lib/hooks/useTransactionReducer'
import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useGenericTxState } from '@lib/utils/use-tx-reducer'
import { useFetcher, useLocation } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { useQueryClient } from '@tanstack/react-query'
import { CREATE_RESOURCE_ROUTE } from 'consts'
import { TransactionActionType, TransactionStateType } from 'types/transaction'
import { VaultDetailsType } from 'types/vault'
import { Abi, Address, decodeEventLog, formatUnits, parseUnits } from 'viem'
import { useBalance, useBlockNumber, usePublicClient } from 'wagmi'

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
  contract?: string
  open: boolean
  tag: TagEmbeddedPresenter
  identity: IdentityPresenter
  claim?: ClaimPresenter
  vaultDetails?: VaultDetailsType
  onClose?: () => void
}

export default function SaveListModal({
  userWallet,
  contract,
  open = false,
  tag,
  identity,
  claim,
  vaultDetails,
  onClose = () => {},
}: SaveListModalProps) {
  const fetchReval = useFetcher()
  const formRef = useRef(null)
  const [val, setVal] = useState('0.001')
  const [mode, setMode] = useState<'save' | 'unsave'>('save')
  const [showErrors, setShowErrors] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const { state, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)
  const publicClient = usePublicClient()

  const iVaultId = '47'
  const followVaultId = '48'
  const tagVaultId = tag.vault_id

  logger('tag', tag)
  // let vault_id: string = '0'
  // vault_id = claim ? claim.vault_id : '0'
  const vault_id = '0'

  const {
    conviction_price = '0',
    user_conviction = '0',
    user_assets = '0',
    min_deposit = '0',
    formatted_entry_fee = '0',
    formatted_exit_fee = '0',
  } = vaultDetails ? vaultDetails : {}

  const depositHook = useDepositTriple(identity.contract)

  const redeemHook = useRedeemTriple(identity.contract)

  const createHook = useCreateTriple()

  const {
    writeContractAsync,
    receipt: txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = !claim ? createHook : mode === 'save' ? depositHook : redeemHook

  const feeFetcher = useLoaderFetcher<CreateLoaderData>(CREATE_RESOURCE_ROUTE)

  const { tripleCost } = (feeFetcher.data as CreateLoaderData) ?? {
    atomEquityFeeRaw: BigInt(0),
    atomCost: BigInt(0),
    tripleCost: BigInt(0),
  }

  const useHandleAction = (actionType: string) => {
    return async () => {
      try {
        const txHash = await writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName: !claim
            ? 'createTriple'
            : actionType === 'follow'
              ? 'depositTriple'
              : 'redeemTriple',
          args: !claim
            ? [iVaultId, followVaultId, tagVaultId]
            : actionType === 'save'
              ? [userWallet as `0x${string}`, vault_id]
              : [user_conviction, userWallet as `0x${string}`, vault_id],
          value: !claim
            ? BigInt(tripleCost) + parseUnits(val === '' ? '0' : val, 18)
            : actionType === 'save'
              ? parseUnits(val === '' ? '0' : val, 18)
              : undefined,
        })
        if (txHash) {
          dispatch({ type: 'TRANSACTION_PENDING' })
          const receipt = await publicClient?.waitForTransactionReceipt({
            hash: txHash,
          })
          logger('receipt', receipt)
          logger('txHash', txHash)
          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash,
            txReceipt: receipt!,
          })
          fetchReval.submit(formRef.current, {
            method: 'POST',
          })
        }
      } catch (error) {
        logger('error', error)
        if (error instanceof Error) {
          let errorMessage = 'Failed transaction'
          if (error.message.includes('insufficient')) {
            errorMessage = 'Insufficient funds'
          }
          if (error.message.includes('rejected')) {
            errorMessage = 'Transaction rejected'
          }
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: errorMessage,
          })
          toast.error(errorMessage)
          return
        }
      }
    }
  }

  const handleSave = useHandleAction('save')
  const handleUnsave = useHandleAction('unsave')

  useEffect(() => {
    if (isError) {
      reset()
    }
  }, [isError, reset])

  useEffect(() => {
    let assets = ''
    const receipt = txReceipt
    const action = mode === 'save' ? 'Save' : 'Unsave'

    type BuyArgs = {
      sender: Address
      receiver?: Address
      owner?: Address
      userAssetsAfterTotalFees: bigint
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
          mode === 'save'
            ? (topics.args as BuyArgs).userAssetsAfterTotalFees.toString()
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

  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, queryKey } = useBalance({
    address: userWallet as `0x${string}`,
  })

  useEffect(() => {
    if (blockNumber && blockNumber % 5n === 0n) {
      queryClient.invalidateQueries({ queryKey })
    }
  }, [blockNumber, queryClient, queryKey])

  const walletBalance = formatUnits(balance?.value ?? 0n, 18)

  const handleSaveButtonClick = async () => {
    if (val < formatBalance(min_deposit, 18) || +val > +walletBalance) {
      setShowErrors(true)
      return
    }
    handleSave()
  }

  const handleUnsaveButtonClick = async () => {
    if (+val > +(user_conviction ?? '0')) {
      setShowErrors(true)
      return
    }
    handleUnsave()
  }

  const location = useLocation()

  useEffect(() => {
    dispatch({ type: 'START_TRANSACTION' })
  }, [location])

  const handleClose = () => {
    onClose()
    setMode('save')
    setTimeout(() => {
      dispatch({ type: 'START_TRANSACTION' })
      reset()
    }, 500)
  }

  const isTransactionStarted = [
    'approve-transaction',
    'transaction-pending',
    'awaiting',
    'confirm',
  ].includes(state.status)

  return (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={() => {
        handleClose()
      }}
    >
      <DialogContent className="flex flex-col w-[476px] h-[500px] gap-0">
        <div className="flex-grow">
          <SaveForm
            walletBalance={walletBalance}
            tag={tag}
            identity={identity}
            claim={claim}
            user_assets={user_assets ?? '0'}
            entry_fee={formatted_entry_fee ?? '0'}
            exit_fee={formatted_exit_fee ?? '0'}
            val={val}
            setVal={setVal}
            mode={mode}
            dispatch={dispatch}
            state={state}
            fetchReval={fetchReval}
            formRef={formRef}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
          />
        </div>
        {!isTransactionStarted && (
          <DialogFooter className="!justify-center !items-center gap-5">
            <UnsaveButton
              setMode={setMode}
              handleAction={handleUnsaveButtonClick}
              handleClose={handleClose}
              dispatch={dispatch}
              state={state}
              user_conviction={user_conviction ?? '0'}
              className={`${(user_conviction && user_conviction > '0' && state.status === 'idle') || mode !== 'save' ? '' : 'hidden'}`}
            />
            <SaveButton
              val={val}
              setMode={setMode}
              handleAction={handleSaveButtonClick}
              handleClose={handleClose}
              dispatch={dispatch}
              state={state}
              min_deposit={min_deposit}
              walletBalance={walletBalance}
              conviction_price={conviction_price ?? '0'}
              user_assets={user_assets ?? '0'}
              setValidationErrors={setValidationErrors}
              setShowErrors={setShowErrors}
              className={`${mode === 'unsave' && 'hidden'}`}
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
