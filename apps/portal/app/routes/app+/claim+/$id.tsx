import {
  Claim,
  ClaimStakeCard,
  Icon,
  Identity,
  InfoCard,
  PositionCard,
  PositionCardFeesAccrued,
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
  ClaimsService,
  SortDirection,
} from '@0xintuition/api'

import NavigationButton from '@components/navigation-link'
import StakeModal from '@components/stake/stake-modal'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  fetchWrapper,
  formatBalance,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { NO_WALLET_ERROR } from 'consts'
import { useAtom } from 'jotai'
import { VaultDetailsType } from 'types/vault'

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

  const claim = await fetchWrapper({
    method: ClaimsService.getClaimById,
    args: { id },
  })

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
      logger('Failed to fetch vaultDetails', error)
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
export default function ClaimDetails() {
  const { wallet, claim, vaultDetails } = useLoaderData<{
    wallet: string
    claim: ClaimPresenter
    vaultDetails: VaultDetailsType
  }>()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)

  let direction: 'for' | 'against' = 'for'
  direction =
    (vaultDetails.user_conviction ?? claim.user_conviction_for) > '0' ||
    (vaultDetails.user_conviction_against ?? claim.user_conviction_against) ===
      '0'
      ? 'for'
      : 'against'

  let user_assets: string = '0'
  user_assets =
    (vaultDetails.user_conviction ?? claim.user_conviction_for) > '0'
      ? vaultDetails.user_assets ?? claim.user_assets_for
      : vaultDetails.user_assets_against ?? claim.user_assets_against

  let assets_sum: string = '0'
  assets_sum =
    (vaultDetails.assets_sum ?? claim.for_assets_sum) > '0'
      ? vaultDetails.assets_sum ?? claim.for_assets_sum
      : vaultDetails.against_assets_sum ?? claim.against_assets_sum

  const userConviction =
    vaultDetails.user_conviction ?? claim.user_conviction_for
  const directionTagVariant =
    +userConviction > 0 ? TagVariant.for : TagVariant.against
  const directionTagText = +userConviction > 0 ? 'FOR' : 'AGAINST'

  const ClaimWithNav = () => (
    <div className="flex mb-4 px-7">
      <NavigationButton variant="secondary" size="icon" to={from ?? -1}>
        <Icon name="arrow-left" />
      </NavigationButton>
      <Claim
        size="md"
        subject={{
          variant: claim.subject?.is_user ? Identity.user : Identity.nonUser,
          label: claim.subject?.is_user
            ? claim.subject?.user?.display_name ?? claim.subject?.display_name
            : claim.subject?.display_name ?? '',
          imgSrc: claim.subject?.is_user
            ? claim.subject?.user?.image ?? claim.subject?.image
            : claim.subject?.image ?? null,
        }}
        predicate={{
          variant: claim.predicate?.is_user ? Identity.user : Identity.nonUser,
          label: claim.predicate?.is_user
            ? claim.predicate?.user?.display_name ??
              claim.predicate?.display_name
            : claim.predicate?.display_name ?? '',
          imgSrc: claim.predicate?.is_user
            ? claim.predicate?.user?.image ?? claim.predicate?.image
            : claim.predicate?.image ?? null,
        }}
        object={{
          variant: claim.object?.is_user ? Identity.user : Identity.nonUser,
          label: claim.object?.is_user
            ? claim.object?.user?.display_name ?? claim.object?.display_name
            : claim.object?.display_name ?? '',
          imgSrc: claim.object?.is_user
            ? claim.object?.user?.image ?? claim.object?.image
            : claim.object?.image ?? null,
        }}
      />
    </div>
  )

  const leftPanel = (
    <div className="w-full flex-col justify-start items-start gap-5 inline-flex">
      {vaultDetails !== null && user_assets !== '0' ? (
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
              amount={user_assets ? +formatBalance(user_assets, 18, 4) : 0}
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
          />
          <PositionCardFeesAccrued amount={0} />
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
      <InfoCard
        variant={Identity.user}
        username={claim.creator?.display_name ?? ''}
        avatarImgSrc={claim.creator?.image ?? ''}
        timestamp={claim.created_at}
        onClick={() => {
          navigate(`/app/profile/${claim.creator?.wallet}`)
        }}
        className="hover:cursor-pointer w-full"
      />
    </div>
  )

  const rightPanel = <Outlet />

  return (
    <div className="w-full flex flex-col">
      <ClaimWithNav />
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
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
      </TwoPanelLayout>
    </div>
  )
}
