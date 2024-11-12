import {
  Claim,
  ClaimStakeCard,
  Icon,
  Identity,
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

import { DetailInfoCard } from '@components/detail-info-card'
import { ErrorPage } from '@components/error-page'
import NavigationButton from '@components/navigation-link'
import RemixLink from '@components/remix-link'
import ShareCta from '@components/share-cta'
import ShareModal from '@components/share-modal'
import StakeModal from '@components/stake/stake-modal'
import { useGoBack } from '@lib/hooks/useGoBack'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaim } from '@lib/services/claims'
import { shareModalAtom, stakeModalAtom } from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
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
import { Outlet } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  NO_WALLET_ERROR,
  PATHS,
} from 'app/consts'
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
  const { wallet, claim, vaultDetails } = useLiveLoader<{
    wallet: string
    claim: ClaimPresenter
    vaultDetails: VaultDetailsType
  }>(['create', 'attest'])
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)

  const direction: 'for' | 'against' =
    (vaultDetails?.user_conviction_against ?? claim.user_conviction_against) ===
    '0'
      ? 'for'
      : 'against'

  const user_assets: string =
    (vaultDetails?.user_conviction ?? claim.user_conviction_for) > '0'
      ? vaultDetails?.user_assets ?? claim.user_assets_for
      : vaultDetails?.user_assets_against ?? claim.user_assets_against

  const assets_sum: string =
    (vaultDetails?.assets_sum ?? claim.for_assets_sum) > '0'
      ? vaultDetails?.assets_sum ?? claim.for_assets_sum
      : vaultDetails?.against_assets_sum ?? claim.against_assets_sum

  const userConviction =
    vaultDetails?.user_conviction ?? claim.user_conviction_for

  const directionTagVariant =
    +userConviction > 0 ? TagVariant.for : TagVariant.against

  const directionTagText = +userConviction > 0 ? 'FOR' : 'AGAINST'

  const handleGoBack = useGoBack({ fallbackRoute: PATHS.EXPLORE_CLAIMS })

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-6 inline-flex w-full">
      <NavigationButton
        variant="secondary"
        size="icon"
        to="#"
        onClick={handleGoBack}
      >
        <Icon name="arrow-left" />
      </NavigationButton>
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
      {vaultDetails !== null && user_assets !== '0' ? (
        <PositionCard
          onButtonClick={() =>
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'redeem',
              modalType: 'claim',
              claim,
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
        tvlFor={+formatBalance(vaultDetails.assets_sum ?? claim.for_assets_sum)}
        numPositionsAgainst={claim.against_num_positions}
        numPositionsFor={claim.for_num_positions}
        onAgainstBtnClick={() =>
          setStakeModalActive((prevState) => ({
            ...prevState,
            mode: 'deposit',
            modalType: 'claim',
            claim,
            direction: 'against',
            isOpen: true,
          }))
        }
        onForBtnClick={() =>
          setStakeModalActive((prevState) => ({
            ...prevState,
            mode: 'deposit',
            modalType: 'claim',
            claim,
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
      <DetailInfoCard
        variant={Identity.user}
        list={
          claim?.predicate?.id ===
          getSpecialPredicate(CURRENT_ENV).tagPredicate.id
            ? claim
            : undefined
        }
        username={claim.creator?.display_name ?? '?'}
        avatarImgSrc={claim.creator?.image ?? ''}
        id={claim.creator?.wallet ?? ''}
        description={claim.creator?.description ?? ''}
        link={
          claim.creator?.id ? `${PATHS.PROFILE}/${claim.creator?.wallet}` : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${claim.creator?.wallet}`}
        timestamp={claim.created_at}
        className="w-full"
      />
      <ShareCta
        onShareClick={() =>
          setShareModalActive({
            isOpen: true,
            currentPath: location.pathname,
          })
        }
      />
    </div>
  )

  const rightPanel = <Outlet />

  return (
    <>
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel} />
      <StakeModal
        userWallet={wallet}
        contract={claim.contract}
        open={stakeModalActive.isOpen}
        direction={stakeModalActive.direction}
        claim={claim}
        vaultDetailsProp={vaultDetails}
        onClose={() => {
          setStakeModalActive((prevState) => ({
            ...prevState,
            isOpen: false,
            mode: undefined,
          }))
        }}
      />
      <ShareModal
        currentPath={location.pathname}
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
  return <ErrorPage routeName="claim/$id" />
}
