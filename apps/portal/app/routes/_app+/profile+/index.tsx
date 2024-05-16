import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from '@0xintuition/1ui'
import { PrivyVerifiedLinks } from '@client/privy-verified-links'
import Toast from '@components/toast'
import { useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateIdentity } from '@lib/hooks/useCreateIdentity'
import { createIdentitySchema } from '@lib/schemas/create-identity-schema'
import { MULTIVAULT_CONTRACT_ADDRESS } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { requireAuthedUser } from '@server/auth'
import type { Identity } from '@types/identity'
import { User } from '@types/user'
import { AlertCircle } from 'lucide-react'
import { useEffect, useReducer, useRef, useState } from 'react'
import { ClientOnly } from 'remix-utils/client-only'
import { toast } from 'sonner'
import { TransactionReceipt, keccak256, toHex } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = requireAuthedUser(request)

  return json({ user })
}

// State
type TransactionAction =
  | { type: 'START_TRANSACTION' }
  | { type: 'START_ON_CHAIN_TRANSACTION' }
  | { type: 'SIGNING_WALLET' }
  | { type: 'ON_CHAIN_TRANSACTION_PENDING' }
  | {
      type: 'ON_CHAIN_TRANSACTION_COMPLETE'
      txHash: `0x${string}`
      txReceipt: TransactionReceipt
    }
  | { type: 'START_OFF_CHAIN_TRANSACTION' }
  | { type: 'OFF_CHAIN_TRANSACTION_COMPLETE'; offChainReceipt: Identity }
  | { type: 'TRANSACTION_ERROR'; error: string }

type TransactionState = {
  status: TxState
  imageUrl?: string
  description?: string
  txHash?: `0x${string}`
  txReceipt?: TransactionReceipt
  offChainReceipt?: Identity
  error?: string
}

type TxState =
  | 'idle'
  | 'sending-on-chain-transaction'
  | 'signing-wallet'
  | 'on-chain-transaction-pending'
  | 'on-chain-transaction-complete'
  | 'sending-off-chain-transaction'
  | 'off-chain-transaction-complete'
  | 'transaction-complete'
  | 'transaction-error'

function transactionReducer(
  state: TransactionState,
  action: TransactionAction,
): TransactionState {
  switch (action.type) {
    case 'START_TRANSACTION':
      return { ...state, status: 'idle' }
    case 'START_ON_CHAIN_TRANSACTION':
      return { ...state, status: 'sending-on-chain-transaction' }
    case 'SIGNING_WALLET':
      return { ...state, status: 'signing-wallet' }
    case 'ON_CHAIN_TRANSACTION_PENDING':
      return { ...state, status: 'on-chain-transaction-pending' }
    case 'ON_CHAIN_TRANSACTION_COMPLETE':
      return {
        ...state,
        status: 'on-chain-transaction-complete',
        txHash: action.txHash,
        txReceipt: action.txReceipt,
      }
    case 'START_OFF_CHAIN_TRANSACTION':
      return { ...state, status: 'sending-off-chain-transaction' }
    case 'OFF_CHAIN_TRANSACTION_COMPLETE':
      return {
        ...state,
        status: 'off-chain-transaction-complete',
        offChainReceipt: action.offChainReceipt,
      }
    case 'TRANSACTION_ERROR':
      return { ...state, status: 'transaction-error', error: action.error }
    default:
      return state
  }
}

const initialState: TransactionState = {
  status: 'idle',
  error: undefined,
}

interface CreateButtonWrapperProps {
  onSuccess: () => void
}

