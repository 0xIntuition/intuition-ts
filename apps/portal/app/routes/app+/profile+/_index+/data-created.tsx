import { ReactNode, Suspense } from 'react'

import {
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import {
  ClaimsService,
  IdentitiesService,
  IdentityPresenter,
  UserTotalsPresenter,
} from '@0xintuition/api'

import { ActivePositionsOnClaims } from '@components/list/active-positions-on-claims'
import { ActivePositionsOnIdentities } from '@components/list/active-positions-on-identities'
import { ClaimsList } from '@components/list/claims'
import { IdentitiesList } from '@components/list/identities'
import {
  DataCreatedHeader,
  DataCreatedHeaderVariants,
  DataCreatedHeaderVariantType,
} from '@components/profile/data-created-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  getCreatedClaims,
  getCreatedIdentities,
  getUserClaims,
  getUserIdentities,
} from '@lib/services/users'
import {
  NO_USER_IDENTITY_ERROR,
  NO_USER_TOTALS_ERROR,
  NO_WALLET_ERROR,
} from '@lib/utils/errors'
import {
  DataErrorDisplay,
  fetchWrapper,
  formatBalance,
  invariant,
} from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useRouteLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

import { ProfileLoaderData } from './_layout'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    activeIdentities: getUserIdentities({ userWallet, searchParams }),
    activeClaims: getUserClaims({ userWallet, searchParams }),
    activeClaimsSummary: fetchWrapper({
      method: ClaimsService.claimSummary,
      args: {
        identity: userWallet,
      },
    }),
    createdIdentities: getCreatedIdentities({ userWallet, searchParams }),
    createdIdentitiesSummary: fetchWrapper({
      method: IdentitiesService.identitySummary,
      args: {
        creator: userWallet,
      },
    }),
    createdClaims: getCreatedClaims({ userWallet, searchParams }),
    createdClaimsSummary: fetchWrapper({
      method: ClaimsService.claimSummary,
      args: {
        creator: userWallet,
      },
    }),
  })
}

const TabContent = ({
  value,
  userIdentity,
  userTotals,
  totalResults,
  totalStake,
  variant,
  children,
}: {
  value: string
  userIdentity: IdentityPresenter
  userTotals: UserTotalsPresenter
  totalResults: number | ReactNode
  totalStake: number | ReactNode
  variant: DataCreatedHeaderVariantType
  children?: ReactNode
}) => {
  return (
    <TabsContent value={value} className="w-full">
      <DataCreatedHeader
        variant={variant}
        userIdentity={userIdentity}
        userTotals={userTotals}
        totalResults={totalResults}
        totalStake={totalStake}
        className="mb-6"
      />
      {children}
    </TabsContent>
  )
}

