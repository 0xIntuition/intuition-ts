import { ActivePositionsOnIdentities } from '@components/list/active-positions-on-identities'
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
    'identities' in data &&
    'identitiesPagination' in data
  )
}

export default function ProfileDataCreated() {
  const data = useRouteLoaderData<DataCreatedLoaderData>(
    'routes/app+/profile+/_index+/data-created+/_layout',
  )

  if (!isDataCreatedLoaderData(data)) {
    throw new Error('Invalid data')
  }

  const { userIdentity, userTotals, identities, identitiesPagination } = data

  return (
    <TabContent
      value={DataCreatedHeaderVariants.identities}
      userIdentity={userIdentity}
      userTotals={userTotals}
      totalResults={identitiesPagination.totalEntries}
      totalStake={
        +formatBalance(userTotals?.total_position_value ?? '0', 18, 4)
      }
      variant={DataCreatedHeaderVariants.identities}
    >
      <ActivePositionsOnIdentities
        identities={identities}
        pagination={identitiesPagination}
      />
    </TabContent>
  )
}
