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
  GetClaimByIdResponse,
  IdentityPresenter,
  SortDirection,
} from '@0xintuition/api'

import NavigationButton from '@components/navigation-link'
import StakeModal from '@components/stake/stake-modal'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
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
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import FullPageLayout from 'app/layouts/full-page-layout'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { NO_WALLET_ERROR, PATHS } from 'consts'
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

  const claim = await fetchWrapper<GetClaimByIdResponse, { id: string }>(
    request,
    {
      method: ClaimsService.getClaimById,
      args: { id },
    },
  )

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
    <div className="flex items-center w-full mb-6 gap-6">
      <NavigationButton variant="secondary" size="icon" to={from ?? -1}>
        <Icon name="arrow-left" />
      </NavigationButton>
      <Claim
        size="md"
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
          variant: claim.predicate?.is_user ? Identity.user : Identity.nonUser,
          label: getAtomLabel(claim.predicate as IdentityPresenter),
          imgSrc: getAtomImage(claim.predicate as IdentityPresenter),
          id: claim.predicate?.identity_id,
          description: getAtomDescription(claim.predicate as IdentityPresenter),
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
    <FullPageLayout>
      <ClaimWithNav />
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel} />
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
    </FullPageLayout>
  )
}
