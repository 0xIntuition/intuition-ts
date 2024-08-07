import { Text } from '@0xintuition/1ui'
import {
  ClaimSortColumn,
  ClaimsService,
  IdentityPresenter,
  SortDirection,
  UserTotalsPresenter,
} from '@0xintuition/api'

import { ListClaimsList } from '@components/list/list-claims'
import { OverviewAboutHeader } from '@components/profile/overview-about-header'
import { OverviewCreatedHeader } from '@components/profile/overview-created-header'
import { OverviewStakingHeader } from '@components/profile/overview-staking-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getUserSavedLists } from '@lib/services/lists'
import { getPositionsOnIdentity } from '@lib/services/positions'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useRouteLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import {
  NO_PARAM_ID_ERROR,
  NO_USER_IDENTITY_ERROR,
  NO_WALLET_ERROR,
  PATHS,
} from 'consts'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const wallet = params.wallet
  invariant(wallet, NO_PARAM_ID_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const listSearchParams = new URLSearchParams()
  listSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
  listSearchParams.set('direction', SortDirection.DESC)
  listSearchParams.set('limit', '6')

  return json({
    positions: await getPositionsOnIdentity({
      request,
      identityId: wallet,
      searchParams,
    }),
    claims: await getClaimsAboutIdentity({
      request,
      identityId: wallet,
      searchParams,
    }),
    claimsSummary: await fetchWrapper(request, {
      method: ClaimsService.claimSummary,
      args: {
        identity: wallet,
      },
    }),
    savedListClaims: await getUserSavedLists({
      request,
      userWallet: wallet,
      searchParams: listSearchParams,
    }),
  })
}

export default function ProfileOverview() {
  const { claims, claimsSummary, savedListClaims } = useLiveLoader<
    typeof loader
  >(['attest', 'create'])
  const { userIdentity, userTotals } =
    useRouteLoaderData<{
      userIdentity: IdentityPresenter
      userTotals: UserTotalsPresenter
    }>('routes/app+/profile+/$wallet') ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  logger('userIdentity', userIdentity)
  logger('userTotals', userTotals)

  return (
    <div className="flex flex-col gap-6">
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        User Stats
      </Text>
      <div className="flex flex-col items-center gap-6">
        <OverviewStakingHeader
          totalClaims={userTotals?.total_positions_on_claims ?? 0}
          totalIdentities={userTotals?.total_positions_on_identities ?? 0}
          totalStake={
            +formatBalance(userTotals?.total_position_value ?? '0', 18)
          }
          link={`${PATHS.PROFILE}/data-created`}
        />
        <OverviewAboutHeader
          variant="claims"
          userIdentity={userIdentity}
          totalClaims={claims.pagination?.totalEntries}
          totalStake={+formatBalance(claimsSummary?.assets_sum ?? 0, 18, 4)}
          link={`${PATHS.PROFILE}/data-about`}
        />
      </div>
      <div className="flex flex-row items-center gap-6 max-md:flex-col">
        <OverviewCreatedHeader
          variant="identities"
          totalCreated={userTotals?.total_identities ?? 0}
          link={`${PATHS.PROFILE}/data-created`}
        />
        <OverviewCreatedHeader
          variant="claims"
          totalCreated={userTotals?.total_claims ?? 0}
          link={`${PATHS.PROFILE}/data-created`}
        />
      </div>
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        Top Lists
      </Text>
      <ListClaimsList
        listClaims={savedListClaims.savedListClaims}
        enableSort={false}
        enableSearch={false}
        columns={3}
      />
    </div>
  )
}
