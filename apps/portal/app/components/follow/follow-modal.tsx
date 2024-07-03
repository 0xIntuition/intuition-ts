import { useEffect, useRef, useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositTriple } from '@lib/hooks/useDepositTriple'
import { useRedeemTriple } from '@lib/hooks/useRedeemTriple'
import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useGenericTxState } from '@lib/utils/use-tx-reducer'
import { Cookie } from '@remix-run/node'
import { useFetcher, useLocation } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { SessionUser } from 'types/user'
import { VaultDetailsType } from 'types/vault'
import { Abi, Address, decodeEventLog, formatUnits, parseUnits } from 'viem'
import { useBalance, useBlockNumber } from 'wagmi'

import FollowButton from './follow-button'
import FollowForm from './follow-form'
import FollowToast from './follow-toast'
import UnfollowButton from './unfollow-button'

const initialTxState: StakeTransactionState = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

interface FollowModalProps {
  user: SessionUser
  tosCookie: Cookie
  contract: string
  open: boolean
  identity: IdentityPresenter
  claim: ClaimPresenter
  onClose?: () => void
  direction?: 'for' | 'against'
  min_deposit: string
}

export default function FollowModal({
  user,
  tosCookie,
  contract,
  open = false,
  onClose = () => {},
  identity,
  claim,
  direction,
  min_deposit,
}: FollowModalProps) {
  const fetchReval = useFetcher()
  const formRef = useRef(null)
  const [val, setVal] = useState('')
  const [mode, setMode] = useState<'follow' | 'unfollow'>('follow')
  const [loading, setLoading] = useState(false)
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const { state, dispatch } = useGenericTxState<
    StakeTransactionState,
    StakeTransactionAction
  >(stakeTransactionReducer, initialTxState)

  let vault_id: string = '0'
  vault_id = direction === 'for' ? claim.vault_id : claim.counter_vault_id

  let user_conviction: string = '0'
  user_conviction =
    direction === 'for'
      ? claim.user_conviction_for
      : claim.user_conviction_against

  let conviction_price: string = '0'
  conviction_price =
    direction === 'for'
      ? claim.for_conviction_price
      : claim.against_conviction_price

  let user_assets: string = '0'
  user_assets =
    direction === 'for' ? claim.user_assets_for : claim.user_assets_against

  const depositHook = useDepositTriple(contract)

  const redeemHook = useRedeemTriple(contract)

  const {
    writeContractAsync,
    receipt: txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    onReceipt,
    reset,
  } = mode === 'follow' ? depositHook : redeemHook

  const useHandleAction = (actionType: string) => {
    return async () => {
      setLoading(true)
      try {
        writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName:
            actionType === 'follow' ? 'depositTriple' : 'redeemTriple',
          args:
            actionType === 'follow'
              ? [user.details?.wallet?.address as `0x${string}`, vault_id]
              : [
                  parseUnits(
                    val === ''
                      ? '0'
                      : (
                          Number(val) /
                          Number(formatUnits(BigInt(conviction_price), 18))
                        ).toString(),
                    18,
                  ),
                  user.details?.wallet?.address as `0x${string}`,
                  vault_id,
                ],
          value:
            actionType === 'follow'
              ? parseUnits(val === '' ? '0' : val, 18)
              : undefined,
        })
        onReceipt(() => {
          fetchReval.submit(formRef.current, {
            method: 'POST',
          })
          dispatch({ type: 'TRANSACTION_COMPLETE' })
          setLoading(false)
          reset()
        })
      } catch (e) {
        setLoading(false)
        if (e instanceof Error) {
          logger('error', e)
          let message = 'Failed transaction'
          if (e.message.includes('insufficient')) {
            message = "Insufficient Funds: Ask your gf's boyfriend for more ETH"
          }
          if (e.message.includes('rejected')) {
            message = 'Transaction rejected: Are we not so back?'
          }
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: message,
          })
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
      setLoading(false)
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
      dispatch({ type: 'CONFIRM_TRANSACTION' })
    }
    if (awaitingOnChainConfirmation) {
      dispatch({ type: 'TRANSACTION_PENDING' })
    }
    if (txReceipt) {
      dispatch({ type: 'TRANSACTION_CONFIRMED' })
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
    txReceipt,
    dispatch,
  ])

  const isLoading =
    !!awaitingWalletConfirmation ||
    !!awaitingOnChainConfirmation ||
    loading ||
    state.status === 'confirm' ||
    state.status === 'pending' ||
    state.status === 'confirmed'

  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, queryKey } = useBalance({
    address: user.details?.wallet?.address as `0x${string}`,
  })

  useEffect(() => {
    if (blockNumber && blockNumber % 5n === 0n)
      queryClient.invalidateQueries({ queryKey })
  }, [blockNumber, queryClient, queryKey])

  const walletBalance = formatUnits(balance?.value ?? 0n, 18)

  const [latestVaultDetails, setLatestVaultDetails] =
    useState<VaultDetailsType>()

  const {
    conviction_price: latest_conviction_price,
    user_conviction: latest_user_conviction,
    formatted_entry_fee,
    formatted_exit_fee,
  } = latestVaultDetails ?? {}

  const vaultContractDataFetcher = useFetcher<VaultDetailsType>()
  const vaultContractDataResourceUrl = `/resources/stake?contract=${contract}&vid=${vault_id}&wallet=${user.details?.wallet?.address}`
  const vaultContractDataLoadRef = useRef(vaultContractDataFetcher.load)

  useEffect(() => {
    vaultContractDataLoadRef.current = vaultContractDataFetcher.load
  })
  useEffect(() => {
    vaultContractDataLoadRef.current(vaultContractDataResourceUrl)
  }, [])

  useEffect(() => {
    if (vaultContractDataFetcher.data) {
      setLatestVaultDetails(vaultContractDataFetcher.data)
    }
  }, [vaultContractDataFetcher.data])

  const [showErrors, setShowErrors] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleFollowButtonClick = async () => {
    if (val < formatBalance(min_deposit, 18) || +val > +walletBalance) {
      setShowErrors(true)
      return
    }
    handleFollow()
  }

  const handleUnfollowButtonClick = async () => {
    if (+val > +(latest_user_conviction ?? user_conviction ?? '0')) {
      setShowErrors(true)
      return
    }
    handleUnfollow()
  }

  const location = useLocation()

  useEffect(() => {
    setVal('')
    dispatch({ type: 'START_TRANSACTION' })
  }, [location])

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      dispatch({ type: 'START_TRANSACTION' })
      reset()
      setVal('')
    }, 500)
  }

  return (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={() => {
        handleClose()
      }}
    >
      <DialogContent className="max-w-[476px]">
        <FollowForm
          user={user}
          walletBalance={walletBalance}
          identity={identity}
          claim={claim}
          conviction_price={latest_conviction_price ?? conviction_price ?? '0'}
          user_conviction={latest_user_conviction ?? user_conviction ?? '0'}
          user_assets={user_assets ?? '0'}
          entry_fee={formatted_entry_fee ?? '0'}
          exit_fee={formatted_exit_fee ?? '0'}
          direction={direction ? direction : undefined}
          val={val}
          setVal={setVal}
          dispatch={dispatch}
          state={state}
          fetchReval={fetchReval}
          formRef={formRef}
          isLoading={isLoading}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
        />
        <FollowButton
          user={user}
          tosCookie={tosCookie}
          val={val}
          setVal={setVal}
          setMode={setMode}
          handleAction={handleFollowButtonClick}
          dispatch={dispatch}
          state={state}
          min_deposit={min_deposit}
          walletBalance={walletBalance}
          setValidationErrors={setValidationErrors}
          setShowErrors={setShowErrors}
          conviction_price={latest_conviction_price ?? conviction_price ?? '0'}
        />
        <UnfollowButton
          user={user}
          tosCookie={tosCookie}
          val={val}
          setVal={setVal}
          setMode={setMode}
          handleAction={handleUnfollowButtonClick}
          dispatch={dispatch}
          state={state}
          user_conviction={latest_user_conviction ?? user_conviction ?? '0'}
          setValidationErrors={setValidationErrors}
          setShowErrors={setShowErrors}
          conviction_price={latest_conviction_price ?? conviction_price ?? '0'}
          className={`${latest_user_conviction ?? user_conviction >= '0' ? 'hidden' : ''}`}
        />
      </DialogContent>
    </Dialog>
  )
}

