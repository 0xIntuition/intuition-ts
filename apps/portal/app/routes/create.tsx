import { useEffect, useReducer, useRef, useState } from 'react'

import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
  OpenAPI,
  UserPresenter,
  UsersService,
} from '@0xintuition/api'

import EditProfileModal from '@components/edit-profile-modal'
import SubmitButton from '@components/submit-button'
import Toast from '@components/toast'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateAtom } from '@lib/hooks/useCreateAtom'
import { editProfileModalAtom } from '@lib/state/store'
import { MULTIVAULT_CONTRACT_ADDRESS } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { getAuthHeaders, sliceString } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { getPrivyAccessToken } from '@server/privy'
import * as blockies from 'blockies-ts'
import { useAtom } from 'jotai'
import { AlertCircle } from 'lucide-react'
import { ClientOnly } from 'remix-utils/client-only'
import { toast } from 'sonner'
import { SessionUser } from 'types/user'
import { toHex, TransactionReceipt } from 'viem'
import { useConnectorClient, usePublicClient } from 'wagmi'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  console.log('accessToken', accessToken)
  const session = context.get(SessionContext)
  console.log('[LOADER] user', session.get('user'))
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return logger('No user found in session')
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

  let userObject
  try {
    userObject = await UsersService.getUserByWallet({
      wallet: user.details.wallet.address,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userObject = undefined
      console.log(
        `${error.name} - ${error.status}: ${error.message} ${error.url}`,
      )
    } else {
      throw error
    }
  }

  if (!userObject) {
    console.log('No user found in DB')
    return json({ user, userIdentity, userObject })
  }

  logger('userObject', userObject)

  return json({ user, userIdentity, userObject })
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
  setEditProfileModalActive: (active: boolean) => void
}

export function CreateButton({
  setEditProfileModalActive,
}: CreateButtonWrapperProps) {
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

  const publicClient = usePublicClient()
  const {
    writeContractAsync: writeCreateIdentity,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
  } = useCreateAtom()

  // off-chain fetcher
  const offChainFetcher = useFetcher<OffChainFetcherData>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createdIdentity = offChainFetcher?.data?.identity
  const emitterFetcher = useFetcher()
  logger('createdIdentity', createdIdentity)

  const { data: walletClient } = useConnectorClient()

  const [loading, setLoading] = useState(false)

  interface OffChainFetcherData {
    success: 'success' | 'error'
    identity: IdentityPresenter
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

  useEffect(() => {
    if (state.status === 'on-chain-transaction-complete') {
      handleIdentityTxReceiptReceived()
      setEditProfileModalActive(true)
    }
  }, [state.status])

  useEffect(() => {
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
  const handleSubmit = async () => {
    logger('handleSubmit')
    try {
      if (walletClient) {
        dispatch({ type: 'START_TRANSACTION' })
        const formData = new FormData()
        formData.append('display_name', walletClient.account.address)
        formData.append('identity_id', walletClient.account.address)

        for (const [key, value] of formData.entries()) {
          logger(`${key}: ${value}`)
        }

        try {
          dispatch({ type: 'START_OFF_CHAIN_TRANSACTION' })
          offChainFetcher.submit(formData, {
            action: '/actions/create-profile',
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
      <SubmitButton
        loading={loading}
        onClick={handleSubmit}
        buttonText="Create Identity"
        loadingText="Creating Identity..."
      />
    </>
  )
}

export default function Profile() {
  const { user, userObject } = useLoaderData<{
    user: SessionUser
    userObject: UserPresenter
  }>()
  const imgSrc = blockies
    .create({ seed: user?.details?.wallet?.address })
    .toDataURL()

  const [editProfileModalActive, setEditProfileModalActive] =
    useAtom(editProfileModalAtom)

  const navigate = useNavigate()

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[600px] h-[307px] flex-col justify-start items-start gap-[42px] inline-flex">
          <div className="h-[37px] flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch h-[37px] flex-col justify-start items-start gap-2.5 flex">
              <div className="self-stretch text-white text-3xl font-semibold">
                Create Your Decentralized Identifier
              </div>
            </div>
          </div>
          <div className="h-28 p-6 bg-black rounded-[10px] shadow border border-solid border-neutral-300/20 backdrop-blur-xl flex-col justify-center items-center gap-6 flex">
            <div className="w-[552px] justify-between items-center inline-flex">
              <div className="grow shrink basis-0 h-16 justify-start items-center gap-[18px] flex">
                <div className="w-[70px] pr-1.5 justify-start items-center flex">
                  <img
                    className="w-16 h-16 relative rounded-full border border-neutral-700"
                    src={imgSrc}
                    alt="Avatar"
                  />
                </div>
                <div className="flex-col justify-start items-start gap-[3px] inline-flex">
                  <div className="justify-start items-end gap-1.5 inline-flex">
                    <div className="text-neutral-200 text-base font-medium leading-normal">
                      {sliceString(user?.details?.wallet?.address, 6, 4)}
                    </div>
                    <div className="w-[0px] self-stretch pb-0.5 justify-start items-end gap-2.5 flex">
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <ClientOnly>
                {() => (
                  <CreateButton
                    setEditProfileModalActive={setEditProfileModalActive}
                  />
                )}
              </ClientOnly>
            </div>
          </div>
          <div className="w-[600px] justify-start items-start gap-6 inline-flex">
            <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-6 inline-flex">
              <div className="self-stretch h-[74px] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch text-white text-base font-medium leading-normal">
                  Welcome to the world of Intuition.
                </div>
                <div className="self-stretch text-white/40 text-sm font-normal leading-tight">
                  By completing this step, you&#39;ll create an &#39;Atom&#39;
                  for your Ethereum address - a universally referenceable node
                  in the Intuition Trust Graph, representative of you. With
                  this, you&#39;ll be able to make claims about things, and will
                  allow claims to be made about you - taking the first step in
                  your journey towards better intuition in all of your
                  interactions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        userObject={userObject}
        open={editProfileModalActive}
        onClose={() => {
          setEditProfileModalActive(false)
          navigate('/app/profile')
        }}
      />
    </>
  )
}
