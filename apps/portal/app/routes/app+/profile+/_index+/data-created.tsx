import { ReactNode } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  IdentityPresenter,
  SortColumn,
  UsersService,
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
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { getStandardPageParams } from '@lib/utils/loader'
import logger from '@lib/utils/logger'
import {
  calculateTotalPages,
  fetchWrapper,
  formatBalance,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const userIdentity = await fetchWrapper({
    method: IdentitiesService.getIdentityById,
    args: {
      id: userWallet,
    },
  })
  if (!userIdentity) {
    return logger('No user identity found')
  }
  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    logger('Invalid or missing creator ID')
    return
  }

  const userTotals = await fetchWrapper({
    method: UsersService.getUserTotals,
    args: {
      id: userIdentity.creator.id,
    },
  })

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const {
    page: activeIdentitiesPage,
    limit: activeIdentitiesLimit,
    sortBy: activeIdentitiesSortBy,
    direction: activeIdentitiesDirection,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'activeIdentities',
    defaultSortByValue: SortColumn.USER_ASSETS,
  })

  const activeIdentitiesSearch = searchParams.get('activeIdentitiesSearch')

  const activeIdentities = await fetchWrapper({
    method: UsersService.getUserIdentities,
    args: {
      user: userWallet,
      page: activeIdentitiesPage,
      limit: activeIdentitiesLimit,
      sortBy: activeIdentitiesSortBy,
      direction: activeIdentitiesDirection,
      displayName: activeIdentitiesSearch,
    },
  })

  const activeIdentitiesTotalPages = calculateTotalPages(
    activeIdentities?.total ?? 0,
    Number(activeIdentitiesLimit),
  )

  const {
    page: activeClaimsPage,
    limit: activeClaimsLimit,
    sortBy: activeClaimsSortBy,
    direction: activeClaimsDirection,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'activeClaims',
  })

  const activeClaimsSearch = searchParams.get('activeClaimsSearch')

  const activeClaims = await fetchWrapper({
    method: UsersService.getUserClaims,
    args: {
      user: userWallet,
      page: activeClaimsPage,
      limit: activeClaimsLimit,
      sortBy: activeClaimsSortBy,
      direction: activeClaimsDirection,
      displayName: activeClaimsSearch,
    },
  })

  const activeClaimsTotalPages = calculateTotalPages(
    activeClaims?.total ?? 0,
    Number(activeClaimsLimit),
  )

  const activeClaimsSummary = await fetchWrapper({
    method: ClaimsService.claimSummary,
    args: {
      identity: userWallet,
    },
  })

  const {
    page: createdIdentitiesPage,
    limit: createdIdentitiesLimit,
    sortBy: createdIdentitiesSortBy,
    direction: createdIdentitiesDirection,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'createdIdentities',
    defaultSortByValue: SortColumn.USER_ASSETS,
  })

  const createdIdentitiesSearch = searchParams.get('createdIdentitiesSearch')

  const createdIdentities = await fetchWrapper({
    method: IdentitiesService.searchIdentity,
    args: {
      page: createdIdentitiesPage,
      limit: createdIdentitiesLimit,
      sortBy: createdIdentitiesSortBy,
      direction: createdIdentitiesDirection,
      creator: userWallet,
      displayName: createdIdentitiesSearch,
    },
  })

  const createdIdentitiesTotalPages = calculateTotalPages(
    createdIdentities?.total ?? 0,
    Number(createdIdentitiesLimit),
  )

  const createdIdentitiesSummary = await fetchWrapper({
    method: IdentitiesService.identitySummary,
    args: { creator: userWallet },
  })

  const {
    page: createdClaimsPage,
    limit: createdClaimsLimit,
    sortBy: createdClaimsSortBy,
    direction: createdClaimsDirection,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'createdClaims',
  })

  const createdClaimsSearch = searchParams.get('createdClaimsSearch')

  const createdClaims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      page: createdClaimsPage,
      limit: createdClaimsLimit,
      sortBy: createdClaimsSortBy as ClaimSortColumn,
      direction: createdClaimsDirection,
      creator: userWallet,
      displayName: createdClaimsSearch,
    },
  })

  const createdClaimsTotalPages = calculateTotalPages(
    createdClaims?.total ?? 0,
    Number(createdClaimsLimit),
  )

  const createdClaimsSummary = await fetchWrapper({
    method: ClaimsService.claimSummary,
    args: {
      creator: userWallet,
    },
  })

  return json({
    userIdentity,
    userTotals: userTotals as UserTotalsPresenter,
    activeIdentities: activeIdentities?.data as IdentityPresenter[],
    activeIdentitiesSortBy,
    activeIdentitiesDirection,
    activeIdentitiesPagination: {
      currentPage: Number(activeIdentitiesPage),
      limit: Number(activeIdentitiesLimit),
      totalEntries: activeIdentities?.total ?? 0,
      totalPages: activeIdentitiesTotalPages,
    },
    createdIdentities: createdIdentities?.data as IdentityPresenter[],
    createdIdentitiesSortBy,
    createdIdentitiesDirection,
    createdIdentitiesPagination: {
      currentPage: Number(createdIdentitiesPage),
      limit: Number(createdIdentitiesLimit),
      totalEntries: createdIdentities?.total ?? 0,
      totalPages: createdIdentitiesTotalPages,
    },
    createdIdentitiesSummary,
    activeClaims: activeClaims?.data as ClaimPresenter[],
    activeClaimsSummary,
    activeClaimsSortBy,
    activeClaimsDirection,
    activeClaimsPagination: {
      currentPage: Number(activeClaimsPage),
      limit: Number(activeClaimsLimit),
      totalEntries: activeClaims?.total ?? 0,
      totalPages: activeClaimsTotalPages,
    },
    createdClaims: createdClaims?.data as ClaimPresenter[],
    createdClaimsSummary,
    createdClaimsSortBy,
    createdClaimsDirection,
    createdClaimsPagination: {
      currentPage: Number(createdClaimsPage),
      limit: Number(createdClaimsLimit),
      totalEntries: createdClaims?.total ?? 0,
      totalPages: createdClaimsTotalPages,
    },
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
      />
      {children}
    </TabsContent>
  )
}

