import { ReactNode, Suspense } from 'react'

import {
  ErrorStateCard,
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
import { RevalidateButton } from '@components/revalidate-button'
import {
  DataHeaderSkeleton,
  PaginatedListSkeleton,
  TabsSkeleton,
} from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  getCreatedClaims,
  getCreatedIdentities,
  getUserClaims,
  getUserIdentities,
} from '@lib/services/users'
import { formatBalance, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useRouteLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import {
  NO_USER_IDENTITY_ERROR,
  NO_USER_TOTALS_ERROR,
  NO_WALLET_ERROR,
} from 'app/consts'

import { ProfileLoaderData } from './_layout'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    activeIdentities: getUserIdentities({
      request,
      userWallet: userWallet.toLowerCase(),
      searchParams,
    }),
    activeClaims: getUserClaims({
      request,
      userWallet: userWallet.toLowerCase(),
      searchParams,
    }),
    createdIdentities: getCreatedIdentities({
      request,
      userWallet: userWallet.toLowerCase(),
      searchParams,
    }),
    createdIdentitiesSummary: fetchWrapper(request, {
      method: IdentitiesService.identitySummary,
      args: {
        creator: userWallet.toLowerCase(),
      },
    }),
    createdClaims: getCreatedClaims({ request, userWallet, searchParams }),
    createdClaimsSummary: fetchWrapper(request, {
      method: ClaimsService.claimSummary,
      args: {
        creator: userWallet.toLowerCase(),
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
  totalResults: number
  totalStake: number
  variant: DataCreatedHeaderVariantType
  children?: ReactNode
}) => {
  return (
    <TabsContent value={value} className="flex flex-col w-full gap-6">
      <DataCreatedHeader
        variant={variant}
        userIdentity={userIdentity}
        userTotals={userTotals}
        totalResults={totalResults}
        totalStake={totalStake}
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
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex flex-col w-full gap-6">
        <div className="self-stretch justify-between items-center inline-flex">
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
          <Suspense
            fallback={
              <div className="mb-6">
                <TabsSkeleton numOfTabs={2} />
              </div>
            }
          >
            <TabsList className="mb-6">
              <Await resolve={activeIdentities} errorElement={<></>}>
                {(resolvedIdentities) => (
                  <TabsTrigger
                    value={DataCreatedHeaderVariants.activeIdentities}
                    label="Identities"
                    totalCount={resolvedIdentities.pagination.totalEntries}
                    disabled={activeIdentities === undefined}
                  />
                )}
              </Await>
              <Await resolve={activeClaims} errorElement={<></>}>
                {(resolvedClaims) => (
                  <TabsTrigger
                    value={DataCreatedHeaderVariants.activeClaims}
                    label="Claims"
                    totalCount={resolvedClaims.pagination.totalEntries}
                    disabled={activeClaims === undefined}
                  />
                )}
              </Await>
            </TabsList>
          </Suspense>
          <Suspense
            fallback={
              <div className="flex flex-col w-full gap-6">
                <DataHeaderSkeleton />
                <PaginatedListSkeleton />
              </div>
            }
          >
            <Await
              resolve={activeIdentities}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {(resolvedIdentities) => (
                <TabContent
                  value={DataCreatedHeaderVariants.activeIdentities}
                  userIdentity={userIdentity}
                  userTotals={userTotals}
                  totalResults={resolvedIdentities.pagination.totalEntries}
                  totalStake={
                    +formatBalance(
                      userTotals.total_position_value_on_identities ?? '0',
                      18,
                    )
                  }
                  variant={DataCreatedHeaderVariants.activeIdentities}
                >
                  <ActivePositionsOnIdentities
                    identities={resolvedIdentities.data}
                    pagination={resolvedIdentities.pagination}
                  />
                </TabContent>
              )}
            </Await>
            <Await
              resolve={activeClaims}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {(resolvedClaims) => (
                <Await
                  resolve={activeClaims}
                  errorElement={
                    <ErrorStateCard>
                      <RevalidateButton />
                    </ErrorStateCard>
                  }
                >
                  <TabContent
                    value={DataCreatedHeaderVariants.activeClaims}
                    userIdentity={userIdentity}
                    userTotals={userTotals}
                    totalResults={resolvedClaims.pagination.totalEntries}
                    totalStake={
                      +formatBalance(
                        userTotals.total_position_value_on_claims ?? '0',
                        18,
                      )
                    }
                    variant={DataCreatedHeaderVariants.activeClaims}
                  >
                    <ActivePositionsOnClaims
                      claims={resolvedClaims.data}
                      pagination={resolvedClaims.pagination}
                    />
                  </TabContent>
                </Await>
              )}
            </Await>
          </Suspense>
        </Tabs>
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="self-stretch justify-between items-center inline-flex">
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
          <Suspense
            fallback={
              <div className="mb-6">
                <TabsSkeleton numOfTabs={2} />
              </div>
            }
          >
            <TabsList className="mb-6">
              <Await resolve={createdIdentities} errorElement={<></>}>
                {(resolvedIdentities) => (
                  <TabsTrigger
                    value={DataCreatedHeaderVariants.createdIdentities}
                    label="Identities"
                    totalCount={resolvedIdentities.pagination.totalEntries}
                    disabled={createdIdentities === undefined}
                  />
                )}
              </Await>
              <Await resolve={createdClaims} errorElement={<></>}>
                {(resolvedClaims) => (
                  <TabsTrigger
                    value={DataCreatedHeaderVariants.createdClaims}
                    label="Claims"
                    totalCount={resolvedClaims.pagination.totalEntries}
                    disabled={createdClaims === undefined}
                  />
                )}
              </Await>
            </TabsList>
          </Suspense>
          <Suspense
            fallback={
              <div className="flex flex-col w-full gap-6">
                <DataHeaderSkeleton />
                <PaginatedListSkeleton />
              </div>
            }
          >
            <Await
              resolve={createdIdentities}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {(resolvedIdentities) => (
                <Await
                  resolve={createdIdentitiesSummary}
                  errorElement={
                    <ErrorStateCard>
                      <RevalidateButton />
                    </ErrorStateCard>
                  }
                >
                  {(resolvedIdentitiesSummary) => (
                    <TabContent
                      value={DataCreatedHeaderVariants.createdIdentities}
                      userIdentity={userIdentity}
                      userTotals={userTotals}
                      totalResults={resolvedIdentities.pagination.totalEntries}
                      totalStake={
                        +formatBalance(
                          resolvedIdentitiesSummary?.assets ?? '0',
                          18,
                        )
                      }
                      variant={DataCreatedHeaderVariants.createdIdentities}
                    >
                      <IdentitiesList
                        identities={resolvedIdentities.data}
                        pagination={resolvedIdentities.pagination}
                        paramPrefix="createdIdentities"
                        enableSearch
                        enableSort
                      />
                    </TabContent>
                  )}
                </Await>
              )}
            </Await>
            <Await
              resolve={createdClaims}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {(resolvedClaims) => (
                <Await
                  resolve={createdClaimsSummary}
                  errorElement={
                    <ErrorStateCard>
                      <RevalidateButton />
                    </ErrorStateCard>
                  }
                >
                  {(resolvedClaimsSummary) => (
                    <TabContent
                      value={DataCreatedHeaderVariants.createdClaims}
                      userIdentity={userIdentity}
                      userTotals={userTotals}
                      totalResults={resolvedClaims.pagination.totalEntries}
                      totalStake={
                        +formatBalance(
                          resolvedClaimsSummary?.assets_sum ?? '0',
                          18,
                        )
                      }
                      variant={DataCreatedHeaderVariants.createdClaims}
                    >
                      <ClaimsList
                        claims={resolvedClaims.data}
                        pagination={resolvedClaims.pagination}
                        paramPrefix="createdClaims"
                        enableSearch
                        enableSort
                      />
                    </TabContent>
                  )}
                </Await>
              )}
            </Await>
          </Suspense>
        </Tabs>
      </div>
    </div>
  )
}
