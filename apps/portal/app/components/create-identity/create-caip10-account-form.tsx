import { useEffect, useRef, useState } from 'react'

import {
  Badge,
  Button,
  Icon,
  IconName,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
  TextVariant,
  toast,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import CreateIdentityReview from '@components/create-identity/create-identity-review'
import ErrorList from '@components/error-list'
import { InfoTooltip } from '@components/info-tooltip'
import { TransactionState } from '@components/transaction-state'
import WrongNetworkButton from '@components/wrong-network-button'
import { getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateAtom } from '@lib/hooks/useCreateAtom'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import {
  identityTransactionReducer,
  initialIdentityTransactionState,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import { createCAIP10AccountSchema } from '@lib/schemas/create-identity-schema'
import { getChainEnvConfig } from '@lib/utils/environment'
import logger from '@lib/utils/logger'
import { useFetcher, useNavigate } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { CURRENT_ENV, MULTIVAULT_CONTRACT_ADDRESS, PATHS } from 'app/consts'
import {
  IdentityTransactionActionType,
  IdentityTransactionStateType,
  TransactionSuccessAction,
  TransactionSuccessActionType,
} from 'app/types'
import { Address, decodeEventLog, extractChain, parseUnits, toHex } from 'viem'
import { reset } from 'viem/actions'
import * as chains from 'viem/chains'
import { mode } from 'viem/chains'
import { useAccount, usePublicClient } from 'wagmi'

interface IdentityFormProps {
  wallet?: string
  onSuccess?: (identity: IdentityPresenter) => void
  onClose: () => void
  successAction?: TransactionSuccessActionType
  setIsTransactionStarted: (isTransactionStarted: boolean) => void
}

interface FormState {
  address?: string
  chainId?: string
  initial_deposit?: string
}

export function CAIP10AccountForm({
  wallet,
  onClose,
  successAction = TransactionSuccessAction.VIEW,
  setIsTransactionStarted,
}: IdentityFormProps) {
  const { state, dispatch } = useTransactionState<
    IdentityTransactionStateType,
    IdentityTransactionActionType
  >(identityTransactionReducer, initialIdentityTransactionState)
  const navigate = useNavigate()

  const [initialDeposit, setInitialDeposit] = useState<string>('')
  const [vaultId, setVaultId] = useState<string | undefined>(undefined)
  const [lastTxHash, setLastTxHash] = useState<string | undefined>(undefined)

  const loaderFetcher = useFetcher<CreateLoaderData>()
  const loaderFetcherUrl = '/resources/create'
  const loaderFetcherRef = useRef(loaderFetcher.load)

  useEffect(() => {
    loaderFetcherRef.current = loaderFetcher.load
  })

  useEffect(() => {
    loaderFetcherRef.current(loaderFetcherUrl)
  }, [loaderFetcherUrl])

  const fees = loaderFetcher.data as CreateLoaderData

  const publicClient = usePublicClient()
  const { address } = useAccount()
  const {
    writeContractAsync: writeCreateIdentity,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    receipt: txReceipt,
  } = useCreateAtom()

  useEffect(() => {
    const receipt = txReceipt

    type EventLogArgs = {
      sender: Address
      receiver?: Address
      owner?: Address
      vaultId: string
    }

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
      setVaultId(topics.args.vaultId.toString())
      setLastTxHash(txReceipt.transactionHash)
    }
  }, [txReceipt, mode, reset, lastTxHash])

  const emitterFetcher = useFetcher()

  const [loading, setLoading] = useState(false)

  async function handleOnChainCreateIdentity({
    atomData,
  }: {
    atomData: string
  }) {
    if (
      !awaitingOnChainConfirmation &&
      !awaitingWalletConfirmation &&
      publicClient &&
      fees
    ) {
      try {
        dispatch({ type: 'APPROVE_TRANSACTION' })

        const txHash = await writeCreateIdentity({
          address: MULTIVAULT_CONTRACT_ADDRESS,
          abi: multivaultAbi,
          functionName: 'createAtom',
          args: [toHex(atomData)],
          value:
            BigInt(fees.atomCost) +
            parseUnits(initialDeposit === '' ? '0' : initialDeposit, 18),
        })

        if (txHash) {
          dispatch({ type: 'TRANSACTION_PENDING' })
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash,
            txReceipt: receipt,
            identityId: vaultId,
          })
        }
      } catch (error) {
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
          toast.error(errorMessage)
          return
        }
      }
    } else {
      logger(
        'Cannot initiate onchain transaction, a transaction is already pending, a wallet is already signing, or a wallet is not connected',
      )
    }
  }

  function handleIdentityTxReceiptReceived() {
    if (txReceipt && vaultId) {
      emitterFetcher.submit(
        { identity_id: vaultId },
        { method: 'post', action: '/actions/create-emitter' },
      )
    }
  }

  useEffect(() => {
    if (state.status === 'complete') {
      handleIdentityTxReceiptReceived()
    }
  }, [state.status])

  const { chain } = useAccount()
  const isWrongNetwork = chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId
  const [formState, setFormState] = useState<FormState>({})

  const handleClose = () => {
    dispatch({ type: 'START_TRANSACTION' })
    setInitialDeposit('0')
    setIsTransactionStarted(false)
    onClose()
  }

  const walletBalance = useGetWalletBalance(
    address ?? (wallet as `0x${string}`),
  )

  const [formTouched, setFormTouched] = useState(false) // to disable submit if user hasn't touched form yet

  const [form, fields] = useForm({
    id: 'create-identity',
    constraint: getZodConstraint(createCAIP10AccountSchema()),
    onValidate({ formData }) {
      const result = parseWithZod(formData, {
        schema: createCAIP10AccountSchema,
      })
      return result
    },
    shouldValidate: 'onBlur',
    onSubmit: async (event, { formData }) => {
      event.preventDefault()
      const formDataObject = Object.fromEntries(formData.entries())
      setFormState(formDataObject)
      setIsTransactionStarted(true)
      dispatch({ type: 'REVIEW_TRANSACTION' })
    },
  })

  const reviewIdentity = {
    imageUrl: IconName.fileText,
    displayName: `caip10:eip155:${formState.chainId}:${formState.address}`,
  }

  return (
    <>
      <div className="h-full flex flex-col">
        {state.status === 'idle' ? (
          <div className="w-full h-max flex-col justify-start items-start inline-flex gap-7">
            <div className="flex flex-col w-full gap-1.5">
              <div className="self-stretch flex-col justify-start items-start flex">
                <div className="flex w-full items-center justify-between">
                  <Text variant="caption" className="text-secondary-foreground">
                    Address
                  </Text>
                  <InfoTooltip
                    title="Address"
                    content="This is the address of your Smart Contract Atom, and will be a main way that people discover it - so make sure it is accurate!"
                  />
                </div>
              </div>
              <Label htmlFor={fields.address.id} hidden>
                Address
              </Label>
              <Input
                {...getInputProps(fields.address, { type: 'text' })}
                placeholder="Enter an address here"
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                  setFormTouched(true)
                }}
                value={formState.address}
              />
              <ErrorList
                id={fields.address.errorId}
                errors={fields.address.errors}
              />
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <div className="self-stretch flex-col justify-start items-start flex">
                <div className="flex w-full items-center justify-between">
                  <Text variant="caption" className="text-secondary-foreground">
                    Chain
                  </Text>
                  <InfoTooltip
                    title="Chain"
                    content="This is the EVM compatible chain that the Smart Contract is deployed on - so make sure it is accurate!"
                  />
                </div>
              </div>
              <Label htmlFor={fields.chainId.id} hidden>
                Chain
              </Label>
              <Select
                onValueChange={(value) => {
                  setFormState((prev) => ({
                    ...prev,
                    chainId: value,
                  }))
                  setFormTouched(true)
                }}
                value={formState.chainId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a chain" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    chains.base,
                    chains.mainnet,
                    ...Object.values(chains).filter(
                      (chain) =>
                        chain !== chains.base && chain !== chains.mainnet,
                    ),
                  ].map((chain) => (
                    <SelectItem key={chain.id} value={chain.id.toString()}>
                      {chain.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <div className="flex flex-row items-center justify-between mb-1">
                <div className="inline-flex gap-1">
                  <Label htmlFor={fields.initial_deposit.id} hidden>
                    Initial Deposit
                  </Label>
                  <div className="self-stretch flex-col justify-start items-start flex">
                    <div className="flex w-full items-center justify-between gap-1">
                      <Text
                        variant="caption"
                        className="text-secondary-foreground"
                      >
                        Initial Deposit
                      </Text>

                      <InfoTooltip
                        title="Initial Deposit"
                        content="You will not receive shares merely by creating this Atom/Identity - so, if you believe in it, and think that it will generate fees, then you will need to deposit on it, to gain ownership of it. You will not be charged an entry fee for depositing on your newly-created Atom/Identity."
                      />
                    </div>
                  </div>
                </div>
                <Badge className="bg-transparent">
                  <Icon name="wallet" className="h-4 w-4" />
                  {(+walletBalance).toFixed(2)} ETH
                </Badge>
              </div>
              <Label htmlFor={fields.initial_deposit.id} hidden>
                Initial Deposit
              </Label>
              <Input
                id="position"
                autoComplete="off"
                type="text"
                value={initialDeposit}
                onChange={(e) => {
                  e.preventDefault()
                  let inputValue = e.target.value
                  if (inputValue.startsWith('.')) {
                    inputValue = `0${inputValue}`
                  }
                  const sanitizedValue = inputValue.replace(/[^0-9.]/g, '')
                  if (sanitizedValue.split('.').length > 2) {
                    return
                  }
                  setInitialDeposit(sanitizedValue)
                }}
                min={'0'}
                placeholder={'0'}
                startAdornment="ETH"
              />
              <ErrorList
                id={fields.initial_deposit.errorId}
                errors={fields.initial_deposit.errors}
              />
              <Text
                variant={TextVariant.caption}
                className="text-center text-primary/70 mt-1"
              >
                Note: You will not be charged an entry fee for this initial
                deposit.
              </Text>
            </div>
            <div className="mt-auto mx-auto">
              {isWrongNetwork ? (
                <WrongNetworkButton />
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    const result = form.valid
                    if (result) {
                      setIsTransactionStarted(true)
                      dispatch({ type: 'REVIEW_TRANSACTION' })
                    }
                  }}
                  disabled={
                    !address ||
                    loading ||
                    !formTouched ||
                    ['confirm', 'transaction-pending', 'awaiting'].includes(
                      state.status,
                    )
                  }
                  className="w-40 mx-auto"
                >
                  Review
                </Button>
              )}
            </div>
          </div>
        ) : state.status === 'review-transaction' ? (
          <div className="h-[600px] flex flex-col">
            <CreateIdentityReview
              dispatch={dispatch}
              identity={reviewIdentity}
              initialDeposit={initialDeposit}
              fees={fees}
            />
            <div className="mt-auto">
              {isWrongNetwork ? (
                <WrongNetworkButton />
              ) : (
                <Button
                  form={form.id}
                  type="submit"
                  variant="primary"
                  onClick={() =>
                    handleOnChainCreateIdentity({
                      atomData: `caip10:eip155:${formState.chainId}:${formState.address}`,
                    })
                  }
                  disabled={
                    !address ||
                    loading ||
                    !formTouched ||
                    ['confirm', 'transaction-pending', 'awaiting'].includes(
                      state.status,
                    )
                  }
                  className="w-40 mx-auto"
                >
                  Create Identity
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="h-[600px] flex flex-col">
            <TransactionState
              status={state.status}
              txHash={state.txHash}
              type="identity"
              atomType="smartContract"
              chainName={
                extractChain({
                  chains: Object.values(chains),
                  // @ts-ignore Ignoring type since viem doesn't provide proper typings for chain IDs
                  id: Number(formState.chainId),
                })?.blockExplorers?.default?.name
              }
              ipfsLink={`${
                extractChain({
                  chains: Object.values(chains),
                  // @ts-ignore Ignoring type since viem doesn't provide proper typings for chain IDs
                  id: Number(formState.chainId),
                })?.blockExplorers?.default?.url
              }/address/${formState.address}`}
              successButton={
                <Button
                  type="button"
                  variant="primary"
                  className="mt-auto w-40"
                  onClick={() => {
                    if (successAction === TransactionSuccessAction.VIEW) {
                      navigate(`${PATHS.IDENTITY}/${vaultId}`)
                    }
                    handleClose()
                  }}
                >
                  {successAction === TransactionSuccessAction.VIEW
                    ? 'View Identity'
                    : 'Close'}
                </Button>
              }
              errorButton={
                <Button
                  type="button"
                  variant="primary"
                  className="mt-auto w-40"
                  onClick={() => {
                    dispatch({ type: 'START_TRANSACTION' })
                  }}
                >
                  Retry
                </Button>
              }
            />
          </div>
        )}
      </div>
    </>
  )
}