export default function ProfileDataCreated() {
  const {
    userIdentity,
    userTotals,
    activeIdentities,
    activeIdentitiesPagination,
    createdIdentities,
    createdIdentitiesSummary,
    createdIdentitiesPagination,
    activeClaims,
    activeClaimsSummary,
    activeClaimsPagination,
    createdClaims,
    createdClaimsSummary,
    createdClaimsPagination,
  } = useLiveLoader<typeof loader>(['attest'])
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
              totalCount={activeIdentitiesPagination.totalEntries}
            />
            <TabsTrigger
              value={DataCreatedHeaderVariants.activeClaims}
              label="Claims"
              totalCount={activeClaimsPagination.totalEntries}
            />
          </TabsList>
          <TabContent
            value={DataCreatedHeaderVariants.activeIdentities}
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalResults={activeIdentitiesPagination.totalEntries}
            totalStake={
              +formatBalance(userTotals?.total_position_value ?? '0', 18, 4)
            }
            variant={DataCreatedHeaderVariants.activeIdentities}
          >
            <ActivePositionsOnIdentities
              identities={activeIdentities}
              pagination={activeIdentitiesPagination}
            />
          </TabContent>
          <TabContent
            value={DataCreatedHeaderVariants.activeClaims}
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalResults={activeClaimsPagination.totalEntries}
            totalStake={
              +formatBalance(activeClaimsSummary?.assets_sum ?? '0', 18, 4)
            }
            variant={DataCreatedHeaderVariants.activeClaims}
          >
            <ActivePositionsOnClaims
              claims={activeClaims}
              pagination={activeClaimsPagination}
            />
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
              totalCount={createdIdentitiesPagination.totalEntries}
            />
            <TabsTrigger
              value={DataCreatedHeaderVariants.createdClaims}
              label="Claims"
              totalCount={createdClaimsPagination.totalEntries}
            />
          </TabsList>
          <TabContent
            value={DataCreatedHeaderVariants.createdIdentities}
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalResults={createdIdentitiesPagination.totalEntries}
            totalStake={
              +formatBalance(createdIdentitiesSummary?.assets ?? '0', 18, 4)
            }
            variant={DataCreatedHeaderVariants.createdIdentities}
          >
            <IdentitiesList
              identities={createdIdentities}
              pagination={createdIdentitiesPagination}
              paramPrefix="createdIdentities"
              enableSearch
            />
          </TabContent>
          <TabContent
            value={DataCreatedHeaderVariants.createdClaims}
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalResults={createdClaimsPagination.totalEntries}
            totalStake={
              +formatBalance(createdClaimsSummary?.assets_sum ?? '0', 18, 4)
            }
            variant={DataCreatedHeaderVariants.createdClaims}
          >
            <ClaimsList
              claims={createdClaims}
              pagination={createdClaimsPagination}
              paramPrefix="createdClaims"
              enableSearch
            />
          </TabContent>
        </Tabs>
      </div>
    </>
  )
}
