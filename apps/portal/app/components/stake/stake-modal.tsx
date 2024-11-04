import { useEffect, useState } from 'react'

import {
  Badge,
  Button,
  ButtonSize,
  ButtonVariant,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  IconName,
  Tag,
  TagSize,
  TagVariant,
  Text,
  TextVariant,
  toast,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { InfoTooltip } from '@components/info-tooltip'
import { GET_VAULT_DETAILS_RESOURCE_ROUTE, MIN_DEPOSIT } from '@consts/general'
import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositAtom } from '@lib/hooks/useDepositAtom'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import { useRedeemAtom } from '@lib/hooks/useRedeemAtom'
import { transactionReducer } from '@lib/hooks/useTransactionReducer'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { useGenericTxState } from '@lib/utils/use-tx-reducer'
import { useLocation } from '@remix-run/react'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'
import { VaultDetailsType } from 'app/types/vault'
import { useAtom } from 'jotai'
import { Abi, Address, decodeEventLog, formatUnits, parseUnits } from 'viem'
import { useAccount, usePublicClient } from 'wagmi'

import StakeButton from './stake-button'
import StakeForm from './stake-form'
import StakeToast from './stake-toast'

const initialTxState: TransactionStateType = {
  status: 'idle',
  txHash: undefined,
  error: undefined,
}

interface StakeModalProps {
  userWallet: string
  contract: string
  open: boolean
  identity?: IdentityPresenter
  claim?: ClaimPresenter
  vaultId?: string
  vaultDetailsProp?: VaultDetailsType
  onClose?: () => void
  onSuccess?: (args: {
    identity?: IdentityPresenter
    claim?: ClaimPresenter
    vaultDetails?: VaultDetailsType
    direction?: 'for' | 'against'
  }) => void
  direction?: 'for' | 'against'
}

