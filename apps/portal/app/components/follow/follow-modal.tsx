import { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogFooter, toast } from '@0xintuition/1ui'
import { useGetTripleQuery } from '@0xintuition/graphql'

import { multivaultAbi } from '@lib/abis/multivault'
import { useFollowMutation } from '@lib/hooks/mutations/useFollowMutation'
import { useCheckClaim } from '@lib/hooks/useCheckClaim'
import { useCreateClaimConfig } from '@lib/hooks/useCreateClaimConfig'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import { transactionReducer } from '@lib/hooks/useTransactionReducer'
import { getSpecialPredicate } from '@lib/utils/app'
import { useGenericTxState } from '@lib/utils/use-tx-reducer'
import { useLocation } from '@remix-run/react'
import { CURRENT_ENV, MIN_DEPOSIT } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'
import { Address, decodeEventLog } from 'viem'
import { useAccount, usePublicClient } from 'wagmi'

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
  userWallet: string
  contract: string
  open: boolean
  identityVaultId: string
  identityLabel: string
  identityAvatar: string
  onClose?: () => void
}

export default function FollowModal({
  userWallet,
  contract,
  open = false,
  identityVaultId,
  identityLabel,
  identityAvatar,
  onClose = () => {},
}: FollowModalProps) {
  const [val, setVal] = useState(MIN_DEPOSIT)
  const [mode, setMode] = useState<'follow' | 'unfollow'>('follow')
  const [showErrors, setShowErrors] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)
  const { state, dispatch } = useGenericTxState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTxState)
  const publicClient = usePublicClient()

  const { address } = useAccount()

  const { data: claimCheckData } = useCheckClaim({
    subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId.toString(),
    predicateId:
      getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId.toString(),
    objectId: identityVaultId,
  })

  const { data: claimData } = useGetTripleQuery(
    { tripleId: claimCheckData?.result },
    {
      enabled: Boolean(claimCheckData?.result !== '0'),
      retry: 1,
      retryDelay: 2000,
      refetchInterval: (query) => {
        if (query.state.status === 'success') {
          return false
        }
        return 2000
      },
      queryKey: ['get-triple', { id: claimCheckData?.result }],
    },
  )

  const vaultDetails = useGetVaultDetails(
    contract,
    claimData?.triple?.vault_id,
    claimData?.triple?.counter_vault_id,
    {
      queryKey: [
        'get-vault-details',
        contract,
        claimData?.triple?.vault_id,
        claimData?.triple?.counter_vault_id,
      ],
      enabled: open,
    },
  )

  const { data: configData, isLoading: isLoadingConfig } =
    useCreateClaimConfig()

  const {
    mutateAsync: follow,
    txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = useFollowMutation(
    contract,
    vaultDetails?.data?.user_conviction ?? '0',
    mode,
    claimData?.triple?.vault_id,
  )

  const handleAction = async () => {
    try {
      const txHash = await follow({
        val,
        userWallet,
        vaultId: claimData?.triple?.vault_id,
        tripleCost: BigInt(configData?.fees.tripleCost ?? '0'),
        userVaultId: identityVaultId,
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
      }
    } catch (error) {
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
          mode === 'follow'
            ? (topics.args as BuyArgs).senderAssetsAfterTotalFees.toString()
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

  const walletBalance = useGetWalletBalance(
    address ?? (userWallet as `0x${string}`),
  )
  const handleFollowButtonClick = async () => {
    if (+val < +MIN_DEPOSIT || +val > +walletBalance) {
      setShowErrors(true)
      return
    }
    handleAction()
  }

  const handleUnfollowButtonClick = async () => {
    if (+val > +(vaultDetails?.data?.user_conviction ?? '0')) {
      setShowErrors(true)
      return
    }
    handleAction()
  }

  const location = useLocation()

  useEffect(() => {
    dispatch({ type: 'START_TRANSACTION' })
  }, [location])

  const handleClose = () => {
    onClose()
    setMode('follow')
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
      <DialogContent
        className="flex flex-col md:w-[476px] h-[540px] gap-0"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <div className="flex-grow">
          <FollowForm
            walletBalance={walletBalance}
            identityLabel={identityLabel}
            identityAvatar={identityAvatar}
            min_deposit={vaultDetails?.data?.min_deposit ?? MIN_DEPOSIT}
            user_assets={vaultDetails?.data?.user_assets ?? '0'}
            entry_fee={vaultDetails?.data?.formatted_entry_fee ?? '0'}
            exit_fee={vaultDetails?.data?.formatted_exit_fee ?? '0'}
            val={val}
            setVal={setVal}
            mode={mode}
            dispatch={dispatch}
            state={state}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
          />
        </div>
        <DialogFooter className="!justify-center !items-center gap-5">
          {!isTransactionStarted && (
            <>
              <UnfollowButton
                setMode={setMode}
                handleAction={handleUnfollowButtonClick}
                handleClose={handleClose}
                dispatch={dispatch}
                state={state}
                user_conviction={vaultDetails?.data?.user_conviction ?? '0'}
                isLoadingConfig={isLoadingConfig}
                className={`${(vaultDetails?.data?.user_conviction && vaultDetails?.data?.user_conviction > '0' && state.status === 'idle') || mode !== 'follow' ? '' : 'hidden'}`}
              />
              <FollowButton
                val={val}
                setMode={setMode}
                handleAction={handleFollowButtonClick}
                handleClose={handleClose}
                dispatch={dispatch}
                state={state}
                min_deposit={
                  vaultDetails?.data?.formatted_min_deposit ?? MIN_DEPOSIT
                }
                walletBalance={walletBalance}
                conviction_price={vaultDetails?.data?.conviction_price ?? '0'}
                user_assets={vaultDetails?.data?.user_assets ?? '0'}
                setValidationErrors={setValidationErrors}
                setShowErrors={setShowErrors}
                isLoadingConfig={isLoadingConfig}
                className={`${mode === 'unfollow' && 'hidden'}`}
              />
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