export default function ProfileDataCreated() {
  const {
    activeIdentities,
    createdIdentities,
    createdIdentitiesSummary,
    activeClaims,
    activeClaimsSummary,
    createdClaims,
    createdClaimsSummary,
  } = useLiveLoader<typeof loader>(['attest'])

  const { userIdentity, userTotals } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)
  invariant(userTotals, NO_USER_TOTALS_ERROR)

  return (
    <>
      <div className="flex-col justify-start items-start flex w-full">
        <div className="self-stretch justify-between items-center inline-flex mb-6">
          <Text
            variant="headline"
            weight="medium"
            className="theme-secondary-foreground w-full"
          >
            Active Positions
          </Text>
        </div>
        <Tabs
          defaultValue={DataCreatedHeaderVariants.activeIdentities}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger
              value={DataCreatedHeaderVariants.activeIdentities}
              label="Identities"
              totalCount={
                <Suspense
                  fallback={<Skeleton className="h-6 w-6 inline-flex" />}
                >
                  <Await resolve={activeIdentities}>
                    {(resolvedIdentities) =>
                      resolvedIdentities.pagination.totalEntries
                    }
                  </Await>
                </Suspense>
              }
              disabled={activeIdentities === undefined}
            />
            <TabsTrigger
              value={DataCreatedHeaderVariants.activeClaims}
              label="Claims"
              totalCount={
                <Suspense
                  fallback={<Skeleton className="h-6 w-6 inline-flex" />}
                >
                  <Await resolve={activeClaims}>
                    {(resolvedClaims) => resolvedClaims.pagination.totalEntries}
                  </Await>
                </Suspense>
              }
              disabled={activeClaims === undefined}
            />
          </TabsList>
          <TabContent
            value={DataCreatedHeaderVariants.activeIdentities}
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalResults={
              <Suspense fallback={<Skeleton className="h-6 w-6 inline-flex" />}>
                <Await resolve={activeIdentities}>
                  {(resolvedIdentities) =>
                    resolvedIdentities.pagination.totalEntries
                  }
                </Await>
              </Suspense>
            }
            totalStake={
              <Suspense
                fallback={<Skeleton className="h-6 w-14 inline-flex" />}
              >
                <Await resolve={userTotals}>
                  {(resolvedTotals) =>
                    +formatBalance(
                      resolvedTotals?.total_position_value ?? '0',
                      18,
                      4,
                    )
                  }
                </Await>
              </Suspense>
            }
            variant={DataCreatedHeaderVariants.activeIdentities}
          >
            <Suspense fallback={<Skeleton className="w-full h-28 mt-6" />}>
              <Await
                resolve={activeIdentities}
                errorElement={
                  <DataErrorDisplay dataType={'active identities'} />
                }
              >
                {(resolvedIdentities) => (
                  <ActivePositionsOnIdentities
                    identities={resolvedIdentities.data}
                    pagination={resolvedIdentities.pagination}
                  />
                )}
              </Await>
            </Suspense>
          </TabContent>
          <TabContent
            value={DataCreatedHeaderVariants.activeClaims}
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalResults={
              <Suspense fallback={<Skeleton className="h-6 w-6 inline-flex" />}>
                <Await resolve={activeClaims}>
                  {(resolvedClaims) => resolvedClaims.pagination.totalEntries}
                </Await>
              </Suspense>
            }
            totalStake={
              <Suspense
                fallback={<Skeleton className="h-6 w-14 inline-flex" />}
              >
                <Await resolve={activeClaimsSummary}>
                  {(cs) => +formatBalance(cs?.assets_sum ?? '0', 18, 4)}
                </Await>
              </Suspense>
            }
            variant={DataCreatedHeaderVariants.activeClaims}
          >
            <Suspense fallback={<Skeleton className="w-full h-28 mt-6" />}>
              <Await
                resolve={activeClaims}
                errorElement={<DataErrorDisplay dataType={'active claims'} />}
              >
                {(resolvedClaims) => (
                  <ActivePositionsOnClaims
                    claims={resolvedClaims.data}
                    pagination={resolvedClaims.pagination}
                  />
                )}
              </Await>
            </Suspense>
          </TabContent>
        </Tabs>
      </div>
      <div className="flex-col justify-start items-start flex w-full">
        <div className="self-stretch justify-between items-center inline-flex mb-6">
          <Text
            variant="headline"
            weight="medium"
            className="theme-secondary-foreground w-full"
          >
            Created
          </Text>
        </div>
        <Tabs
          defaultValue={DataCreatedHeaderVariants.createdIdentities}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger
              value={DataCreatedHeaderVariants.createdIdentities}
              label="Identities"
              totalCount={
                <Suspense
                  fallback={<Skeleton className="h-6 w-6 inline-flex" />}
                >
                  <Await resolve={createdIdentities}>
                    {(resolvedIdentities) =>
                      resolvedIdentities.pagination.totalEntries
                    }
                  </Await>
                </Suspense>
              }
              disabled={createdIdentities === undefined}
            />
            <TabsTrigger
              value={DataCreatedHeaderVariants.createdClaims}
              label="Claims"
              totalCount={
                <Suspense
                  fallback={<Skeleton className="h-6 w-6 inline-flex" />}
                >
                  <Await resolve={createdClaims}>
                    {(resolvedClaims) => resolvedClaims.pagination.totalEntries}
                  </Await>
                </Suspense>
              }
              disabled={createdClaims === undefined}
            />
          </TabsList>
          <TabContent
            value={DataCreatedHeaderVariants.createdIdentities}
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalResults={
              <Suspense fallback={<Skeleton className="h-6 w-6 inline-flex" />}>
                <Await resolve={createdIdentities}>
                  {(resolvedIdentities) =>
                    resolvedIdentities.pagination.totalEntries
                  }
                </Await>
              </Suspense>
            }
            totalStake={
              <Suspense
                fallback={<Skeleton className="h-6 w-14 inline-flex" />}
              >
                <Await resolve={createdIdentitiesSummary}>
                  {(summary) => +formatBalance(summary?.assets ?? '0', 18, 4)}
                </Await>
              </Suspense>
            }
            variant={DataCreatedHeaderVariants.createdIdentities}
          >
            <Suspense fallback={<Skeleton className="w-full h-28 mt-6" />}>
              <Await
                resolve={createdIdentities}
                errorElement={
                  <DataErrorDisplay dataType={'created identities'} />
                }
              >
                {(resolvedIdentities) => (
                  <IdentitiesList
                    identities={resolvedIdentities.data}
                    pagination={resolvedIdentities.pagination}
                    paramPrefix="createdIdentities"
                    enableSearch
                  />
                )}
              </Await>
            </Suspense>
          </TabContent>
          <TabContent
            value={DataCreatedHeaderVariants.createdClaims}
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalResults={
              <Suspense fallback={<Skeleton className="h-6 w-6 inline-flex" />}>
                <Await resolve={createdClaims}>
                  {(resolvedClaims) => resolvedClaims.pagination.totalEntries}
                </Await>
              </Suspense>
            }
            totalStake={
              <Suspense
                fallback={<Skeleton className="h-6 w-14 inline-flex" />}
              >
                <Await resolve={createdClaimsSummary}>
                  {(summary) =>
                    +formatBalance(summary?.assets_sum ?? '0', 18, 4)
                  }
                </Await>
              </Suspense>
            }
            variant={DataCreatedHeaderVariants.createdClaims}
          >
            <Suspense fallback={<Skeleton className="w-full h-28 mt-6" />}>
              <Await
                resolve={createdClaims}
                errorElement={<DataErrorDisplay dataType={'created claims'} />}
              >
                {(resolvedClaims) => (
                  <ClaimsList
                    claims={resolvedClaims.data}
                    pagination={resolvedClaims.pagination}
                    paramPrefix="createdClaims"
                    enableSearch
                  />
                )}
              </Await>
            </Suspense>
          </TabContent>
        </Tabs>
      </div>
    </>
  )
}
