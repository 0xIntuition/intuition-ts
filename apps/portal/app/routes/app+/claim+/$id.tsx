import {
  Button,
  Claim,
  ClaimStakeCard,
  Icon,
  InfoCard,
  PositionCard,
  PositionCardFeesAccrued,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  OpenAPI,
  PositionPresenter,
  PositionSortColumn,
  SortDirection,
} from '@0xintuition/api'

import { NestedLayout } from '@components/nested-layout'
import StakeModal from '@components/stake/stake-modal'
import { stakeModalAtom } from '@lib/state/store'
import { fetchClaim, fetchPositionsOnClaim } from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  calculateTotalPages,
  formatBalance,
  getAuthHeaders,
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
import { getPrivyAccessToken } from '@server/privy'
import { useAtom } from 'jotai'
import { VaultDetailsType } from 'types/vault'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)

  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>
  const id = params.id

  if (!id) {
    throw new Error('vault_id is undefined.')
  }

  if (!wallet) {
    return console.log('No user found in session')
  }

  const claim = await fetchClaim(id)

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

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const search = searchParams.get('search')
  const sortBy: PositionSortColumn =
    (searchParams.get('sortBy') as PositionSortColumn) ?? 'createdAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const positionDirection: string =
    searchParams.get('positionDirection') ?? 'all'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const positions = await fetchPositionsOnClaim(
    positionDirection === 'for'
      ? claim?.vault_id ?? id
      : positionDirection === 'against'
        ? claim?.counter_vault_id ?? id
        : id,
    page,
    Number(limit),
    sortBy as PositionSortColumn,
    direction as SortDirection,
    search,
  )

  const totalPages = calculateTotalPages(positions?.total ?? 0, Number(limit))

  return json({
    wallet,
    claim,
    positions: positions?.data as PositionPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: positions?.total ?? 0,
      totalPages,
    },
    vaultDetails,
  })
}

export type ClaimLoaderData = {
  wallet: string
  claim: ClaimPresenter
  positions: PositionPresenter[]
  sortBy: PositionSortColumn
  direction: SortDirection
  pagination: {
    currentPage: number
    limit: number
    totalEntries: number
    totalPages: number
  }
  vaultDetails: VaultDetailsType
}

export default function ClaimDetails() {
  const { wallet, claim, vaultDetails } = useLoaderData<ClaimLoaderData>()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from
  const goBack = () => {
    if (from) {
      navigate(from)
    } else {
      navigate(-1)
    }
  }

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

  return (
    <>
      <div className="flex items-center gap-6 mx-8 mt-10">
        <Button variant="secondary" size="icon" onClick={() => goBack}>
          <Icon name="arrow-left" />
        </Button>
        <Claim
          size="md"
          subject={{
            variant: claim.subject?.is_user ? 'user' : 'non-user',
            label: claim.subject?.is_user
              ? claim.subject?.user?.display_name ?? claim.subject?.display_name
              : claim.subject?.display_name ?? '',
            imgSrc: claim.subject?.is_user
              ? claim.subject?.user?.image ?? claim.subject?.image
              : claim.subject?.image ?? null,
          }}
          predicate={{
            variant: claim.predicate?.is_user ? 'user' : 'non-user',
            label: claim.predicate?.is_user
              ? claim.predicate?.user?.display_name ??
                claim.predicate?.display_name
              : claim.predicate?.display_name ?? '',
            imgSrc: claim.predicate?.is_user
              ? claim.predicate?.user?.image ?? claim.predicate?.image
              : claim.predicate?.image ?? null,
          }}
          object={{
            variant: claim.object?.is_user ? 'user' : 'non-user',
            label: claim.object?.is_user
              ? claim.object?.user?.display_name ?? claim.object?.display_name
              : claim.object?.display_name ?? '',
            imgSrc: claim.object?.is_user
              ? claim.object?.user?.image ?? claim.object?.image
              : claim.object?.image ?? null,
          }}
        />
      </div>
      <NestedLayout outlet={Outlet}>
        <div className="flex flex-col">
          <div className="w-[300px] h-[230px] flex-col justify-start items-start gap-5 inline-flex">
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
                <PositionCardStaked
                  amount={user_assets ? +formatBalance(user_assets, 18, 4) : 0}
                />
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
              tvlFor={
                +formatBalance(vaultDetails.assets_sum ?? claim.for_assets_sum)
              }
              amountAgainst={+formatBalance(claim.against_num_positions)}
              amountFor={+formatBalance(claim.for_num_positions)}
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
                (vaultDetails.user_conviction ?? claim.user_conviction_for) >
                '0'
              }
            />
            <InfoCard
              variant="user"
              username={claim.creator?.display_name ?? ''}
              avatarImgSrc={claim.creator?.image ?? ''}
              timestamp={claim.created_at}
              onClick={() => {
                navigate(`/app/profile/${claim.creator?.wallet}`)
              }}
              className="hover:cursor-pointer w-full"
            />
          </div>
        </div>
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
      </NestedLayout>
    </>
  )
}
