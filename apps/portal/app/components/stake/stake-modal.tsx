import { useEffect, useRef, useState } from 'react'

import {
  Button,
  Claim,
  Dialog,
  DialogContent,
  DialogHeader,
  Identity,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositAtom } from '@lib/hooks/useDepositAtom'
import { useRedeemAtom } from '@lib/hooks/useRedeemAtom'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useGenericTxState } from '@lib/utils/use-tx-reducer'
import { Cookie } from '@remix-run/node'
import { Link, useFetcher, useLocation } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { ExternalLinkIcon, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import { SessionUser } from 'types/user'
import { VaultDetailsType } from 'types/vault'
import { Abi, Address, decodeEventLog, formatUnits, parseUnits } from 'viem'
import { useBalance, useBlockNumber } from 'wagmi'

import UserConvictionIcon from '../svg/user-conviction-icon'
import StakeButton from './stake-button'
import StakeForm from './stake-form'
import StakeToast from './stake-toast'

const initialTxState: StakeTransactionState = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

interface StakeModalProps {
  user: SessionUser
  tosCookie: Cookie
  contract: string
  open: boolean
  identity?: IdentityPresenter
  claim?: ClaimPresenter
  onClose?: () => void
  direction?: 'for' | 'against'
  min_deposit: string
}

export default function StakeModal({
  user,
  tosCookie,
  contract,
  open = false,
  onClose = () => {},
  identity,
  claim,
  direction,
  min_deposit,
}: StakeModalProps) {
  const fetchReval = useFetcher()
  const [stakeModalState] = useAtom(stakeModalAtom)
  const { mode, modalType } = stakeModalState
  const formRef = useRef(null)
  const [val, setVal] = useState('')
  const [loading, setLoading] = useState(false)
  const [ethOrConviction, setEthOrConviction] = useState<'conviction' | 'eth'>(
    'eth',
  )
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const { state, dispatch } = useGenericTxState<
    StakeTransactionState,
    StakeTransactionAction
  >(stakeTransactionReducer, initialTxState)

  const identityShouldOverride = identity && identity.vault_id !== '0'

  let vault_id: string | undefined
  if (identityShouldOverride) {
    vault_id = identity.vault_id
  } else if (claim) {
    vault_id = direction === 'for' ? claim.vault_id : claim.counter_vault_id
  }

  let user_conviction: string | undefined
  if (identityShouldOverride) {
    user_conviction = identity.user_conviction
  } else if (claim) {
    user_conviction =
      direction === 'for'
        ? claim.user_conviction_for
        : claim.user_conviction_against
  }

  let conviction_price: string | undefined
  if (identityShouldOverride) {
    conviction_price = identity.conviction_price
  } else if (claim) {
    conviction_price =
      direction === 'for'
        ? claim.for_conviction_price
        : claim.against_conviction_price
  }

  let user_assets: string | undefined
  if (identityShouldOverride) {
    user_assets = identity.user_assets
  } else if (claim) {
    user_assets =
      direction === 'for' ? claim.user_assets_for : claim.user_assets_against
  }

  const depositHook = useDepositAtom(contract)

  const redeemHook = useRedeemAtom(contract)

  const {
    writeContractAsync,
    receipt: txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    onReceipt,
    reset,
  } = mode === 'deposit' ? depositHook : redeemHook

  const useHandleAction = (actionType: string) => {
    return async () => {
      setLoading(true)
      try {
        writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName: actionType === 'buy' ? 'depositAtom' : 'redeemAtom',
          args:
            actionType === 'buy'
              ? [user.details?.wallet?.address as `0x${string}`, vault_id]
              : [
                  parseUnits(val, 18),
                  user.details?.wallet?.address as `0x${string}`,
                  vault_id,
                ],
          value:
            actionType === 'buy'
              ? parseUnits(val === '' ? '0' : val, 18)
              : parseUnits(
                  val === ''
                    ? '0'
                    : (
                        Number(val) * Number(formatUnits(conviction_price, 18))
                      ).toString(),
                  18,
                ),
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

  const handleDeposit = useHandleAction('buy')
  const handleRedeem = useHandleAction('sell')

  const action = mode === 'deposit' ? handleDeposit : handleRedeem

  useEffect(() => {
    if (isError) {
      reset()
      setLoading(false)
    }
  }, [isError, reset])

  useEffect(() => {
    let assets = ''
    let shares = ''
    const receipt = txReceipt
    const action = mode === 'deposit' ? 'Bought' : 'Sold'

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
          mode === 'deposit'
            ? (topics.args as BuyArgs).userAssetsAfterTotalFees.toString()
            : (topics.args as SellArgs).assetsForReceiver.toString()
        shares =
          mode === 'deposit'
            ? (topics.args as BuyArgs).sharesForReceiver.toString()
            : (topics.args as SellArgs).shares.toString()

        toast.custom(() => (
          <StakeToast
            action={action}
            assets={assets}
            conviction={shares}
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

  const walletBalance = balance?.formatted ?? ''

  const [latestVaultDetails, setLatestVaultDetails] =
    useState<VaultDetailsType>()

  const {
    conviction_price: latest_conviction_price,
    user_conviction: latest_user_conviction,
  } = latestVaultDetails ?? {}

  const vaultContractDataFetcher = useFetcher<VaultDetailsType>()
  const vaultContractDataResourceUrl = `/resources/stake?contract=${contract}&vid=${vault_id}`
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

  const handleStakeButtonClick = async () => {
    if (
      (mode === 'deposit' && val < formatBalance(min_deposit, 18)) ||
      +val > (mode === 'deposit' ? +walletBalance : +(user_conviction ?? '0'))
    ) {
      setShowErrors(true)
      return
    }
    action()
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
      <DialogContent>
        <DialogHeader className="py-4">
          <div className="absolute top-5 flex flex-row items-center gap-2 align-baseline text-primary-400">
            <h2 className="text-xl text-white/70 font-normal">
              Stake{' '}
              {direction
                ? (direction === 'for' ? 'for' : 'against') + ' Claim'
                : 'on Identity'}
            </h2>
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger className="z-50">
                  <HelpCircle className="h-4 w-4 text-neutral-500 transition-colors duration-300 hover:text-neutral-400" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[230px]" side="right">
                  <div className="mb-2 flex flex-row items-center gap-2">
                    <div
                      className={`flex items-center justify-center rounded-full border-[0.5px] p-[3px] ${
                        direction === 'for'
                          ? 'border-green-500 bg-green-700 text-green-300'
                          : direction === 'against'
                            ? 'border-red-500 bg-red-700 text-red-300'
                            : 'border-primary-300 text-primary-300'
                      }`}
                    >
                      <UserConvictionIcon
                        className={`m-auto h-3 w-3 scale-x-[-1] transform pr-[1px]`}
                      />
                    </div>
                    <p className="text-xs font-medium text-primary-300">
                      {direction ? 'Claim Staking' : 'Identity Staking'}
                    </p>
                  </div>
                  <p className="text-[0.625rem] text-primary-400">
                    {direction
                      ? direction === 'for'
                        ? 'Staking for a claim signifies your conviction about the claim being true. Staking earns you fees as others also stake for the claim.'
                        : 'Staking against a claim signifies your conviction about the claim being false. Staking earns you fees as others also stake against the claim.'
                      : 'Staking on an identity signifies your conviction about the relevance of the identity. Staking earns you fees as others also stake on the claim.'}
                  </p>
                  <Link
                    to={
                      'https://docs.intuition.systems/primitives-and-interactions/interacations/attestations'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="mt-2 flex items-center gap-1">
                      Learn more
                      <ExternalLinkIcon className="h-3 w-3" />
                    </Button>
                  </Link>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogHeader>
        <div className="flex flex-col sm:px-5">
          <div className="flex w-full flex-row items-start justify-start pb-5 pt-[30px]">
            {modalType === 'identity' ? (
              <Identity
                imgSrc={identity?.user?.image ?? identity?.image}
                variant={identity?.user ? 'user' : 'default'}
              >
                {identity?.user?.display_name ?? identity?.display_name}
              </Identity>
            ) : (
              <Claim
                subject={{
                  imgSrc: claim?.subject?.user?.image ?? claim?.subject?.image,
                  label:
                    claim?.subject?.user?.display_name ??
                    claim?.subject?.display_name,
                  variant: claim?.subject?.user ? 'user' : 'default',
                }}
                predicate={{
                  imgSrc: claim?.predicate?.image,
                  label: claim?.predicate?.display_name,
                }}
                object={{
                  imgSrc: claim?.object?.user?.image ?? claim?.object?.image,
                  label:
                    claim?.object?.user?.display_name ??
                    claim?.object?.display_name,
                  variant: claim?.object?.user ? 'user' : 'default',
                }}
              />
            )}
          </div>
        </div>
        <div className="border-t border-dashed pt-2.5" />
        <StakeForm
          user={user}
          vault_id={vault_id ? vault_id : '0'}
          conviction_price={conviction_price ? conviction_price : '0'}
          user_conviction={user_conviction ? user_conviction : '0'}
          user_assets={user_assets ? user_assets : '0'}
          direction={direction ? direction : undefined}
          val={val}
          setVal={setVal}
          mode={mode}
          ethOrConviction={ethOrConviction}
          setEthOrConviction={setEthOrConviction}
          dispatch={dispatch}
          state={state}
          fetchReval={fetchReval}
          formRef={formRef}
          isLoading={isLoading}
          isModal={true}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
        />
        <StakeButton
          user={user}
          tosCookie={tosCookie}
          val={val}
          setVal={setVal}
          mode={mode}
          handleAction={handleStakeButtonClick}
          dispatch={dispatch}
          state={state}
          min_deposit={min_deposit}
          walletBalance={walletBalance}
          user_conviction={latest_user_conviction ?? user_conviction ?? '0'}
          setValidationErrors={setValidationErrors}
          setShowErrors={setShowErrors}
          ethOrConviction={ethOrConviction}
          conviction_price={latest_conviction_price ?? conviction_price ?? '0'}
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