export function CreateButton({ onSuccess }: CreateButtonWrapperProps) {
  const { user } = useLoaderData<{ user: User }>()
  const loaderFetcher = useFetcher<CreateLoaderData>()
  const loaderFetcherUrl = '/resources/create'
  const loaderFetcherRef = useRef(loaderFetcher.load)
  const [state, dispatch] = useReducer(transactionReducer, initialState)
  const formRef = useRef(null)

  useEffect(() => {
    loaderFetcherRef.current = loaderFetcher.load
  })

  useEffect(() => {
    loaderFetcherRef.current(loaderFetcherUrl)
  }, [loaderFetcherUrl])

  const { atomCost: atomCostAmount } =
    (loaderFetcher.data as CreateLoaderData) ?? {
      vaultId: BigInt(0),
      atomCost: BigInt(0),
      protocolFee: BigInt(0),
      entryFee: BigInt(0),
    }

  const atomCost = BigInt(atomCostAmount ? atomCostAmount : 0)

  useEffect(() => {
    if (
      state.status === 'on-chain-transaction-complete' &&
      typeof onSuccess === 'function'
    ) {
      onSuccess()
    }
  }, [state.status, onSuccess])

  const publicClient = usePublicClient()
  const {
    writeContractAsync: writeCreateIdentity,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
  } = useCreateIdentity()

  // off-chain fetcher
  const offChainFetcher = useFetcher<OffChainFetcherData>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastOffchainSubmission = offChainFetcher.data as any
  const createdIdentity = offChainFetcher?.data?.identity
  const emitterFetcher = useFetcher()

  const { data: walletClient } = useWalletClient()

  // create identity form
  const [form] = useForm({
    id: 'create-identity',
    lastResult: lastOffchainSubmission?.submission,
    constraint: getZodConstraint(createIdentitySchema()),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createIdentitySchema,
      })
    },
    shouldValidate: 'onInput',
    onSubmit: async (e) => handleSubmit(e),
  })
  const [loading, setLoading] = useState(false)

  interface OffChainFetcherData {
    success: 'success' | 'error'
    identity: Identity
  }

  useEffect(() => {
    if (user && user.wallet && state.status === 'idle') {
      // Prepare the formData or payload for the off-chain transaction
      const formData = new FormData()
      formData.append('display_name', user.wallet)

      // Submit the off-chain transaction
      try {
        offChainFetcher.submit(formData, {
          action: '/actions/create',
          method: 'post',
        })
      } catch (error: unknown) {
        if (error instanceof Error) {
          let errorMessage = 'Error in creating offchain identity data.'
          if (error.message.includes('rejected')) {
            errorMessage = 'Signature rejected. Try again when you are ready.'
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
          dispatch({ type: 'START_ON_CHAIN_TRANSACTION' })
          return
        }
        console.error('Error creating identity', error)
      }
    }
  }, [state])

  useEffect(() => {
    if (
      offChainFetcher.state === 'idle' &&
      offChainFetcher.data !== null &&
      offChainFetcher.data !== undefined
    ) {
      const responseData = offChainFetcher.data as OffChainFetcherData
      if (responseData !== null) {
        if (createdIdentity !== undefined && responseData.identity) {
          const { identity_id } = responseData.identity
          dispatch({
            type: 'OFF_CHAIN_TRANSACTION_COMPLETE',
            offChainReceipt: responseData.identity,
          })
          handleOnChainCreateIdentity({ atomData: identity_id })
          handleIdentityTxReceiptReceived()
        }
      }
      if (offChainFetcher.data === null || offChainFetcher.data === undefined) {
        console.error('Error in offchain data creation.:', offChainFetcher.data)
        dispatch({
          type: 'TRANSACTION_ERROR',
          error: 'Error in offchain data creation.',
        })
      }
    }
  }, [offChainFetcher.state, offChainFetcher.data, dispatch])

  useEffect(() => {
    if (state.status === 'transaction-error') {
      setLoading(false)
    }
  }, [state.status])

  // Handle Initial Form Submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    logger('clicked submit')
    event.preventDefault()
    try {
      if (walletClient) {
        dispatch({ type: 'START_TRANSACTION' })
        const formData = new FormData(event.currentTarget)

        // Initial form validation
        const submission = parseWithZod(formData, {
          schema: createIdentitySchema(),
        })

        if (
          submission.status === 'error' &&
          Object.keys(submission.error).length
        ) {
          console.error('Create identity validation errors: ', submission.error)
        }

        const formElement = event.target as HTMLFormElement
        const identityName = formElement.display_name.value as string

        const identityMessage = `Creating user identity for ${identityName}.`

        await walletClient?.signMessage({
          message: JSON.stringify(identityMessage).replace(/\\n/g, '\n'),
        })

        setLoading(true)
      }
    } catch (error: unknown) {
      logger(error)
    }
  }

  // Handle On-Chain Transaction
  async function handleOnChainCreateIdentity({
    atomData,
  }: {
    atomData: string
  }) {
    if (
      !awaitingOnChainConfirmation &&
      !awaitingWalletConfirmation &&
      user &&
      publicClient &&
      atomCost
    ) {
      try {
        dispatch({ type: 'SIGNING_WALLET' })

        const txHash = await writeCreateIdentity({
          address: MULTIVAULT_CONTRACT_ADDRESS,
          abi: multivaultAbi,
          functionName: 'createAtom',
          args: [keccak256(toHex(atomData))],
          value: atomCost,
        })

        if (txHash) {
          dispatch({ type: 'ON_CHAIN_TRANSACTION_PENDING' })
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          dispatch({
            type: 'ON_CHAIN_TRANSACTION_COMPLETE',
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
            errorMessage =
              "Insufficient Funds: Ask your gf's boyfriend for more ETH"
          }
          if (error.message.includes('rejected')) {
            errorMessage = 'Transaction rejected: Are we not so back?'
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
    } else {
      logger(
        'Cannot initiate on-chain transaction, a transaction is already pending, a wallet is already signing, or a wallet is not connected',
      )
    }
  }

  function handleIdentityTxReceiptReceived() {
    logger('createdIdentity', createdIdentity)
    if (createdIdentity) {
      logger(
        'Submitting to emitterFetcher with identity_id:',
        createdIdentity.identity_id,
      )
      emitterFetcher.submit(
        { identity_id: createdIdentity.identity_id },
        { method: 'post', action: '/actions/create-emitter' },
      )
    }
  }

  return (
    <>
      <offChainFetcher.Form
        hidden
        ref={formRef}
        action={`/actions/create`}
        method="post"
      >
        <input type="hidden" name="display_name" value={user.wallet} />
      </offChainFetcher.Form>
      <Button
        variant="primary"
        form={form.id}
        type="submit"
        disabled={loading}
        onClick={() => handleSubmit}
      >
        {awaitingWalletConfirmation || awaitingOnChainConfirmation || loading
          ? 'Creating Identity...'
          : 'Create Identity'}
      </Button>
    </>
  )
}

export default function Profile() {
  return (
    <div className="m-8 flex flex-col items-center">
      <div className="flex flex-col gap-8">
        Profile Route
        <div className="flex flex-col gap-4">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['verified-links']}
          >
            <AccordionItem value="verified-links">
              <AccordionTrigger>
                <span className="text-secondary-foreground text-sm font-normal">
                  Verified Links
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <PrivyVerifiedLinks />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="m-8 flex flex-col items-center gap-4">
          <div className="flex flex-col">
            <ClientOnly>
              {() => <CreateButton onSuccess={() => {}} />}
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  )
}
