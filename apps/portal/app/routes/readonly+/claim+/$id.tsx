import { BannerVariant, Claim, Identity } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  IdentityPresenter,
  SortDirection,
} from '@0xintuition/api'

import { DetailInfoCard } from '@components/detail-info-card'
import { ErrorPage } from '@components/error-page'
import ReadOnlyBanner from '@components/read-only-banner'
import RemixLink from '@components/remix-link'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaim } from '@lib/services/claims'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getVaultDetails } from '@server/multivault'
import { BLOCK_EXPLORER_URL, CURRENT_ENV, PATHS } from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types/vault'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  if (!id) {
    throw new Error('vault_id is undefined.')
  }

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
  const { claim } = useLiveLoader<{
    claim: ClaimPresenter
  }>(['create', 'attest'])

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-6 inline-flex w-full">
      <div className="flex-row flex m-auto md:hidden">
        <Claim
          size="xl"
          subject={{
            variant: claim.subject?.is_user ? Identity.user : Identity.nonUser,
            label: getAtomLabel(claim.subject as IdentityPresenter),
            imgSrc: getAtomImage(claim.subject as IdentityPresenter),
            id: claim.subject?.identity_id,
            description: getAtomDescription(claim.subject as IdentityPresenter),
            ipfsLink: getAtomIpfsLink(claim.subject as IdentityPresenter),
            link: getAtomLink(claim.subject as IdentityPresenter),
            linkComponent: RemixLink,
          }}
          predicate={{
            variant: claim.predicate?.is_user
              ? Identity.user
              : Identity.nonUser,
            label: getAtomLabel(claim.predicate as IdentityPresenter),
            imgSrc: getAtomImage(claim.predicate as IdentityPresenter),
            id: claim.predicate?.identity_id,
            description: getAtomDescription(
              claim.predicate as IdentityPresenter,
            ),
            ipfsLink: getAtomIpfsLink(claim.predicate as IdentityPresenter),
            link: getAtomLink(claim.predicate as IdentityPresenter),
            linkComponent: RemixLink,
          }}
          object={{
            variant: claim.object?.is_user ? Identity.user : Identity.nonUser,
            label: getAtomLabel(claim.object as IdentityPresenter),
            imgSrc: getAtomImage(claim.object as IdentityPresenter),
            id: claim.object?.identity_id,
            description: getAtomDescription(claim.object as IdentityPresenter),
            ipfsLink: getAtomIpfsLink(claim.object as IdentityPresenter),
            link: getAtomLink(claim.object as IdentityPresenter),
            linkComponent: RemixLink,
          }}
        />
      </div>
      <DetailInfoCard
        variant={Identity.user}
        list={
          claim?.predicate?.id ===
          getSpecialPredicate(CURRENT_ENV).tagPredicate.id
            ? (claim as ClaimPresenter)
            : undefined
        }
        username={claim.creator?.display_name ?? '?'}
        avatarImgSrc={claim.creator?.image ?? ''}
        id={claim.creator?.wallet ?? ''}
        description={claim.creator?.description ?? ''}
        link={
          claim.creator?.id
            ? `${PATHS.READONLY_PROFILE}/${claim.creator?.wallet}`
            : ''
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
