import { Text } from '@0xintuition/1ui'
import { ClaimSortColumn, ClaimsService, SortDirection } from '@0xintuition/api'

import { HomeStatsHeader } from '@components/home/home-stats-header'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getConnectionsData } from '@lib/services/connections'
import { getUserSavedLists } from '@lib/services/lists'
import { getPositionsOnIdentity, getPositionsOnIdentity } from '@lib/services/positions'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import FullPageLayout from 'app/layouts/full-page-layout'
import {  NO_WALLET_ERROR } from 'consts'

// export async function loader({ request }: LoaderFunctionArgs) {
//   const userWallet = await requireUserWallet(request)
//   invariant(userWallet, NO_WALLET_ERROR)


//   const url = new URL(request.url)
//   const searchParams = new URLSearchParams(url.search)

//   const listSearchParams = new URLSearchParams()
//   listSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
//   listSearchParams.set('direction', SortDirection.DESC)
//   listSearchParams.set('limit', '6')

//   const claimSearchParams = new URLSearchParams()
//   claimSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
//   claimSearchParams.set('direction', SortDirection.DESC)
//   claimSearchParams.set('limit', '5')

//   return defer({
//     positions: getPositionsOnIdentity({
//       request,
//       identityId: wallet,
//       searchParams,
//     }),
//     claimsSummary: fetchWrapper(request, {
//       method: ClaimsService.claimSummary,

//     }),
//     claims: getClaimsAboutIdentity({
//       request,
//       identityId: wallet,
//       searchParams: claimSearchParams,
//     }),
//     savedListClaims: getUserSavedLists({
//       request,
//       userWallet: wallet,
//       searchParams: listSearchParams,
//     }),
//     connectionsData: getConnectionsData({ request, userWallet: wallet }),
//   })
// }

export default function HomePage() {
  return (
    <FullPageLayout>
      <div className="flex flex-col gap-14 max-lg:gap-12">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          Intuition System Stats
        </Text>
        {/* <HomeStatsHeader
        totalIdentities={totalIdentities}
        totalClaims={totalClaims}
        totalUsers={totalUsers}
        totalVolume={totalVolume}
        totalStaked={totalStaked}
        totalSignals={totalSignals}
        /> */}
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          Recent Lists
        </Text>
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          Top Claims
        </Text>
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          Top Users
        </Text>
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          Global Feed
        </Text>
      </div>
    </FullPageLayout>
  )
}
