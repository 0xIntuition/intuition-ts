import { Button, Icon, ProfileCard } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'
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
import { requireUser, requireUserWallet } from '@server/auth'
import { QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  IPFS_GATEWAY_URL,
  MULTIVAULT_CONTRACT_ADDRESS,
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
    initialParams: {
      id,
      objectId,
    },
    userWallet,
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
          objectData?.atom?.type === ('Account' || 'Default')
            ? `${BLOCK_EXPLORER_URL}/address/${objectData?.atom?.walletId}`
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
          navigate(`/app/identity/${objectData?.atom?.vaultId}`)
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
          navigate(`/app/identity/${objectData?.atom?.vaultId}`)
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
        identity={
          {
            // TODO: (ENG-4782) temporary type fix until we lock in final types
            id: objectData?.atom?.id ?? '',
            label: objectData?.atom?.label ?? '',
            image: objectData?.atom?.image ?? '',
            vault_id: objectData?.atom?.vaultId,
            assets_sum: '0',
            user_assets: '0',
            contract: MULTIVAULT_CONTRACT_ADDRESS,
            asset_delta: '0',
            conviction_price: '0',
            conviction_price_delta: '0',
            conviction_sum: '0',
            num_positions: 0,
            price: '0',
            price_delta: '0',
            status: 'active',
            total_conviction: '0',
            type: 'user',
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            creator_address: '',
            display_name: objectData?.atom?.label ?? '',
            follow_vault_id: '',
            user: null,
            creator: null,
            identity_hash: '',
            identity_id: '',
            is_contract: false,
            is_user: true,
            pending: false,
            pending_type: null,
            pending_vault_id: null,
          } as unknown as IdentityPresenter
        }
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
          isUser={objectData?.atom?.type === ('Account' || 'Default')}
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
