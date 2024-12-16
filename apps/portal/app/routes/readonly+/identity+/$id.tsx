import {
  Banner,
  BannerVariant,
  Identity,
  ProfileCard,
  Tags,
  TagsContent,
  TagWithValue,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  IdentityPresenter,
} from '@0xintuition/api'
import {
  fetcher,
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetTagsDocument,
  GetTagsQuery,
  GetTagsQueryVariables,
  useGetAtomQuery,
  useGetTagsQuery,
} from '@0xintuition/graphql'

import { DetailInfoCard } from '@components/detail-info-card'
import { ErrorPage } from '@components/error-page'
import NavigationButton from '@components/navigation-link'
import ImageModal from '@components/profile/image-modal'
import ReadOnlyBanner from '@components/read-only-banner'
import { getIdentityOrPending } from '@lib/services/identities'
import { imageModalAtom } from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  getAtomDescriptionGQL,
  getAtomIdGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { BLOCK_EXPLORER_URL, CURRENT_ENV, PATHS } from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  logger('[$ID] -- START')

  if (!params.id) {
    return
  }

  const queryClient = new QueryClient()

  const { identity, isPending } = await getIdentityOrPending(request, params.id)

  if (!identity) {
    throw new Response('Not Found', { status: 404 })
  }

  let list: ClaimPresenter | null = null

  try {
    const listResult = await ClaimsService.searchClaims({
      predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      object: identity.id,
    })

    if (listResult && listResult.data.length > 0) {
      list = listResult.data[0]
    }
  } catch (error) {
    logger('Failed to fetch list:', error)
  }

  let atomResult: GetAtomQuery | null = null

  try {
    logger('Fetching Account Data...')
    atomResult = await fetcher<GetAtomQuery, GetAtomQueryVariables>(
      GetAtomDocument,
      { id: params.id },
    )()

    if (!atomResult) {
      throw new Error('No atom data found for id')
    }

    await queryClient.prefetchQuery({
      queryKey: ['get-atom', { id: params.id }],
      queryFn: () => atomResult,
    })

    const atomTagsResult = await fetcher<GetTagsQuery, GetTagsQueryVariables>(
      GetTagsDocument,
      {
        subjectId: params.id,
        predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
      },
    )()

    await queryClient.prefetchQuery({
      queryKey: [
        'get-tags',
        {
          subjectId: params.id,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      queryFn: () => atomTagsResult,
    })
  } catch (error) {
    logger('Query Error:', error)
    throw error
  }

  const { origin } = new URL(request.url)
  const ogImageUrl = `${origin}/resources/create-og?id=${params.id}&type=identity`

  logger('[$ID] -- END')
  return json({
    identity,
    list,
    isPending,
    ogImageUrl,
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      atomId: params.id,
    },
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  const { identity, ogImageUrl } = data
  logger('ogImageUrl data in meta', ogImageUrl)

  return [
    {
      title: identity ? identity.display_name : 'Error | Intuition Explorer',
    },
    {
      name: 'description',
      content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
    },
    {
      property: 'og-title',
      name: identity ? identity.display_name : 'Error | Intuition Explorer',
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
      content: `Intuition Explorer | ${identity ? identity.display_name : ''}`,
    },
    {
      name: 'twitter:description',
      content: 'Bringing trust to trustless systems.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export interface ReadOnlyIdentityLoaderData {
  identity: IdentityPresenter
  list: ClaimPresenter
  isPending: boolean
  initialParams: {
    atomId: string
  }
}

export default function ReadOnlyIdentityDetails() {
  const { identity, list, isPending, initialParams } =
    useLoaderData<ReadOnlyIdentityLoaderData>()

  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)

  const { data: atomResult } = useGetAtomQuery(
    {
      id: initialParams.atomId,
    },
    {
      queryKey: ['get-atom', { id: initialParams.atomId }],
    },
  )

  const { data: atomTagsResult } = useGetTagsQuery(
    {
      subjectId: initialParams.atomId,
      predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    },
    {
      queryKey: [
        'get-tags',
        {
          subjectId: initialParams.atomId,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      enabled: !!initialParams.atomId,
    },
  )

  const leftPanel = (
    <div className="flex-col justify-start items-start inline-flex gap-6 max-lg:w-full">
      <ProfileCard
        variant={Identity.nonUser}
        avatarSrc={getAtomImageGQL(atomResult?.atom) ?? ''}
        name={getAtomLabelGQL(atomResult?.atom) ?? ''}
        id={getAtomIdGQL(atomResult?.atom) ?? ''}
        vaultId={atomResult?.atom?.vault_id}
        bio={getAtomDescriptionGQL(atomResult?.atom) ?? ''}
        ipfsLink={getAtomIpfsLinkGQL(atomResult?.atom) ?? ''}
        externalLink={getAtomLinkGQL(atomResult?.atom) ?? ''}
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
          })
        }}
      />

      {!isPending && atomTagsResult && atomTagsResult.triples.length > 0 && (
        <Tags>
          <div className="flex flex-row gap-2 md:flex-col">
            <TagsContent numberOfTags={atomTagsResult.triples.length}>
              {atomTagsResult.triples.map((tag) => (
                <TagWithValue
                  key={tag.id}
                  label={tag.object?.label ?? ''}
                  value={tag.vault?.allPositions?.aggregate?.count ?? 0}
                />
              ))}
            </TagsContent>
          </div>
        </Tags>
      )}

      <DetailInfoCard
        variant={Identity.user}
        list={list}
        username={atomResult?.atom?.creator?.label ?? '?'}
        avatarImgSrc={atomResult?.atom?.creator?.image ?? ''}
        id={atomResult?.atom?.creator?.id ?? ''}
        description={identity.creator?.description ?? ''}
        link={
          atomResult?.atom?.creator?.id
            ? `${PATHS.READONLY_PROFILE}/${atomResult?.atom?.creator?.id}`
            : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${atomResult?.atom?.creator?.id}`}
        timestamp={new Date().toISOString()} // TODO: Add blockTimestamp once available
        className="w-full"
        readOnly={true}
      />
      <ReadOnlyBanner
        variant={BannerVariant.warning}
        to={`${PATHS.IDENTITY}/${identity.vault_id}`}
      />
    </div>
  )

  const rightPanel = isPending ? (
    <Banner
      variant="warning"
      title="Please Refresh the Page"
      message="It looks like the on-chain transaction was successful, but we're still waiting for the information to update. Please refresh the page to ensure everything is up to date."
    >
      <NavigationButton
        reloadDocument
        variant="secondary"
        to=""
        className="max-lg:w-full"
      >
        Refresh
      </NavigationButton>
    </Banner>
  ) : (
    <Outlet />
  )

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      <ImageModal
        displayName={identity?.display_name ?? ''}
        imageSrc={identity?.image ?? ''}
        isUser={identity?.is_user}
        open={imageModalActive.isOpen}
        onClose={() =>
          setImageModalActive({
            ...imageModalActive,
            isOpen: false,
          })
        }
      />
    </TwoPanelLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="identity/$id" />
}
