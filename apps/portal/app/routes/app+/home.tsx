import { Suspense } from 'react'

import { EmptyStateCard, ErrorStateCard, Text } from '@0xintuition/1ui'
import {
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  SortDirection,
} from '@0xintuition/api'

import { HomeStatsHeader } from '@components/home/home-stats-header'
import { IdentitiesList } from '@components/list/identities'
import { RevalidateButton } from '@components/revalidate-button'
import { PaginatedListSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getConnectionsData } from '@lib/services/connections'
import { getUserSavedLists } from '@lib/services/lists'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import FullPageLayout from 'app/layouts/full-page-layout'
import { NO_WALLET_ERROR } from 'consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  // const url = new URL(request.url)
  // const searchParams = new URLSearchParams(url.search)

  const topIdentitiesSearchParams = new URLSearchParams()
  topIdentitiesSearchParams.set('sortBy', 'AssetsSum')
  topIdentitiesSearchParams.set('direction', SortDirection.DESC)
  topIdentitiesSearchParams.set('limit', '5')

  const listSearchParams = new URLSearchParams()
  listSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
  listSearchParams.set('direction', SortDirection.DESC)
  listSearchParams.set('limit', '6')

  const claimSearchParams = new URLSearchParams()
  claimSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
  claimSearchParams.set('direction', SortDirection.DESC)
  claimSearchParams.set('limit', '5')

  return defer({
    topUsers: fetchWrapper(request, {
      method: IdentitiesService.searchIdentity,
      args: {
        limit: 5,
        direction: SortDirection.DESC,
        sortBy: 'AssetsSum',
        isUser: true,
      },
    }),
    // positions: getPositionsOnIdentity({
    //   request,
    //   identityId: wallet,
    //   searchParams,
    // }),
    // claimsSummary: fetchWrapper(request, {
    //   method: ClaimsService.claimSummary,

    // }),
    // claims: getClaimsAboutIdentity({
    //   request,
    //   identityId: wallet,
    //   searchParams: claimSearchParams,
    // }),
    // savedListClaims: getUserSavedLists({
    //   request,
    //   userWallet: wallet,
    //   searchParams: listSearchParams,
    // }),
    // connectionsData: getConnectionsData({ request, userWallet: wallet }),
  })
}

export default function HomePage() {
  const { topUsers } = useLiveLoader<typeof loader>(['attest', 'create'])

  return (
    <FullPageLayout>
      <div className="w-full flex flex-col gap-6">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground self-start w-full"
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
          className="text-secondary-foreground self-start w-full"
        >
          Recent Lists
        </Text>
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground self-start w-full"
        >
          Top Claims
        </Text>
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground self-start w-full"
        >
          Top Users
        </Text>
        <Suspense
          fallback={
            <PaginatedListSkeleton enableSearch={false} enableSort={false} />
          }
        >
          <Await
            resolve={topUsers}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
          >
            {(resolvedTopUsers) => {
              if (!resolvedTopUsers || resolvedTopUsers.data.length === 0) {
                return <EmptyStateCard message="No  users found." />
              }
              return (
                <IdentitiesList
                  identities={resolvedTopUsers.data}
                  enableSearch={false}
                  enableSort={false}
                />
              )
            }}
          </Await>
        </Suspense>

        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground self-start w-full"
        >
          Global Feed
        </Text>
      </div>
    </FullPageLayout>
  )
}
