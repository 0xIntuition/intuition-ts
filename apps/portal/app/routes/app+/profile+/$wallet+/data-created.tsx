import {
  NO_USER_IDENTITY_ERROR,
  NO_USER_TOTALS_ERROR,
  NO_WALLET_ERROR,
} from 'constants'
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
import { fetchWrapper, formatBalance, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useRouteLoaderData } from '@remix-run/react'

import { ProfileLoaderData } from '../_index+/_layout'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const wallet = params.wallet
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    activeIdentities: getUserIdentities({ userWallet: wallet, searchParams }),
    activeClaims: getUserClaims({ userWallet: wallet, searchParams }),
    activeClaimsSummary: fetchWrapper({
      method: ClaimsService.claimSummary,
      args: {
        identity: wallet,
      },
    }),
    createdIdentities: getCreatedIdentities({
      userWallet: wallet,
      searchParams,
    }),
    createdIdentitiesSummary: fetchWrapper({
      method: IdentitiesService.identitySummary,
      args: {
        creator: wallet,
      },
    }),
    createdClaims: getCreatedClaims({ userWallet: wallet, searchParams }),
    createdClaimsSummary: fetchWrapper({
      method: ClaimsService.claimSummary,
      args: {
        creator: wallet,
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
          <Suspense fallback={<TabsSkeleton numOfTabs={2} />}>
            <Await
              resolve={Promise.all([
                activeIdentities,
                activeClaims,
                activeClaimsSummary,
              ])}
              errorElement={<></>}
            >
              {([resolvedIdentities, resolvedClaims]) => (
                <TabsList className="mb-4">
                  <TabsTrigger
                    value={DataCreatedHeaderVariants.activeIdentities}
                    label="Identities"
                    totalCount={resolvedIdentities.pagination.totalEntries}
                    disabled={activeIdentities === undefined}
                  />
                  <TabsTrigger
                    value={DataCreatedHeaderVariants.activeClaims}
                    label="Claims"
                    totalCount={resolvedClaims.pagination.totalEntries}
                    disabled={activeClaims === undefined}
                  />
                </TabsList>
              )}
            </Await>
          </Suspense>
          <Suspense
            fallback={
              <>
                <DataHeaderSkeleton />
                <PaginatedListSkeleton />
              </>
            }
          >
            <Await
              resolve={Promise.all([
                activeIdentities,
                activeClaims,
                activeClaimsSummary,
              ])}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {([
                resolvedIdentities,
                resolvedClaims,
                resolvedActiveClaimsSummary,
              ]) => (
                <>
                  <TabContent
                    value={DataCreatedHeaderVariants.activeIdentities}
                    userIdentity={userIdentity}
                    userTotals={userTotals}
                    totalResults={resolvedIdentities.pagination.totalEntries}
                    totalStake={
                      +formatBalance(
                        userTotals.total_position_value ?? '0',
                        18,
                        4,
                      )
                    }
                    variant={DataCreatedHeaderVariants.activeIdentities}
                  >
                    <ActivePositionsOnIdentities
                      identities={resolvedIdentities.data}
                      pagination={resolvedIdentities.pagination}
                    />
                  </TabContent>
                  <TabContent
                    value={DataCreatedHeaderVariants.activeClaims}
                    userIdentity={userIdentity}
                    userTotals={userTotals}
                    totalResults={resolvedClaims.pagination.totalEntries}
                    totalStake={
                      +formatBalance(
                        resolvedActiveClaimsSummary?.assets_sum ?? '0',
                        18,
                        4,
                      )
                    }
                    variant={DataCreatedHeaderVariants.activeClaims}
                  >
                    <ActivePositionsOnClaims
                      claims={resolvedClaims.data}
                      pagination={resolvedClaims.pagination}
                    />
                  </TabContent>
                </>
              )}
            </Await>
          </Suspense>
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
          <Suspense fallback={<TabsSkeleton numOfTabs={2} />}>
            <Await
              resolve={Promise.all([createdIdentities, createdClaims])}
              errorElement={<></>}
            >
              {([resolvedIdentities, resolvedClaims]) => (
                <TabsList className="mb-4">
                  <TabsTrigger
                    value={DataCreatedHeaderVariants.createdIdentities}
                    label="Identities"
                    totalCount={resolvedIdentities.pagination.totalEntries}
                    disabled={createdIdentities === undefined}
                  />
                  <TabsTrigger
                    value={DataCreatedHeaderVariants.createdClaims}
                    label="Claims"
                    totalCount={resolvedClaims.pagination.totalEntries}
                    disabled={createdClaims === undefined}
                  />
                </TabsList>
              )}
            </Await>
          </Suspense>
          <Suspense
            fallback={
              <>
                <DataHeaderSkeleton />
                <PaginatedListSkeleton />
              </>
            }
          >
            <Await
              resolve={Promise.all([
                createdIdentities,
                createdIdentitiesSummary,
                createdClaims,
                createdClaimsSummary,
              ])}
              errorElement={
                <ErrorStateCard>
                  <RevalidateButton />
                </ErrorStateCard>
              }
            >
              {([
                resolvedIdentities,
                resolvedIdentitiesSummary,
                resolvedClaims,
                resolvedClaimsSummary,
              ]) => (
                <>
                  <TabContent
                    value={DataCreatedHeaderVariants.createdIdentities}
                    userIdentity={userIdentity}
                    userTotals={userTotals}
                    totalResults={resolvedIdentities.pagination.totalEntries}
                    totalStake={
                      +formatBalance(
                        resolvedIdentitiesSummary?.assets ?? '0',
                        18,
                        4,
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
                  <TabContent
                    value={DataCreatedHeaderVariants.createdClaims}
                    userIdentity={userIdentity}
                    userTotals={userTotals}
                    totalResults={resolvedClaims.pagination.totalEntries}
                    totalStake={
                      +formatBalance(
                        resolvedClaimsSummary?.assets_sum ?? '0',
                        18,
                        4,
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
                </>
              )}
            </Await>
          </Suspense>
        </Tabs>
      </div>
    </>
  )
}
