import { ActivePositionsOnClaims } from '@components/list/active-positions-on-claims'
import { DataCreatedHeaderVariants } from '@components/profile/data-created-header'
import { formatBalance } from '@lib/utils/misc'
import { useRouteLoaderData } from '@remix-run/react'

import { DataCreatedLoaderData, TabContent } from './_layout'

function isDataCreatedLoaderData(data: unknown): data is DataCreatedLoaderData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'userIdentity' in data &&
    'userTotals' in data &&
    'claims' in data &&
    'claimsSummary' in data &&
    'claimsPagination' in data
  )
}

export default function ProfileDataCreated() {
  const data = useRouteLoaderData<DataCreatedLoaderData>(
    'routes/app+/profile+/_index+/data-created+/_layout',
  )

  if (!isDataCreatedLoaderData(data)) {
    throw new Error('Invalid data')
  }

  const { userIdentity, userTotals, claims, claimsSummary, claimsPagination } =
    data

  return (
    <TabContent
      value={DataCreatedHeaderVariants.claims}
      userIdentity={userIdentity}
      userTotals={userTotals}
      totalResults={claimsPagination?.totalEntries}
      totalStake={+formatBalance(claimsSummary?.assets_sum ?? '0', 18, 4)}
      variant={DataCreatedHeaderVariants.claims}
    >
      <ActivePositionsOnClaims claims={claims} pagination={claimsPagination} />
    </TabContent>
  )
}
