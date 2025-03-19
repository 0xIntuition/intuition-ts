import { Button, Icon, ProfileCard } from '@0xintuition/1ui'
import {
  fetcher,
  GetTripleDocument,
  GetTripleQuery,
  GetTripleQueryVariables,
  useGetTripleQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import AddIdentitiesListModal from '@components/lists/add-identities-list-modal'
import { ListIdentityDisplayCard } from '@components/lists/list-identity-display-card'
import NavigationButton from '@components/navigation-link'
import ImageModal from '@components/profile/image-modal'
import ShareCta from '@components/share-cta'
import ShareModal from '@components/share-modal'
import { useGoBack } from '@lib/hooks/useGoBack'
import {
  addIdentitiesListModalAtom,
  imageModalAtom,
  shareModalAtom,
} from '@lib/state/store'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  IPFS_GATEWAY_URL,
  NO_PARAM_ID_ERROR,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types'
import { Atom } from 'app/types/atom'
import { useAtom } from 'jotai'
import { zeroAddress } from 'viem'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userWallet = await getUserWallet(request)
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const queryAddress = userWallet?.toLowerCase() ?? zeroAddress

  // Create a new QueryClient instance
  const queryClient = new QueryClient()

  console.log('id', id)

  // Prefetch triple data (replacing ClaimsService.getClaimById)
  await queryClient.prefetchQuery({
    queryKey: ['GetTriple', { tripleId: Number(id) }],
    queryFn: () =>
      fetcher<GetTripleQuery, GetTripleQueryVariables>(GetTripleDocument, {
        tripleId: Number(id),
      })(),
  })

  let vaultDetails: VaultDetailsType | null = null
  const tripleData = await queryClient.fetchQuery({
    queryKey: ['GetTriple', { tripleId: Number(id) }],
    queryFn: () =>
      fetcher<GetTripleQuery, GetTripleQueryVariables>(GetTripleDocument, {
        tripleId: Number(id),
      })(),
  })

  console.log('tripleData', tripleData)

  if (tripleData?.triple?.vault_id) {
    try {
      // Get contract address from environment or use a default
      const contractAddress = process.env.MULTIVAULT_CONTRACT_ADDRESS || ''
      vaultDetails = await getVaultDetails(
        contractAddress,
        tripleData.triple.vault_id.toString(),
        queryAddress as `0x${string}`,
      )
    } catch (error) {
      logger('Failed to fetch vaultDetails', error)
      vaultDetails = null
    }
  }

  return json({
    userWallet,
    vaultDetails,
    dehydratedState: dehydrate(queryClient),
  })
}

export default function ListDetails() {
  const { userWallet } = useLoaderData<{
    userWallet: string
    vaultDetails: VaultDetailsType
  }>()

  const { data: tripleData } = useGetTripleQuery(
    {
      tripleId: Number(location.pathname.split('/').pop() || '0'),
    },
    {
      queryKey: [
        'GetTriple',
        { tripleId: Number(location.pathname.split('/').pop() || '0') },
      ],
    },
  )

  const triple = tripleData?.triple

  const [addIdentitiesListModalActive, setAddIdentitiesListModalActive] =
    useAtom(addIdentitiesListModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)

  const navigate = useNavigate()
  const handleGoBack = useGoBack({ fallbackRoute: PATHS.EXPLORE_LISTS })

  const hasUserParam = location.search.includes('user=')
  const fullPath = hasUserParam
    ? `${location.pathname}${location.search}`
    : `${location.pathname}${location.search}${location.search ? '&' : '?'}user=${userWallet}&tab=additional`

  if (!triple) {
    return <div>Loading...</div>
  }

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-6 inline-flex max-lg:w-full">
      <NavigationButton
        variant="secondary"
        size="icon"
        to="#"
        onClick={handleGoBack}
      >
        <Icon name="arrow-left" />
      </NavigationButton>
      <ProfileCard
        variant="non-user"
        avatarSrc={triple.object?.image ?? ''}
        name={triple.object?.label ?? ''}
        id={triple.object_id?.toString() ?? ''}
        bio={
          triple.object?.value?.person?.description ||
          triple.object?.value?.thing?.description ||
          ''
        }
        ipfsLink={
          triple.object?.type === 'person'
            ? `${BLOCK_EXPLORER_URL}/address/${triple.object_id}`
            : `${IPFS_GATEWAY_URL}/${triple.object?.data?.replace('ipfs://', '')}`
        }
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
          })
        }}
      />
      <ListIdentityDisplayCard
        displayName={triple.object?.label ?? ''}
        avatarImgSrc={triple.object?.image ?? ''}
        onClick={() => {
          navigate(`/app/identity/${triple.vault_id}`)
        }}
        className="hover:cursor-pointer w-full"
      />
      {/*
      Reintroduce this card once we figure out how to handle the 'creator' of the list.

      <InfoCard
        variant="user"
        username={triple.creator?.label ?? ''}
        avatarImgSrc={triple.creator?.image ?? ''}
        id={triple.creator?.id ?? ''}
        description={''}
        link={
          triple.creator?.id ? `${PATHS.PROFILE}/${triple.creator?.id}` : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${triple.creator?.id}`}
        timestamp={triple.block_timestamp?.toString() ?? ''}
        className="w-full"
      /> */}
      <Button
        variant="secondary"
        onClick={() => {
          navigate(`/app/identity/${triple.vault_id}`)
        }}
        className="w-full"
      >
        View Identity <Icon name={'arrow-up-right'} className="h-3 w-3" />{' '}
      </Button>
      <ShareCta
        onShareClick={() =>
          setShareModalActive({
            isOpen: true,
            currentPath: fullPath,
          })
        }
      />
    </div>
  )

  return (
    <>
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={<Outlet />} />
      <AddIdentitiesListModal
        identity={triple.object as Atom}
        userWallet={userWallet}
        claimId={triple.id?.toString()}
        open={addIdentitiesListModalActive.isOpen}
        onClose={() =>
          setAddIdentitiesListModalActive({
            ...addIdentitiesListModalActive,
            isOpen: false,
          })
        }
      />
      <ImageModal
        displayName={triple.object?.label ?? ''}
        imageSrc={triple.object?.image ?? ''}
        isUser={triple.object?.type === 'person'}
        open={imageModalActive.isOpen}
        onClose={() =>
          setImageModalActive({
            ...imageModalActive,
            isOpen: false,
          })
        }
      />
      <ShareModal
        currentPath={fullPath}
        open={shareModalActive.isOpen}
        onClose={() =>
          setShareModalActive({
            ...shareModalActive,
            isOpen: false,
          })
        }
      />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="list/$id" />
}
