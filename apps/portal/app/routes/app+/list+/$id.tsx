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
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import { requireUser, requireUserWallet } from '@server/auth'
import { QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  IPFS_GATEWAY_URL,
  NO_PARAM_ID_ERROR,
  NO_WALLET_ERROR,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')

  const queryClient = new QueryClient()

  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  // const listsLimit = parseInt(url.searchParams.get('effectiveLimit') || '200')
  // const listsOffset = parseInt(url.searchParams.get('listsOffset') || '0')
  // const listsOrderBy = url.searchParams.get('listsSortBy')

  const tripleResult = await fetcher<GetTripleQuery, GetTripleQueryVariables>(
    GetTripleDocument,
    {
      tripleId: id,
    },
  )()

  await queryClient.prefetchQuery({
    queryKey: ['get-triple', { id: params.id }],
    queryFn: () => tripleResult,
  })

  return json({
    initialParams: {
      id,
    },
    userWallet,
    tripleResult,
  })
}

export default function ListDetails() {
  const { initialParams, userWallet } = useLoaderData<{
    initialParams: {
      id: string
    }
    userWallet: string
  }>()

  const { data: tripleData } = useGetTripleQuery(
    {
      tripleId: initialParams.id,
    },
    {
      queryKey: [
        'get-triple',
        {
          id: initialParams.id,
        },
      ],
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
        avatarSrc={tripleData?.triple?.object?.image ?? ''}
        name={tripleData?.triple?.object?.label ?? ''}
        id={tripleData?.triple?.object?.id ?? ''}
        bio={''} // TODO: Add bio when it becomes available after the migration
        ipfsLink={
          tripleData?.triple?.object?.type === ('Account' || 'Default')
            ? `${BLOCK_EXPLORER_URL}/address/${tripleData?.triple?.object?.walletId}`
            : `${IPFS_GATEWAY_URL}/${tripleData?.triple?.object?.data?.replace('ipfs://', '')}`
        }
        onAvatarClick={() => {
          if (tripleData?.triple?.object) {
            setImageModalActive({
              isOpen: true,
              identity: tripleData?.triple?.object,
            })
          }
        }}
      />
      <ListIdentityDisplayCard
        displayName={tripleData?.triple?.object?.label ?? ''}
        avatarImgSrc={tripleData?.triple?.object?.image ?? ''}
        onClick={() => {
          navigate(`/app/identity/${tripleData?.triple?.object?.vaultId}`)
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
          navigate(`/app/identity/${tripleData?.triple?.object?.vaultId}`)
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
        identity={tripleData?.triple?.object}
        userWallet={userWallet}
        claimId={tripleData?.triple?.object?.vaultId}
        open={addIdentitiesListModalActive.isOpen}
        onClose={() =>
          setAddIdentitiesListModalActive({
            ...addIdentitiesListModalActive,
            isOpen: false,
          })
        }
      />
      {tripleData?.triple?.object && (
        <ImageModal
          displayName={tripleData?.triple?.object?.label ?? ''}
          imageSrc={tripleData?.triple?.object?.image ?? ''}
          isUser={tripleData?.triple?.object?.type === ('Account' || 'Default')}
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
