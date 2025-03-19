import { Button, Icon, ProfileCard } from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetTripleDocument,
  GetTripleQuery,
  GetTripleQueryVariables,
  useGetAtomQuery,
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
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  IPFS_GATEWAY_URL,
  NO_PARAM_ID_ERROR,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { Atom } from 'app/types/atom'
import { useAtom } from 'jotai'
import { zeroAddress } from 'viem'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()

  const userWallet = await getUserWallet(request)
  const queryAddress = userWallet?.toLowerCase() ?? zeroAddress

  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const [, objectId] = id.split('-')
  invariant(objectId, 'Object ID not found in composite ID')

  // const listsLimit = parseInt(url.searchParams.get('effectiveLimit') || '200')
  // const listsOffset = parseInt(url.searchParams.get('listsOffset') || '0')
  // const listsOrderBy = url.searchParams.get('listsSortBy')

  const tripleResult = await fetcher<GetTripleQuery, GetTripleQueryVariables>(
    GetTripleDocument,
    {
      tripleId: objectId,
    },
  )()

  await queryClient.prefetchQuery({
    queryKey: ['get-triple', { id: objectId }],
    queryFn: () => tripleResult,
  })

  const objectResult = await fetcher<GetAtomQuery, GetAtomQueryVariables>(
    GetAtomDocument,
    {
      id: objectId,
    },
  )()

  await queryClient.prefetchQuery({
    queryKey: ['get-object', { id: objectId }],
    queryFn: () => objectResult,
  })

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      id,
      objectId,
    },
    userWallet: queryAddress,
    objectResult,
    tripleResult,
  })
}

export default function ListDetails() {
  const { initialParams, userWallet } = useLoaderData<{
    initialParams: {
      id: string
      objectId: string
    }
    userWallet: string
  }>()

  const { data: objectData } = useGetAtomQuery(
    {
      id: initialParams.objectId,
    },
    {
      queryKey: ['get-object', { id: initialParams.objectId }],
    },
  )

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
        avatarSrc={objectData?.atom?.image ?? ''}
        name={objectData?.atom?.label ?? ''}
        id={objectData?.atom?.id ?? ''}
        bio={''} // TODO: Add bio when it becomes available after the migration
        ipfsLink={
          objectData?.atom?.type === 'Account'
            ? `${BLOCK_EXPLORER_URL}/address/${objectData?.atom?.wallet_id}`
            : `${IPFS_GATEWAY_URL}/${objectData?.atom?.data?.replace('ipfs://', '')}`
        }
        onAvatarClick={() => {
          if (objectData?.atom) {
            setImageModalActive({
              isOpen: true,
            })
          }
        }}
      />
      <ListIdentityDisplayCard
        displayName={objectData?.atom?.label ?? ''}
        avatarImgSrc={objectData?.atom?.image ?? ''}
        onClick={() => {
          navigate(`/app/identity/${objectData?.atom?.id}`)
        }}
        className="hover:cursor-pointer w-full"
      />
      {/*
      Reintroduce this card once we figure out how to handle the 'creator' of the list.

      <InfoCard
        variant="user"
        username={claim.creator?.display_name ?? claim.creator?.wallet ?? ''}
        avatarImgSrc={claim.creator?.image ?? ''}
        id={claim.creator?.wallet ?? ''}
        description={claim.creator?.description ?? ''}
        link={
          claim.creator?.id ? `${PATHS.PROFILE}/${claim.creator?.wallet}` : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${claim.creator?.wallet}`}
        timestamp={claim.created_at}
        className="w-full"
      /> */}
      <Button
        variant="secondary"
        onClick={() => {
          navigate(`/app/identity/${objectData?.atom?.id}`)
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
        identity={objectData?.atom as unknown as Atom}
        userWallet={userWallet}
        open={addIdentitiesListModalActive.isOpen}
        onClose={() =>
          setAddIdentitiesListModalActive({
            ...addIdentitiesListModalActive,
            isOpen: false,
          })
        }
      />
      {objectData?.atom && (
        <ImageModal
          displayName={objectData?.atom?.label ?? ''}
          imageSrc={objectData?.atom?.image ?? ''}
          isUser={objectData?.atom?.type === 'Account'}
          open={imageModalActive.isOpen}
          onClose={() =>
            setImageModalActive({
              ...imageModalActive,
              isOpen: false,
            })
          }
        />
      )}
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
