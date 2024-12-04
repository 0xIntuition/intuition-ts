import { BannerVariant, Claim, Identity } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  SortDirection,
} from '@0xintuition/api'
import {
  fetcher,
  GetAtomQuery,
  GetTripleDocument,
  GetTripleQuery,
  GetTripleQueryVariables,
  useGetTripleQuery,
} from '@0xintuition/graphql'

import { DetailInfoCardNew } from '@components/detail-info-card'
import { ErrorPage } from '@components/error-page'
import ReadOnlyBanner from '@components/read-only-banner'
import RemixLink from '@components/remix-link'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaim } from '@lib/services/claims'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getVaultDetails } from '@server/multivault'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { BLOCK_EXPLORER_URL, CURRENT_ENV, PATHS } from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types/vault'

type Atom = GetAtomQuery['atom']

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  if (!id) {
    throw new Error('Claim ID not found in the URL.')
  }

  const queryClient = new QueryClient()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const sortBy: ClaimSortColumn =
    (searchParams.get('sortBy') as ClaimSortColumn) ?? 'CreatedAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'

  const { claim } = await getClaim(request, id)
  if (!claim) {
    throw new Response('Not Found', { status: 404 })
  }

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

  let vaultDetails: VaultDetailsType | null = null

  if (claim && claim.vault_id) {
    try {
      vaultDetails = await getVaultDetails(
        claim.contract,
        claim.vault_id,
        null, // TODO: Fix in [ENG-4038] where we refactor the params of getVaultDetails
        claim.counter_vault_id,
      )
    } catch (error) {
      console.error('Failed to fetch vaultDetails', error)
      vaultDetails = null
    }
  }

  const stringifiedClaim = `${claim.subject?.display_name} - ${claim.predicate?.display_name} - ${claim.object?.display_name}`
  const { origin } = new URL(request.url)
  const ogImageUrl = `${origin}/resources/create-og?id=${params.id}&type=claim
  `

  return json({
    claim,
    sortBy,
    direction,
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      id,
    },
    vaultDetails,
    stringifiedClaim,
    ogImageUrl,
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  const { stringifiedClaim, ogImageUrl } = data
  logger('ogImageUrl data in meta', ogImageUrl)

  return [
    {
      title: stringifiedClaim ? stringifiedClaim : 'Error | Intuition Explorer',
    },
    {
      name: 'description',
      content: `Intuition is an ecosystem of technologies composing a universal and permissionless knowledge graph, capable of handling both objective facts and subjective opinions - delivering superior data for intelligences across the spectrum, from human to artificial.`,
    },
    {
      property: 'og-title',
      name: stringifiedClaim ? stringifiedClaim : 'Error | Intuition Explorer',
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
      content: `Intuition Explorer | ${stringifiedClaim ? stringifiedClaim : ''}`,
    },
    {
      name: 'twitter:description',
      content: 'Bringing trust to trustless systems.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export interface ReadOnlyClaimDetailsLoaderData {
  wallet: string
  claim: ClaimPresenter
  vaultDetails: VaultDetailsType
}

export default function ReadOnlyClaimDetails() {
  const { claim, initialParams } = useLiveLoader<{
    claim: ClaimPresenter
    initialParams: {
      id: string
    }
  }>(['create', 'attest'])

  const { data: tripleData } = useGetTripleQuery(
    {
      tripleId: initialParams.id,
    },
    {
      queryKey: ['get-triple', { id: initialParams.id }],
    },
  )

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-6 inline-flex w-full">
      <div className="flex-row flex m-auto md:hidden">
        <Claim
          size="xl"
          maxIdentityLength={60}
          subject={{
            variant:
              tripleData?.triple?.subject?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabelGQL(tripleData?.triple?.subject as Atom),
            imgSrc: getAtomImageGQL(tripleData?.triple?.subject as Atom),
            id: tripleData?.triple?.subject?.id,
            description: getAtomDescriptionGQL(
              tripleData?.triple?.subject as Atom,
            ),
            ipfsLink: getAtomIpfsLinkGQL(tripleData?.triple?.subject as Atom),
            link: getAtomLinkGQL(tripleData?.triple?.subject as Atom),
            linkComponent: RemixLink,
          }}
          predicate={{
            variant:
              tripleData?.triple?.predicate?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabelGQL(tripleData?.triple?.predicate as Atom),
            imgSrc: getAtomImageGQL(tripleData?.triple?.predicate as Atom),
            id: tripleData?.triple?.predicate?.id,
            description: getAtomDescriptionGQL(
              tripleData?.triple?.predicate as Atom,
            ),
            ipfsLink: getAtomIpfsLinkGQL(tripleData?.triple?.predicate as Atom),
            link: getAtomLinkGQL(tripleData?.triple?.predicate as Atom),
            linkComponent: RemixLink,
          }}
          object={{
            variant:
              tripleData?.triple?.object?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabelGQL(tripleData?.triple?.object as Atom),
            imgSrc: getAtomImageGQL(tripleData?.triple?.object as Atom),
            id: tripleData?.triple?.object?.id,
            description: getAtomDescriptionGQL(
              tripleData?.triple?.object as Atom,
            ),
            ipfsLink: getAtomIpfsLinkGQL(tripleData?.triple?.object as Atom),
            link: getAtomLinkGQL(tripleData?.triple?.object as Atom),
            linkComponent: RemixLink,
          }}
        />
      </div>
      <DetailInfoCardNew
        variant={Identity.user}
        list={
          String(tripleData?.triple?.predicate?.id) ===
          String(getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId)
            ? tripleData?.triple
            : undefined
        }
        username={tripleData?.triple?.creator?.label ?? '?'}
        avatarImgSrc={tripleData?.triple?.creator?.image ?? ''}
        id={tripleData?.triple?.creator?.id ?? ''}
        description={claim.creator?.description ?? ''}
        link={
          claim.creator?.id ? `${PATHS.PROFILE}/${claim.creator?.wallet}` : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${claim.creator?.wallet}`}
        timestamp={claim.created_at}
        className="w-full"
      />
      <ReadOnlyBanner
        variant={BannerVariant.warning}
        to={`${PATHS.CLAIM}/${claim.vault_id}`}
      />
    </div>
  )

  const rightPanel = <Outlet />

  return (
    <>
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel} />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="claim/$id" />
}
