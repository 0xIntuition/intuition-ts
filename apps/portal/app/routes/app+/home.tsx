import { Suspense } from 'react'

import { EmptyStateCard, ErrorStateCard, Text } from '@0xintuition/1ui'
import {
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  SortDirection,
} from '@0xintuition/api'

import { HomeSectionHeader } from '@components/home/home-section-header'
// import { HomeStatsHeader } from '@components/home/home-stats-header'
import { ClaimsList } from '@components/list/claims'
import { IdentitiesList } from '@components/list/identities'
import { ListClaimsList } from '@components/list/list-claims'
import { ListClaimsSkeletonLayout } from '@components/list/list-skeletons'
import { RevalidateButton } from '@components/revalidate-button'
import { PaginatedListSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import FullPageLayout from 'app/layouts/full-page-layout'
import { NO_WALLET_ERROR, TAG_PREDICATE_VAULT_ID_TESTNET } from 'consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const listSearchParams = new URLSearchParams()
  listSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
  listSearchParams.set('direction', SortDirection.DESC)
  listSearchParams.set('limit', '6')

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
    topClaims: fetchWrapper(request, {
      method: ClaimsService.getClaims,
      args: {
        limit: 5,
        direction: SortDirection.DESC,
        sortBy: 'AssetsSum',
      },
    }),
    recentLists: fetchWrapper(request, {
      method: ClaimsService.searchClaims,
      args: {
        limit: 5,
        sortBy: ClaimSortColumn.CREATED_AT,
        direction: SortDirection.DESC,
        predicate: TAG_PREDICATE_VAULT_ID_TESTNET,
      },
    }),
  })
}

export default function HomePage() {
  const { topUsers, topClaims, recentLists } = useLiveLoader<typeof loader>([
    'attest',
    'create',
  ])

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
        <HomeSectionHeader
          title="Recent Lists"
          buttonText="Explore Lists"
          buttonLink="/app/explore/lists"
        />
        <Suspense
          fallback={
            <ListClaimsSkeletonLayout
              totalItems={6}
              enableSearch={false}
              enableSort={false}
            />
          }
        >
          <Await
            resolve={recentLists}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
          >
            {(resolvedRecentLists) => {
              if (
                !resolvedRecentLists ||
                resolvedRecentLists.data.length === 0
              ) {
                return <EmptyStateCard message="No lists found." />
              }
              return (
                <ListClaimsList
                  listClaims={resolvedRecentLists.data}
                  enableSort={false}
                  enableSearch={false}
                  columns={3}
                />
              )
            }}
          </Await>
        </Suspense>
        <HomeSectionHeader
          title="Top Claims"
          buttonText="Explore Claims"
          buttonLink="/app/explore/claims"
        />
        <Suspense
          fallback={
            <PaginatedListSkeleton enableSearch={false} enableSort={false} />
          }
        >
          <Await
            resolve={topClaims}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
          >
            {(resolvedClaims) => {
              if (!resolvedClaims || resolvedClaims.data.length === 0) {
                return <EmptyStateCard message="No claims found." />
              }
              return (
                <ClaimsList
                  claims={resolvedClaims.data}
                  paramPrefix="claims"
                  enableSearch={false}
                  enableSort={false}
                />
              )
            }}
          </Await>
        </Suspense>
        <HomeSectionHeader
          title="Top Users"
          buttonText="Explore Users"
          buttonLink="/app/explore/users"
        />
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
                return <EmptyStateCard message="No users found." />
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
        <HomeSectionHeader
          title="Global Feed"
          buttonText="Open Feed"
          buttonLink="/app/activity/global"
        />
      </div>
    </FullPageLayout>
  )
}
