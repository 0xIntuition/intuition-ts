import { useEffect, useRef, useState } from 'react'

import { toast } from '@0xintuition/1ui'
import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
  UserPresenter,
  UsersService,
} from '@0xintuition/api'

import PrivyLogout from '@client/privy-logout'
import EditProfileModal from '@components/edit-profile/modal'
import SubmitButton from '@components/submit-button'
import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateAtom } from '@lib/hooks/useCreateAtom'
import {
  identityTransactionReducer,
  initialIdentityTransactionState,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import { editProfileModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { fetchWrapper, invariant, sliceString } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { requireUserWallet } from '@server/auth'
import * as blockies from 'blockies-ts'
import { MULTIVAULT_CONTRACT_ADDRESS, NO_WALLET_ERROR } from 'consts'
import { useAtom } from 'jotai'
import { ClientOnly } from 'remix-utils/client-only'
import {
  IdentityTransactionActionType,
  IdentityTransactionStateType,
} from 'types'
import { toHex } from 'viem'
import { useConnectorClient, usePublicClient } from 'wagmi'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: wallet,
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

  const userObject = await fetchWrapper({
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet,
    },
  })

  if (!userObject) {
    console.log('No user found in DB')
    return json({ wallet, userIdentity, userObject })
  }

  return json({ wallet, userIdentity, userObject })
}

interface CreateButtonWrapperProps {
  setEditProfileModalActive: (active: boolean) => void
}

export function CreateButton({
  setEditProfileModalActive,
}: CreateButtonWrapperProps) {
  const { wallet } = useLoaderData<{ wallet: string }>()
  const loaderFetcher = useFetcher<CreateLoaderData>()
  const loaderFetcherUrl = '/resources/create'
  const loaderFetcherRef = useRef(loaderFetcher.load)
  const { state, dispatch } = useTransactionState<
    IdentityTransactionStateType,
    IdentityTransactionActionType
  >(identityTransactionReducer, initialIdentityTransactionState)

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
      wallet &&
      publicClient &&
      atomCost
    ) {
      try {
        dispatch({ type: 'APPROVE_TRANSACTION' })

        const txHash = await writeCreateIdentity({
          address: MULTIVAULT_CONTRACT_ADDRESS,
          abi: multivaultAbi,
          functionName: 'createAtom',
          args: [toHex(atomData)],
          value: atomCost,
        })

        if (txHash) {
          dispatch({ type: 'TRANSACTION_PENDING' })
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          logger('receipt', receipt)
          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash,
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
          toast.error(errorMessage)
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
    if (state.status === 'complete') {
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
      if (responseData !== null) {
        if (createdIdentity !== undefined && responseData.identity) {
          const { identity_id } = responseData.identity
          dispatch({
            type: 'PUBLISHING_IDENTITY',
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
    if (state.status === 'error') {
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
          dispatch({ type: 'PREPARING_IDENTITY' })
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
            toast.error(errorMessage)
            dispatch({ type: 'START_TRANSACTION' })
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
  const { wallet, userObject } = useLoaderData<{
    wallet: string
    userObject: UserPresenter
  }>()
  const imgSrc = blockies.create({ seed: wallet }).toDataURL()

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
                      {sliceString(wallet, 6, 4)}
                    </div>
                    <div className="w-[0px] self-stretch pb-0.5 justify-start items-end gap-2.5 flex">
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <ClientOnly>
                {() => (
                  <>
                    <CreateButton
                      setEditProfileModalActive={setEditProfileModalActive}
                    />
                    <PrivyLogout wallet={wallet} />
                  </>
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
