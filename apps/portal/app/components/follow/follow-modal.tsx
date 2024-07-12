import { useEffect, useRef, useState } from 'react'

import { Dialog, DialogContent, DialogFooter, Icon } from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import Toast from '@components/toast'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateTriple } from '@lib/hooks/useCreateTriple'
import { useDepositTriple } from '@lib/hooks/useDepositTriple'
import { useLoaderFetcher } from '@lib/hooks/useLoaderFetcher'
import { useRedeemTriple } from '@lib/hooks/useRedeemTriple'
import { transactionReducer } from '@lib/hooks/useTransactionReducer'
import { CREATE_RESOURCE_ROUTE } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useGenericTxState } from '@lib/utils/use-tx-reducer'
import { useFetcher, useLocation } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TransactionActionType, TransactionStateType } from 'types/transaction'
import { SessionUser } from 'types/user'
import { VaultDetailsType } from 'types/vault'
import { Abi, Address, decodeEventLog, formatUnits, parseUnits } from 'viem'
import { useBalance, useBlockNumber, usePublicClient } from 'wagmi'

import FollowButton from './follow-button'
import FollowForm from './follow-form'
import FollowToast from './follow-toast'
import UnfollowButton from './unfollow-button'

const initialTxState: TransactionStateType = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

interface FollowModalProps {
  user: SessionUser
  contract: string
  open: boolean
  identity: IdentityPresenter
  claim: ClaimPresenter
  vaultDetails: VaultDetailsType
  onClose?: () => void
}

export default function FollowModal({
  user,
  contract,
  open = false,
  identity,
  claim,
  vaultDetails,
  onClose = () => {},
}: FollowModalProps) {
  const fetchReval = useFetcher()
  const formRef = useRef(null)
  const [val, setVal] = useState('0.001')
  const [mode, setMode] = useState<'follow' | 'unfollow'>('follow')
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
  const userVaultId = identity.vault_id

  let vault_id: string = '0'
  vault_id = claim ? claim.vault_id : '0'

  const {
    conviction_price = '0',
    user_conviction = '0',
    user_assets = '0',
    min_deposit = '0',
    formatted_entry_fee = '0',
    formatted_exit_fee = '0',
  } = vaultDetails ? vaultDetails : {}

  const depositHook = useDepositTriple(contract)

  const redeemHook = useRedeemTriple(contract)

  const createHook = useCreateTriple()

  const {
    writeContractAsync,
    receipt: txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = claim === undefined
    ? createHook
    : mode === 'follow'
      ? depositHook
      : redeemHook

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
          functionName:
            claim === undefined
              ? 'createTriple'
              : actionType === 'follow'
                ? 'depositTriple'
                : 'redeemTriple',
          args:
            claim === undefined
              ? [iVaultId, followVaultId, userVaultId]
              : actionType === 'follow'
                ? [user.details?.wallet?.address as `0x${string}`, vault_id]
                : [
                    user_conviction,
                    user.details?.wallet?.address as `0x${string}`,
                    vault_id,
                  ],
          value:
            claim === undefined
              ? BigInt(tripleCost) + parseUnits(val === '' ? '0' : val, 18)
              : actionType === 'follow'
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
          toast.custom(
            () => (
              <Toast
                title="Error"
                description={errorMessage}
                icon={
                  <Icon
                    name="triangle-exclamation"
                    className="h-3 w-3 text-destructive"
                  />
                }
              />
            ),
            {
              duration: 5000,
            },
          )
          return
        }
      }
    }
  }

  const handleFollow = useHandleAction('follow')
  const handleUnfollow = useHandleAction('unfollow')

  useEffect(() => {
    if (isError) {
      reset()
    }
  }, [isError, reset])

  useEffect(() => {
    let assets = ''
    const receipt = txReceipt
    const action = mode === 'follow' ? 'Followed' : 'Unfollowed'

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

      if (
        topics.args.sender === (user?.details?.wallet?.address as `0x${string}`)
      ) {
        assets =
          mode === 'follow'
            ? (topics.args as BuyArgs).userAssetsAfterTotalFees.toString()
            : (topics.args as SellArgs).assetsForReceiver.toString()

        toast.custom(() => (
          <FollowToast
            action={action}
            assets={assets}
            txHash={txReceipt.transactionHash}
          />
        ))
        setLastTxHash(txReceipt.transactionHash)
      }
    }
  }, [txReceipt, user.details?.wallet?.address, mode, reset, lastTxHash])

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
    address: user.details?.wallet?.address as `0x${string}`,
  })

  useEffect(() => {
    if (blockNumber && blockNumber % 5n === 0n) {
      queryClient.invalidateQueries({ queryKey })
    }
  }, [blockNumber, queryClient, queryKey])

  const walletBalance = formatUnits(balance?.value ?? 0n, 18)

  const handleFollowButtonClick = async () => {
    if (val < formatBalance(min_deposit, 18) || +val > +walletBalance) {
      setShowErrors(true)
      return
    }
    handleFollow()
  }

  const handleUnfollowButtonClick = async () => {
    if (+val > +(user_conviction ?? '0')) {
      setShowErrors(true)
      return
    }
    handleUnfollow()
  }

  const location = useLocation()

  useEffect(() => {
    dispatch({ type: 'START_TRANSACTION' })
  }, [location])

  const handleClose = () => {
    onClose()
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
          <FollowForm
            walletBalance={walletBalance}
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
            <UnfollowButton
              setMode={setMode}
              handleAction={handleUnfollowButtonClick}
              handleClose={handleClose}
              dispatch={dispatch}
              state={state}
              user_conviction={user_conviction ?? '0'}
              className={`${(user_conviction && user_conviction > '0' && state.status === 'idle') || mode !== 'follow' ? '' : 'hidden'}`}
            />
            <FollowButton
              val={val}
              setMode={setMode}
              handleAction={handleFollowButtonClick}
              handleClose={handleClose}
              dispatch={dispatch}
              state={state}
              min_deposit={min_deposit}
              walletBalance={walletBalance}
              conviction_price={conviction_price ?? '0'}
              user_assets={user_assets ?? '0'}
              setValidationErrors={setValidationErrors}
              setShowErrors={setShowErrors}
              className={`${mode === 'unfollow' && 'hidden'}`}
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
