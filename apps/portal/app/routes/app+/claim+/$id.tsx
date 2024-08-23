import { useEffect, useState } from 'react'

import {
  Banner,
  Claim,
  ClaimStakeCard,
  Icon,
  Identity,
  InfoCard,
  PieChartVariant,
  PositionCard,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  Tag,
  TagSize,
  TagVariant,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  IdentityPresenter,
  SortDirection,
} from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import NavigationButton from '@components/navigation-link'
import StakeModal from '@components/stake/stake-modal'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimOrPending } from '@lib/services/claims'
import { stakeModalAtom } from '@lib/state/store'
import {
  calculatePercentageOfTvl,
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLocation, useNavigate } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import { BLOCK_EXPLORER_URL, NO_WALLET_ERROR, PATHS } from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types/vault'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

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
        wallet as `0x${string}`,
        claim.counter_vault_id,
      )
    } catch (error) {
      console.error('Failed to fetch vaultDetails', error)
      vaultDetails = null
    }
  }

  return json({
    wallet,
    claim,
    isPending,
    sortBy,
    direction,
    vaultDetails,
  })
}

export interface ClaimDetailsLoaderData {
  wallet: string
  claim: ClaimPresenter
  vaultDetails: VaultDetailsType
}

export default function ClaimDetails() {
  const { wallet, claim, vaultDetails, isPending } = useLiveLoader<{
    wallet: string
    claim: ClaimPresenter
    vaultDetails: VaultDetailsType
    isPending: boolean
  }>(['create', 'attest'])
  const navigate = useNavigate()

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)

  const direction: 'for' | 'against' = isPending
    ? 'for'
    : (vaultDetails?.user_conviction ?? claim.user_conviction_for) > '0' ||
        (vaultDetails?.user_conviction_against ??
          claim.user_conviction_against) === '0'
      ? 'for'
      : 'against'

  const user_assets: string = isPending
    ? '0'
    : (vaultDetails?.user_conviction ?? claim.user_conviction_for) > '0'
      ? vaultDetails?.user_assets ?? claim.user_assets_for
      : vaultDetails?.user_assets_against ?? claim.user_assets_against

  const assets_sum: string = isPending
    ? '0'
    : (vaultDetails?.assets_sum ?? claim.for_assets_sum) > '0'
      ? vaultDetails?.assets_sum ?? claim.for_assets_sum
      : vaultDetails?.against_assets_sum ?? claim.against_assets_sum

  const userConviction = isPending
    ? '0'
    : vaultDetails?.user_conviction ?? claim.user_conviction_for

  const directionTagVariant = isPending
    ? TagVariant.for
    : +userConviction > 0
      ? TagVariant.for
      : TagVariant.against

  const directionTagText = isPending
    ? 'FOR'
    : +userConviction > 0
      ? 'FOR'
      : 'AGAINST'

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-6 inline-flex w-full">
      <NavigationButton variant="secondary" size="icon" to={'..'}>
        <Icon name="arrow-left" />
      </NavigationButton>
      <div className="flex-row flex m-auto md:hidden">
        <Claim
          size="xl"
          link={`${PATHS.CLAIM}/${claim?.claim_id}`}
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
      {vaultDetails !== null && user_assets !== '0' && !isPending ? (
        <PositionCard
          onButtonClick={() =>
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'redeem',
              modalType: 'claim',
              direction,
              isOpen: true,
            }))
          }
        >
          <div>
            <PositionCardStaked
              amount={user_assets ? +formatBalance(user_assets, 18) : 0}
            />
            <Tag variant={directionTagVariant} size={TagSize.sm}>
              {directionTagText}
            </Tag>
          </div>
          <PositionCardOwnership
            percentOwnership={
              user_assets !== null && assets_sum
                ? +calculatePercentageOfTvl(
                    user_assets,
                    (
                      +vaultDetails.assets_sum +
                      +(vaultDetails.against_assets_sum ?? '0')
                    ).toString(),
                  )
                : 0
            }
            variant={
              direction === 'for'
                ? PieChartVariant.for
                : PieChartVariant.against
            }
          />
          <PositionCardLastUpdated timestamp={claim.updated_at} />
        </PositionCard>
      ) : null}
      {!isPending && (
        <ClaimStakeCard
          currency="ETH"
          totalTVL={
            +formatBalance(
              +vaultDetails.assets_sum +
                +(vaultDetails.against_assets_sum
                  ? vaultDetails.against_assets_sum
                  : '0'),
            )
          }
          tvlAgainst={
            +formatBalance(
              vaultDetails.against_assets_sum ?? claim.against_assets_sum,
            )
          }
          tvlFor={
            +formatBalance(vaultDetails.assets_sum ?? claim.for_assets_sum)
          }
          amountAgainst={claim.against_num_positions}
          amountFor={claim.for_num_positions}
          onAgainstBtnClick={() =>
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'deposit',
              modalType: 'claim',
              direction: 'against',
              isOpen: true,
            }))
          }
          onForBtnClick={() =>
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'deposit',
              modalType: 'claim',
              direction: 'for',
              isOpen: true,
            }))
          }
          disableForBtn={
            (vaultDetails.user_conviction_against ??
              claim.user_conviction_against) > '0'
          }
          disableAgainstBtn={
            (vaultDetails.user_conviction ?? claim.user_conviction_for) > '0'
          }
        />
      )}
      <InfoCard
        variant={Identity.user}
        username={claim.creator?.display_name ?? '?'}
        avatarImgSrc={claim.creator?.image ?? ''}
        id={claim.creator?.wallet ?? ''}
        description={claim.creator?.description ?? ''}
        link={
          claim.creator?.id ? `${PATHS.PROFILE}/${claim.creator?.wallet}` : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${claim.creator?.wallet}`}
        timestamp={claim.created_at}
        onClick={() => {
          navigate(`/app/profile/${claim.creator?.wallet}`)
        }}
        className="hover:cursor-pointer w-full"
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
      {!isPending && (
        <StakeModal
          userWallet={wallet}
          contract={claim.contract}
          open={stakeModalActive.isOpen}
          direction={stakeModalActive.direction}
          claim={claim}
          vaultDetails={vaultDetails}
          onClose={() => {
            setStakeModalActive((prevState) => ({
              ...prevState,
              isOpen: false,
              mode: undefined,
            }))
          }}
        />
      )}
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="claim/$id" />
}
