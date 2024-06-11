import { useEffect, useReducer, useRef, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from '@0xintuition/1ui'
import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
  OpenAPI,
} from '@0xintuition/api'

import { PrivyVerifiedLinks } from '@client/privy-verified-links'
import Toast from '@components/toast'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateIdentity } from '@lib/hooks/useCreateIdentity'
import { MULTIVAULT_CONTRACT_ADDRESS } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { onboardingModalCookie } from '@server/onboarding'
import { getPrivyAccessToken } from '@server/privy'
import { AlertCircle } from 'lucide-react'
import { ClientOnly } from 'remix-utils/client-only'
import { toast } from 'sonner'
import { SessionUser } from 'types/user'
import { toHex, TransactionReceipt } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  console.log('[LOADER] user', session.get('user'))
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return console.log('No user found in session')
  }

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: user.details.wallet.address,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userIdentity = undefined
      console.log(
        `${error.name} - ${error.status}: ${error.message} ${error.url}`,
      )
    } else {
      throw error
    }
  }

  const cookieHeader = request.headers.get('Cookie')
  const cookie = await onboardingModalCookie.parse(cookieHeader)

  if (!cookie) {
    return json({
      user,
      userIdentity,
    })
  }

  logger('userIdentity', userIdentity)
  return json({ user, userIdentity })
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
  | {
      type: 'OFF_CHAIN_TRANSACTION_COMPLETE'
      offChainReceipt: IdentityPresenter
    }
  | { type: 'TRANSACTION_ERROR'; error: string }

type TransactionState = {
  status: TxState
  imageUrl?: string
  description?: string
  txHash?: `0x${string}`
  txReceipt?: TransactionReceipt
  offChainReceipt?: IdentityPresenter
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
  const { user } = useLoaderData<{ user: SessionUser }>()
  const loaderFetcher = useFetcher<CreateLoaderData>()
  const loaderFetcherUrl = '/resources/create'
  const loaderFetcherRef = useRef(loaderFetcher.load)
  const [state, dispatch] = useReducer(transactionReducer, initialState)

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
  const createdIdentity = offChainFetcher?.data?.identity
  const emitterFetcher = useFetcher()
  logger('createdIdentity', createdIdentity)

  const { data: walletClient } = useWalletClient()

  const [loading, setLoading] = useState(false)

  interface OffChainFetcherData {
    success: 'success' | 'error'
    identity: IdentityPresenter
  }

  useEffect(() => {
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
            args: [toHex(atomData)],
            value: atomCost,
          })

          if (txHash) {
            dispatch({ type: 'ON_CHAIN_TRANSACTION_PENDING' })
            const receipt = await publicClient.waitForTransactionReceipt({
              hash: txHash,
            })
            logger('receipt', receipt)
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
      } else {
        logger(
          'Cannot initiate on-chain transaction, a transaction is already pending, a wallet is already signing, or a wallet is not connected',
        )
      }
    }

    function handleIdentityTxReceiptReceived() {
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
    if (
      offChainFetcher.state === 'idle' &&
      offChainFetcher.data !== null &&
      offChainFetcher.data !== undefined
    ) {
      const responseData = offChainFetcher.data as OffChainFetcherData
      console.log('responseData', responseData)
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
  }, [
    offChainFetcher.state,
    offChainFetcher.data,
    dispatch,
    createdIdentity,
    awaitingOnChainConfirmation,
    awaitingWalletConfirmation,
    user,
    publicClient,
    atomCost,
    writeCreateIdentity,
    emitterFetcher,
  ])

  useEffect(() => {
    if (state.status === 'transaction-error') {
      setLoading(false)
    }
  }, [state.status])

  // Handle Initial Form Submit
  const handleSubmit = async () => {
    logger('handleSubmit')
    try {
      if (walletClient) {
        dispatch({ type: 'START_TRANSACTION' })
        const formData = new FormData()
        formData.append('display_name', walletClient.account.address)
        formData.append('identity_id', walletClient.account.address)
        formData.append('description', 'test')

        for (const [key, value] of formData.entries()) {
          logger(`${key}: ${value}`)
        }

        try {
          dispatch({ type: 'START_OFF_CHAIN_TRANSACTION' })
          offChainFetcher.submit(formData, {
            action: '/actions/create-user-identity',
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

        setLoading(true)
      }
    } catch (error: unknown) {
      logger(error)
    }
  }

  return (
    <>
      <Button variant="primary" disabled={loading} onClick={handleSubmit}>
        {awaitingWalletConfirmation || awaitingOnChainConfirmation || loading
          ? 'Creating Identity...'
          : 'Create Identity'}
      </Button>
    </>
  )
}

export default function Profile() {
  const { userIdentity, user } = useLoaderData<{
    userIdentity: IdentityPresenter
    user: SessionUser
  }>()

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        {userIdentity ? (
          <div>
            <p>User Identity Exists</p>
            <p>{userIdentity.id}</p>
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
                    <PrivyVerifiedLinks
                      privyUser={JSON.parse(JSON.stringify(user))}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ) : (
          <ClientOnly>{() => <CreateButton onSuccess={() => {}} />}</ClientOnly>
        )}
      </div>
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
              <PrivyVerifiedLinks
                privyUser={JSON.parse(JSON.stringify(user))}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