export default function StakeModal({
  userWallet,
  contract,
  open = false,
  onClose = () => {},
  identity,
  claim,
  vaultId,
  vaultDetailsProp,
  direction,
  onSuccess,
}: StakeModalProps) {
  console.log('claim', claim)
  console.log('direction', direction)
  const fetchReval = useFetcher()
  const [stakeModalState] = useAtom(stakeModalAtom)
  const { mode, modalType } = stakeModalState
  const [val, setVal] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const { state, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)
  const publicClient = usePublicClient()

  const vaultDetailsFetcher = useFetcher<VaultDetailsType>()
  const [fetchId, setFetchId] = useState(0)

  const [vaultDetails, setVaultDetails] = useState<
    VaultDetailsType | undefined
  >(vaultDetailsProp)

  useEffect(() => {
    setVaultDetails(vaultDetailsProp)
  }, [vaultDetailsProp])

  useEffect(() => {
    let isCancelled = false

    if (vaultId !== null) {
      const finalUrl = `${GET_VAULT_DETAILS_RESOURCE_ROUTE}?contract=${contract}&vaultId=${vaultId}&fetchId=${fetchId}`
      if (!isCancelled) {
        vaultDetailsFetcher.load(finalUrl)
      }
    }

    return () => {
      isCancelled = true
    }
    // omits the fetcher from the exhaustive deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, vaultId, fetchId])

  useEffect(() => {
    if (vaultDetailsFetcher.state === 'idle' && vaultDetailsFetcher.data) {
      setVaultDetails(vaultDetailsFetcher.data)
    }
  }, [vaultDetailsFetcher.state, vaultDetailsFetcher.data])

  const identityShouldOverride = identity && identity.vault_id !== '0'

  if (identityShouldOverride) {
    vaultId = identity.vault_id
  } else if (claim) {
    vaultId = direction === 'for' ? claim.vault_id : claim.counter_vault_id
  }

  let user_conviction: string = '0'
  if (identityShouldOverride) {
    user_conviction = vaultDetails?.user_conviction ?? identity.user_conviction
  } else if (claim) {
    user_conviction =
      direction === 'for'
        ? vaultDetails?.user_conviction ?? claim.user_conviction_for
        : vaultDetails?.user_conviction_against ?? claim.user_conviction_against
  }

  let conviction_price: string = '0'
  if (identityShouldOverride) {
    conviction_price =
      vaultDetails?.conviction_price ?? identity.conviction_price
  } else if (claim) {
    conviction_price =
      direction === 'for'
        ? vaultDetails?.conviction_price ?? claim.for_conviction_price
        : vaultDetails?.against_conviction_price ??
          claim.against_conviction_price
  }

  let user_assets: string = '0'
  if (identityShouldOverride) {
    user_assets = vaultDetails?.user_assets ?? identity.user_assets
  } else if (claim) {
    user_assets =
      direction === 'for'
        ? vaultDetails?.user_assets ?? claim.user_assets_for
        : vaultDetails?.user_assets_against ?? claim.user_assets_against
  }

  const { min_deposit } = vaultDetails ?? { min_deposit: MIN_DEPOSIT }

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
        const parsedValue = parseUnits(val === '' ? '0' : val, 18)
        const txHash = await writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName:
            actionType === 'buy'
              ? claim !== undefined
                ? 'depositTriple'
                : 'depositAtom'
              : claim !== undefined
                ? 'redeemTriple'
                : 'redeemAtom',
          args:
            actionType === 'buy'
              ? [userWallet as `0x${string}`, vaultId]
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
                  userWallet as `0x${string}`,
                  vaultId,
                ],
          value: actionType === 'buy' ? parsedValue : undefined,
        })

        if (publicClient && txHash) {
          dispatch({ type: 'TRANSACTION_PENDING' })
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          logger('receipt', receipt)
          logger('txHash', txHash)
          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash,
            txReceipt: receipt,
          })
          onSuccess?.({
            identity,
            claim,
            vaultDetails,
            direction,
          })
          fetchReval.submit(formRef.current, {
            method: 'POST',
          })
        }
      } catch (error) {
        logger('error', error)
        setIsLoading(false)
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

  const handleDeposit = useHandleAction('buy')
  const handleRedeem = useHandleAction('sell')

  const action = mode === 'deposit' ? handleDeposit : handleRedeem

  useEffect(() => {
    if (isError) {
      reset()
      setIsLoading(false)
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
          <StakeToast
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

  useEffect(() => {
    setIsLoading(
      !!awaitingWalletConfirmation ||
        !!awaitingOnChainConfirmation ||
        state.status === 'confirm' ||
        state.status === 'transaction-pending' ||
        state.status === 'transaction-confirmed',
    )
  }, [awaitingWalletConfirmation, awaitingOnChainConfirmation, state.status])

  const { address } = useAccount()
  const walletBalance = useGetWalletBalance(
    address ?? (userWallet as `0x${string}`),
  )

  const [showErrors, setShowErrors] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleStakeButtonClick = async () => {
    if (
      (mode === 'deposit' && +val < +formatUnits(BigInt(min_deposit), 18)) ||
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
    setVaultDetails(undefined)
    setIsLoading(false)
    setVal('')
    setShowErrors(false)
    setValidationErrors([])
    vaultDetailsFetcher.data = undefined
    vaultDetailsFetcher.state = 'idle'
    setFetchId((prevId) => prevId + 1)
    setTimeout(() => {
      dispatch({ type: 'START_TRANSACTION' })
      reset()
    }, 500)
  }

  useEffect(() => {
    if (open) {
      setVaultDetails(undefined)
      setIsLoading(false)
      setVal('')
      setShowErrors(false)
      setValidationErrors([])
      vaultDetailsFetcher.data = undefined
      vaultDetailsFetcher.state = 'idle'
      setFetchId((prevId) => prevId + 1)
      dispatch({ type: 'START_TRANSACTION' })
    }
  }, [open, dispatch])

  const isTransactionStarted = [
    'approve-transaction',
    'transaction-pending',
    'awaiting',
    'confirm',
  ].includes(state.status)

  console.log('userWallet', userWallet)
  console.log('isLoading', isLoading)

  return (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={() => {
        handleClose()
      }}
    >
      <DialogContent
        onOpenAutoFocus={(event) => event.preventDefault()}
        className="flex flex-col min-w-[600px] min-h-[600px]"
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between w-full pr-2.5">
              <div className="text-foreground flex items-center gap-2">
                {state.status !== 'idle' && (
                  <Button
                    onClick={() => dispatch({ type: 'START_TRANSACTION' })}
                    variant={ButtonVariant.text}
                    size={ButtonSize.icon}
                    className="p-0"
                  >
                    <Icon name={IconName.arrowLeft} className="h-4 w-4" />
                  </Button>
                )}
                Stake{' '}
                <Tag
                  variant={
                    direction !== undefined
                      ? direction === 'for'
                        ? TagVariant.for
                        : TagVariant.against
                      : undefined
                  }
                  size={TagSize.sm}
                  className={`${!direction && 'hidden'}`}
                >
                  {direction === 'for' ? 'FOR' : 'AGAINST'}
                </Tag>
                <InfoTooltip
                  title="Staking"
                  content={
                    <div className="flex flex-col gap-2 w-full">
                      <Text variant="base">
                        Staking on an {claim ? 'Claim' : 'Identity'} signifies a
                        belief in the relevancy of the respective{' '}
                        {claim ? 'Claim' : 'Identity'} and enhances its
                        discoverability in the Intuition system.
                      </Text>
                    </div>
                  }
                  icon={IconName.circleInfo}
                />
              </div>
              <Badge className="flex items-center gap-1">
                <Icon name="wallet" className="h-3 w-3 text-secondary/50" />
                <Text
                  variant={TextVariant.caption}
                  className="text-nowrap text-secondary/50"
                >
                  {(+walletBalance).toFixed(2)} ETH
                </Text>
              </Badge>
            </div>
          </DialogTitle>
          <Text
            variant={TextVariant.caption}
            className="text-secondary/50 w-full"
          >
            Staking on an {claim ? 'Claim' : 'Identity'} enhances its
            discoverability in the Intuition system.
          </Text>
        </DialogHeader>
        <StakeForm
          userWallet={address ?? userWallet}
          identity={identity}
          claim={claim}
          vaultDetails={vaultDetails}
          user_conviction={user_conviction}
          conviction_price={conviction_price}
          user_assets={user_assets}
          direction={direction ? direction : undefined}
          val={val}
          setVal={setVal}
          mode={mode}
          state={state}
          isLoading={isLoading}
          modalType={modalType}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
        />
        {!isTransactionStarted && (
          <DialogFooter>
            <StakeButton
              val={val}
              mode={mode}
              handleAction={handleStakeButtonClick}
              handleClose={handleClose}
              dispatch={dispatch}
              state={state}
              min_deposit={min_deposit}
              walletBalance={walletBalance}
              user_conviction={user_conviction ?? '0'}
              setValidationErrors={setValidationErrors}
              setShowErrors={setShowErrors}
              conviction_price={conviction_price ?? '0'}
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
