import { useEffect, useRef, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  Skeleton,
  toast,
} from '@0xintuition/1ui'
import { IdentityPresenter, TagEmbeddedPresenter } from '@0xintuition/api'

import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositTriple } from '@lib/hooks/useDepositTriple'
import { useRedeemTriple } from '@lib/hooks/useRedeemTriple'
import { transactionReducer } from '@lib/hooks/useTransactionReducer'
import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useGenericTxState } from '@lib/utils/use-tx-reducer'
import { useFetcher, useLocation } from '@remix-run/react'
import { ClaimLoaderData } from '@routes/resources+/search-claims-by-ids'
import { useQueryClient } from '@tanstack/react-query'
import {
  GET_VAULT_DETAILS_RESOURCE_ROUTE,
  SEARCH_CLAIMS_BY_IDS_RESOURCE_ROUTE,
  TAG_PREDICATE_VAULT_ID_TESTNET,
} from 'consts'
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
  tag: TagEmbeddedPresenter | IdentityPresenter
  identity: IdentityPresenter

  onClose?: () => void
}

export default function SaveListModal({
  userWallet,
  contract,
  open = false,
  tag,
  identity,

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

  const [isLoading, setIsLoading] = useState(true)

  const depositHook = useDepositTriple(identity.contract)

  const redeemHook = useRedeemTriple(identity.contract)

  const {
    writeContractAsync,
    receipt: txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = mode === 'save' ? depositHook : redeemHook

  const [fetchedClaimVaultId, setFetchedClaimVaultId] = useState<string | null>(
    null,
  )
  const [vaultDetails, setVaultDetails] = useState<VaultDetailsType>()

  const claimFetcher = useFetcher<ClaimLoaderData[]>()
  const vaultDetailsFetcher = useFetcher<VaultDetailsType>()

  useEffect(() => {
    const fetchClaim = () => {
      const searchParams = new URLSearchParams({
        subject: identity.vault_id,
        predicate: TAG_PREDICATE_VAULT_ID_TESTNET.toString(),
        object: tag.vault_id,
      })

      const finalUrl = `${SEARCH_CLAIMS_BY_IDS_RESOURCE_ROUTE}?${searchParams.toString()}`

      claimFetcher.load(finalUrl)
    }

    fetchClaim()
    // omits the fetcher from the exhaustive deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.vault_id, tag.vault_id])

  useEffect(() => {
    if (
      claimFetcher.state === 'idle' &&
      claimFetcher.data !== null &&
      claimFetcher.data !== undefined
    ) {
      const fetchedClaimResponse = claimFetcher.data[0] as unknown as {
        vault_id: string
      }
      setFetchedClaimVaultId(fetchedClaimResponse.vault_id)
    }
  }, [claimFetcher.state, claimFetcher.data])

  useEffect(() => {
    if (fetchedClaimVaultId !== null) {
      const finalUrl = `${GET_VAULT_DETAILS_RESOURCE_ROUTE}?contract=${identity.contract}&vaultId=${fetchedClaimVaultId}`
      vaultDetailsFetcher.load(finalUrl)
    }
    // omits the fetcher from the exhaustive deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedClaimVaultId, identity.contract])

  useEffect(() => {
    if (vaultDetailsFetcher.state === 'idle' && vaultDetailsFetcher.data) {
      setVaultDetails(vaultDetailsFetcher.data)
      setIsLoading(false)
    }
  }, [vaultDetailsFetcher.state, vaultDetailsFetcher.data])

  const useHandleAction = (actionType: string) => {
    return async () => {
      try {
        if (!contract || !fetchedClaimVaultId || !vaultDetails) {
          throw new Error('Missing required parameters')
        }
        const txHash = await writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName:
            actionType === 'save' ? 'depositTriple' : 'redeemTriple',
          args:
            actionType === 'save'
              ? [userWallet as `0x${string}`, fetchedClaimVaultId]
              : [
                  vaultDetails.user_conviction,
                  userWallet as `0x${string}`,
                  fetchedClaimVaultId,
                ],
          value:
            actionType === 'save'
              ? parseUnits(val === '' ? '0' : val, 18)
              : undefined,
        })
        if (txHash) {
          dispatch({ type: 'TRANSACTION_PENDING' })
          const receipt = await publicClient?.waitForTransactionReceipt({
            hash: txHash,
          })

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
  }, [blockNumber, queryClient, queryKey, open])

  const walletBalance = formatUnits(balance?.value ?? 0n, 18)

  const handleSaveButtonClick = async () => {
    if (!vaultDetails) {
      throw new Error('Missing required parameters')
    }
    if (
      val < formatBalance(vaultDetails.min_deposit, 18) ||
      +val > +walletBalance
    ) {
      setShowErrors(true)
      return
    }
    handleSave()
  }

  const handleUnsaveButtonClick = async () => {
    if (!vaultDetails) {
      throw new Error('Missing required parameters')
    }
    if (+val > +(vaultDetails.user_conviction ?? '0')) {
      setShowErrors(true)
      return
    }
    handleUnsave()
  }

  const location = useLocation()

  useEffect(() => {
    dispatch({ type: 'START_TRANSACTION' })
    // avoids adding dispatch since we only want to re-render on this single type
    // eslint-disable-line react-hooks/exhaustive-deps
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
            tag={tag}
            identity={identity}
            user_assets={vaultDetails?.user_assets ?? '0'}
            entry_fee={vaultDetails?.formatted_entry_fee ?? '0'}
            exit_fee={vaultDetails?.formatted_exit_fee ?? '0'}
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
        <DialogFooter className="!justify-center !items-center gap-5">
          {!isTransactionStarted ? (
            isLoading ? (
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
                  user_conviction={vaultDetails?.user_conviction ?? '0'}
                  className={`${(vaultDetails?.user_conviction && vaultDetails?.user_conviction > '0' && state.status === 'idle') || mode !== 'save' ? '' : 'hidden'}`}
                />
                <SaveButton
                  val={val}
                  setMode={setMode}
                  handleAction={handleSaveButtonClick}
                  handleClose={handleClose}
                  dispatch={dispatch}
                  state={state}
                  min_deposit={vaultDetails?.min_deposit ?? '0'}
                  walletBalance={walletBalance}
                  conviction_price={vaultDetails?.conviction_price ?? '0'}
                  user_assets={vaultDetails?.user_assets ?? '0'}
                  setValidationErrors={setValidationErrors}
                  setShowErrors={setShowErrors}
                  className={`${mode === 'unsave' && 'hidden'}`}
                />
              </>
            )
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