export type StakeTransactionState = {
  status: StakeTransactionStatus
  txHash?: `0x${string}`
  error?: string
}

export type StakeTransactionStatus =
  | 'idle'
  | 'review'
  | 'confirm'
  | 'pending'
  | 'confirmed'
  | 'complete'
  | 'hash'
  | 'error'

export type StakeTransactionAction =
  | { type: 'START_TRANSACTION' }
  | { type: 'REVIEW_TRANSACTION' }
  | { type: 'CONFIRM_TRANSACTION' }
  | { type: 'TRANSACTION_PENDING' }
  | { type: 'TRANSACTION_CONFIRMED' }
  | { type: 'TRANSACTION_COMPLETE'; txHash?: `0x${string}` }
  | { type: 'TRANSACTION_HASH'; txHash?: `0x${string}` }
  | { type: 'TRANSACTION_ERROR'; error: string }

const stakeTransactionReducer = (
  state: StakeTransactionState,
  action: StakeTransactionAction,
): StakeTransactionState => {
  switch (action.type) {
    case 'START_TRANSACTION':
      return { ...state, status: 'idle' }
    case 'REVIEW_TRANSACTION':
      return { ...state, status: 'review' }
    case 'CONFIRM_TRANSACTION':
      return { ...state, status: 'confirm' }
    case 'TRANSACTION_PENDING':
      return { ...state, status: 'pending' }
    case 'TRANSACTION_CONFIRMED':
      return { ...state, status: 'confirmed' }
    case 'TRANSACTION_COMPLETE':
      return {
        ...state,
        status: 'complete',
        txHash: action.txHash,
      }
    case 'TRANSACTION_HASH':
      return { ...state, status: 'hash', txHash: action.txHash }
    case 'TRANSACTION_ERROR':
      return { ...state, status: 'error', error: action.error }
    default:
      return state
  }
}
