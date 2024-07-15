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
  IdentityPresenter,
  OpenAPI,
  SortColumn,
  SortDirection,
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
  fetchClaimsCreatedByUser,
  fetchClaimsSummary,
  fetchClaimsWithUserPosition,
  fetchCreatedClaimsSummary,
  fetchCreatedIdentitiesSummary,
  fetchIdentitiesCreatedByUser,
  fetchIdentitiesWithUserPosition,
  fetchIdentity,
  fetchUserTotals,
} from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import {
  calculateTotalPages,
  formatBalance,
  getAuthHeaders,
} from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>
  const session = context.get(SessionContext)
  const user = session.get('user')
  if (!user?.details?.wallet?.address) {
    return logger('No user found in session')
  }
  const userIdentity = await fetchIdentity(user.details.wallet.address)
  if (!userIdentity) {
    return logger('No user identity found')
  }
  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    logger('Invalid or missing creator ID')
    return
  }
  const userTotals = await fetchUserTotals(userIdentity.creator.id)
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  console.log('userTotals', userTotals)

  const activeIdentitiesSearch = searchParams.get('activeIdentitiesSearch')
  const activeIdentitiesSortBy =
    searchParams.get('activeIdentitiesSortBy') ?? 'UserAssets'
  const activeIdentitiesDirection =
    searchParams.get('activeIdentitiesDirection') ?? 'desc'
  const activeIdentitiesPage = searchParams.get('activeIdentitiesPage')
    ? parseInt(searchParams.get('activeIdentitiesPage') as string)
    : 1
  const activeIdentitiesLimit =
    searchParams.get('activeIdentitiesLimit') ?? '10'
  const activeIdentities = await fetchIdentitiesWithUserPosition(
    user.details.wallet.address,
    activeIdentitiesPage,
    Number(activeIdentitiesLimit),
    activeIdentitiesSortBy as SortColumn,
    activeIdentitiesDirection as SortDirection,
    activeIdentitiesSearch,
  )
  const activeIdentitiesTotalPages = calculateTotalPages(
    activeIdentities?.total ?? 0,
    Number(activeIdentitiesLimit),
  )
  const activeClaimsSearch = searchParams.get('activeClaimsSearch')
  const activeClaimsSortBy =
    searchParams.get('activeClaimsSortBy') ?? 'AssetsSum'
  const activeClaimsDirection =
    searchParams.get('activeClaimsDirection') ?? 'desc'
  const activeClaimsPage = searchParams.get('activeClaimsPage')
    ? parseInt(searchParams.get('activeClaimsPage') as string)
    : 1
  const activeClaimsLimit = searchParams.get('activeClaimsLimit') ?? '10'
  const activeClaims = await fetchClaimsWithUserPosition(
    user.details.wallet.address,
    activeClaimsPage,
    Number(activeClaimsLimit),
    activeClaimsSortBy as SortColumn,
    activeClaimsDirection as SortDirection,
    activeClaimsSearch,
  )
  const activeClaimsTotalPages = calculateTotalPages(
    activeClaims?.total ?? 0,
    Number(activeClaimsLimit),
  )
  const activeClaimsSummary = await fetchClaimsSummary(
    user.details.wallet.address,
  )

  const createdIdentitiesSearch = searchParams.get('createdIdentitiesSearch')
  const createdIdentitiesSortBy =
    searchParams.get('createdIdentitiesSortBy') ?? 'UserAssets'
  const createdIdentitiesDirection =
    searchParams.get('createdIdentitiesDirection') ?? 'desc'
  const createdIdentitiesPage = searchParams.get('createdIdentitiesPage')
    ? parseInt(searchParams.get('createdIdentitiesPage') as string)
    : 1
  const createdIdentitiesLimit =
    searchParams.get('createdIdentitiesLimit') ?? '10'
  const createdIdentities = await fetchIdentitiesCreatedByUser(
    createdIdentitiesPage,
    Number(createdIdentitiesLimit),
    createdIdentitiesSortBy as SortColumn,
    createdIdentitiesDirection as SortDirection,
    user.details.wallet.address,
    createdIdentitiesSearch,
  )
  const createdIdentitiesTotalPages = calculateTotalPages(
    createdIdentities?.total ?? 0,
    Number(createdIdentitiesLimit),
  )

  const createdIdentitiesSummary = await fetchCreatedIdentitiesSummary(
    user.details.wallet.address,
  )

  const createdClaimsSearch = searchParams.get('createdClaimsSearch')
  const createdClaimsSortBy =
    searchParams.get('createdClaimsSortBy') ?? 'AssetsSum'
  const createdClaimsDirection =
    searchParams.get('createdClaimsDirection') ?? 'desc'
  const createdClaimsPage = searchParams.get('createdClaimsPage')
    ? parseInt(searchParams.get('createdClaimsPage') as string)
    : 1
  const createdClaimsLimit = searchParams.get('createdClaimsLimit') ?? '10'
  const createdClaims = await fetchClaimsCreatedByUser(
    createdClaimsPage,
    Number(createdClaimsLimit),
    createdClaimsSortBy as ClaimSortColumn,
    createdClaimsDirection as SortDirection,
    user.details.wallet.address,
    createdClaimsSearch,
  )
  const createdClaimsTotalPages = calculateTotalPages(
    createdClaims?.total ?? 0,
    Number(createdClaimsLimit),
  )
  const createdClaimsSummary = await fetchCreatedClaimsSummary(
    user.details.wallet.address,
  )

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
