import { Banner, BannerVariant, Claim, Identity } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  IdentityPresenter,
  SortDirection,
} from '@0xintuition/api'

import { DetailInfoCard } from '@components/detail-info-card'
import { ErrorPage } from '@components/error-page'
import NavigationButton from '@components/navigation-link'
import ReadOnlyBanner from '@components/read-only-banner'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimOrPending } from '@lib/services/claims'
import { getSpecialPredicate } from '@lib/utils/app'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
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

  const { claim, isPending } = await getClaimOrPending(request, id)

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

  return json({
    claim,
    isPending,
    sortBy,
    direction,
    vaultDetails,
  })
}

export interface ReadOnlyClaimDetailsLoaderData {
  wallet: string
  claim: ClaimPresenter
  vaultDetails: VaultDetailsType
}

export default function ReadOnlyClaimDetails() {
  const { claim, isPending } = useLiveLoader<{
    claim: ClaimPresenter
    isPending: boolean
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
          }}
          object={{
            variant: claim.object?.is_user ? Identity.user : Identity.nonUser,
            label: getAtomLabel(claim.object as IdentityPresenter),
            imgSrc: getAtomImage(claim.object as IdentityPresenter),
            id: claim.object?.identity_id,
            description: getAtomDescription(claim.object as IdentityPresenter),
            ipfsLink: getAtomIpfsLink(claim.object as IdentityPresenter),
            link: getAtomLink(claim.object as IdentityPresenter),
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
        to={`${PATHS.CLAIM}/${claim.claim_id}`}
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
    <>
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel} />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="claim/$id" />
}