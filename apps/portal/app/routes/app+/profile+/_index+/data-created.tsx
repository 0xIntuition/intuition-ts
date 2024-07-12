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
  IdentityPresenter,
  OpenAPI,
  SortColumn,
  SortDirection,
  UserTotalsPresenter,
} from '@0xintuition/api'

import { ActivePositionsOnClaims } from '@components/list/active-positions-on-claims'
import { ActivePositionsOnIdentities } from '@components/list/active-positions-on-identities'
import {
  DataCreatedHeader,
  DataCreatedHeaderVariants,
  DataCreatedHeaderVariantType,
} from '@components/profile/data-created-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  fetchClaimsSummary,
  fetchClaimsWithUserPosition,
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
  const identitiesSearch = searchParams.get('identitiesSearch')
  const identitiesSortBy = searchParams.get('identitiesSortBy') ?? 'UserAssets'
  const identitiesDirection = searchParams.get('identitiesDirection') ?? 'desc'
  const identitiesPage = searchParams.get('identitiesPage')
    ? parseInt(searchParams.get('identitiesPage') as string)
    : 1
  const identitiesLimit = searchParams.get('limit') ?? '10'

  const identities = await fetchIdentitiesWithUserPosition(
    user.details.wallet.address,
    identitiesPage,
    Number(identitiesLimit),
    identitiesSortBy as SortColumn,
    identitiesDirection as SortDirection,
    identitiesSearch,
  )

  const identitiesTotalPages = calculateTotalPages(
    identities?.total ?? 0,
    Number(identitiesLimit),
  )

  const claimsSearch = searchParams.get('claimsSearch')
  const claimsSortBy = searchParams.get('claimsSortBy') ?? 'AssetsSum'
  const claimsDirection = searchParams.get('claimsDirection') ?? 'desc'
  const claimsPage = searchParams.get('claimsPage')
    ? parseInt(searchParams.get('claimsPage') as string)
    : 1
  const claimsLimit = searchParams.get('claimsLimit') ?? '10'

  const claims = await fetchClaimsWithUserPosition(
    user.details.wallet.address,
    claimsPage,
    Number(claimsLimit),
    claimsSortBy as SortColumn,
    claimsDirection as SortDirection,
    claimsSearch,
  )

  const claimsTotalPages = calculateTotalPages(
    claims?.total ?? 0,
    Number(claimsLimit),
  )

  const claimsSummary = await fetchClaimsSummary(user.details.wallet.address)

  return json({
    userIdentity,
    userTotals: userTotals as UserTotalsPresenter,
    identities: identities?.data as IdentityPresenter[],
    identitiesSortBy,
    identitiesDirection,
    identitiesPagination: {
      currentPage: Number(identitiesPage),
      limit: Number(identitiesLimit),
      totalEntries: identities?.total ?? 0,
      totalPages: identitiesTotalPages,
    },
    claims: claims?.data as ClaimPresenter[],
    claimsSummary,
    claimsSortBy,
    claimsDirection,
    claimsPagination: {
      currentPage: Number(claimsPage),
      limit: Number(claimsLimit),
      totalEntries: claims?.total ?? 0,
      totalPages: claimsTotalPages,
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
    identities,
    identitiesPagination,
    claims,
    claimsSummary,
    claimsPagination,
  } = useLiveLoader<typeof loader>(['attest'])
  return (
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
        defaultValue={DataCreatedHeaderVariants.identities}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger
            value={DataCreatedHeaderVariants.identities}
            label="Identities"
            totalCount={identitiesPagination.totalEntries}
          />
          <TabsTrigger
            value={DataCreatedHeaderVariants.claims}
            label="Claims"
            totalCount={claimsPagination.totalEntries}
          />
        </TabsList>
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
        <TabContent
          value={DataCreatedHeaderVariants.claims}
          userIdentity={userIdentity}
          userTotals={userTotals}
          totalResults={claimsPagination.totalEntries}
          totalStake={+formatBalance(claimsSummary?.assets_sum ?? '0', 18, 4)}
          variant={DataCreatedHeaderVariants.claims}
        >
          <ActivePositionsOnClaims
            claims={claims}
            pagination={claimsPagination}
          />
        </TabContent>
      </Tabs>
    </div>
  )
}
