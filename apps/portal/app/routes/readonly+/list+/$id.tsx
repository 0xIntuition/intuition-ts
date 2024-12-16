import { BannerVariant, Button, Icon, ProfileCard } from '@0xintuition/1ui'
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
import { ListIdentityDisplayCard } from '@components/lists/list-identity-display-card'
import ImageModal from '@components/profile/image-modal'
import ReadOnlyBanner from '@components/read-only-banner'
import { imageModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import { QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  IPFS_GATEWAY_URL,
  NO_PARAM_ID_ERROR,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const queryClient = new QueryClient()

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

  const { origin } = new URL(request.url)

  const ogImageUrl = `${origin}/resources/create-og?id=${id}&type=list`

  return json({
    initialParams: {
      id,
      objectId,
    },
    objectResult,
    tripleResult,
    ogImageUrl,
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  const { objectResult, ogImageUrl } = data
  logger('ogImageUrl data in meta', ogImageUrl)

  return [
    {
      title: objectResult
        ? objectResult.atom?.label
        : 'Error | Intuition Explorer',
    },
    {
      name: 'description',
      content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
    },
    {
      property: 'og-title',
      name: objectResult
        ? objectResult.atom?.label
        : 'Error | Intuition Explorer',
    },
    {
      property: 'og:image',
      content: ogImageUrl,
    },
    { property: 'og:site_name', content: 'Intuition Explorer' },
    { property: 'og:locale', content: 'en_US' },
    {
      name: 'twitter:image',
      content: ogImageUrl,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: `Intuition Explorer | ${objectResult ? objectResult.atom?.label : ''}`,
    },
    {
      name: 'twitter:description',
      content: 'Bringing trust to trustless systems.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export default function ReadOnlyListDetails() {
  const { initialParams } = useLoaderData<{
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

  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)
  const navigate = useNavigate()

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-6 inline-flex max-lg:w-full">
      <ProfileCard
        variant="non-user"
        avatarSrc={objectData?.atom?.image ?? ''}
        name={objectData?.atom?.label ?? ''}
        id={objectData?.atom?.id ?? ''}
        bio={''} // TODO: Add bio when it becomes available after the migration
        ipfsLink={
          objectData?.atom?.type === ('Account' || 'Default')
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
          navigate(`/app/identity/${objectData?.atom?.vault_id}`)
        }}
        className="hover:cursor-pointer w-full"
      />

      <Button
        variant="secondary"
        onClick={() => {
          navigate(`/readonly/identity/${objectData?.atom?.vault_id}`)
        }}
        className="w-full"
      >
        View Identity <Icon name={'arrow-up-right'} className="h-3 w-3" />{' '}
      </Button>
      <ReadOnlyBanner
        variant={BannerVariant.warning}
        to={`${PATHS.LIST}/${objectData?.atom?.vault_id}`}
      />
    </div>
  )

  return (
    <>
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={<Outlet />} />
      {objectData?.atom && (
        <ImageModal
          displayName={objectData?.atom?.label ?? ''}
          imageSrc={objectData?.atom?.image ?? ''}
          isUser={
            objectData?.atom?.type === 'Account' ||
            objectData?.atom?.type === 'Default'
          }
          open={imageModalActive.isOpen}
          onClose={() =>
            setImageModalActive({
              ...imageModalActive,
              isOpen: false,
            })
          }
        />
      )}
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="list/$id" />
}
