import { useEffect, useRef, useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import Toast from '@components/toast'
import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositAtom } from '@lib/hooks/useDepositAtom'
import { useRedeemAtom } from '@lib/hooks/useRedeemAtom'
import { transactionReducer } from '@lib/hooks/useTransactionReducer'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useGenericTxState } from '@lib/utils/use-tx-reducer'
import { Cookie } from '@remix-run/node'
import { useFetcher, useLocation } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { TransactionActionType, TransactionStateType } from 'types/transaction'
import { SessionUser } from 'types/user'
import { VaultDetailsType } from 'types/vault'
import { Abi, Address, decodeEventLog, formatUnits, parseUnits } from 'viem'
import { useBalance, useBlockNumber, usePublicClient } from 'wagmi'

import StakeButton from './stake-button'
import StakeForm from './stake-form'
import StakeToast from './stake-toast'

const initialTxState: TransactionStateType = {
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
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const { state, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)
  const publicClient = usePublicClient()

  const identityShouldOverride = identity && identity.vault_id !== '0'

  let vault_id: string = '0'
  if (identityShouldOverride) {
    vault_id = identity.vault_id
  } else if (claim) {
    vault_id = direction === 'for' ? claim.vault_id : claim.counter_vault_id
  }

  let user_conviction: string = '0'
  if (identityShouldOverride) {
    user_conviction = identity.user_conviction
  } else if (claim) {
    user_conviction =
      direction === 'for'
        ? claim.user_conviction_for
        : claim.user_conviction_against
  }

  let conviction_price: string = '0'
  if (identityShouldOverride) {
    conviction_price = identity.conviction_price
  } else if (claim) {
    conviction_price =
      direction === 'for'
        ? claim.for_conviction_price
        : claim.against_conviction_price
  }

  let user_assets: string = '0'
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
    reset,
  } = mode === 'deposit' ? depositHook : redeemHook

  const useHandleAction = (actionType: string) => {
    return async () => {
      try {
        const txHash = await writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName: actionType === 'buy' ? 'depositAtom' : 'redeemAtom',
          args:
            actionType === 'buy'
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
            actionType === 'buy'
              ? parseUnits(val === '' ? '0' : val, 18)
              : undefined,
        })

        if (txHash) {
          dispatch({ type: 'TRANSACTION_PENDING' })
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          logger('receipt', receipt)
          logger('txHash', txHash)
          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash: txHash,
            txReceipt: receipt,
          })
        }
      } catch (error) {
        logger('error', error)
        setLoading(false)
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
                icon={<AlertCircle />}
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
    const receipt = txReceipt
    const action = mode === 'deposit' ? 'Deposited' : 'Redeemed'

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

        toast.custom(() => (
          <StakeToast
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

  const isLoading =
    !!awaitingWalletConfirmation ||
    !!awaitingOnChainConfirmation ||
    loading ||
    state.status === 'confirm' ||
    state.status === 'transaction-pending' ||
    state.status === 'transaction-confirmed'

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

  console.log('state.status', state.status)

  return (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={() => {
        handleClose()
      }}
    >
      <DialogContent className="max-w-[476px]">
        <StakeForm
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
          mode={mode}
          dispatch={dispatch}
          state={state}
          fetchReval={fetchReval}
          formRef={formRef}
          isLoading={isLoading}
          modalType={modalType}
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
          conviction_price={latest_conviction_price ?? conviction_price ?? '0'}
        />
      </DialogContent>
    </Dialog>
  )
}
