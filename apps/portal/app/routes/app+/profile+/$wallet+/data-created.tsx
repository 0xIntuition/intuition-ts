import { Tabs, TabsContent, TabsList, TabsTrigger } from '@0xintuition/1ui'
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
import { DataCreatedHeader } from '@components/profile/data-created-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  fetchClaimsWithUserPosition,
  fetchIdentitiesWithUserPosition,
  fetchUserIdentity,
  fetchUserTotals,
} from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ params, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const userIdentity = await fetchUserIdentity(wallet)

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
  // const identitiesSearch = searchParams.get('identitiesSearch') TODO: Add search once BE implements
  const identitiesSortBy = searchParams.get('identitiesSortBy') ?? 'UserAssets'
  const identitiesDirection = searchParams.get('identitiesDirection') ?? 'desc'
  const identitiesPage = searchParams.get('identitiesPage')
    ? parseInt(searchParams.get('identitiesPage') as string)
    : 1
  const identitiesLimit = searchParams.get('limit') ?? '10'

  const identities = await fetchIdentitiesWithUserPosition(
    wallet,
    identitiesPage,
    Number(identitiesLimit),
    identitiesSortBy as SortColumn,
    identitiesDirection as SortDirection,
    // identitiesSearch,
  )

  const identitiesTotalPages = calculateTotalPages(
    identities?.total ?? 0,
    Number(identitiesLimit),
  )

  // const claimsSearch = searchParams.get('claimsSearch') TODO: Add search once BE implements
  const claimsSortBy = searchParams.get('claimsSortBy') ?? 'AssetsSum'
  const claimsDirection = searchParams.get('claimsDirection') ?? 'desc'
  const claimsPage = searchParams.get('claimsPage')
    ? parseInt(searchParams.get('claimsPage') as string)
    : 1
  const claimsLimit = searchParams.get('claimsLimit') ?? '10'

  const claims = await fetchClaimsWithUserPosition(
    wallet,
    claimsPage,
    Number(claimsLimit),
    claimsSortBy as SortColumn,
    claimsDirection as SortDirection,
    // claimsSearch,
  )

  const claimsTotalPages = calculateTotalPages(
    claims?.total ?? 0,
    Number(claimsLimit),
  )

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

export default function ProfileDataCreated() {
  const {
    userIdentity,
    userTotals,
    identities,
    identitiesPagination,
    claims,
    claimsPagination,
  } = useLiveLoader<typeof loader>(['attest'])
  return (
    <div className="flex-col justify-start items-start flex w-full">
      <div className="self-stretch justify-between items-center inline-flex mb-4">
        <div className="grow shrink basis-0 text-white text-xl font-medium leading-[30px]">
          Active Positions
        </div>
      </div>
      <Tabs defaultValue="identities" className="w-full">
        <TabsList>
          <TabsTrigger
            value="identities"
            label="Identities"
            totalCount={identitiesPagination.totalEntries}
          />
          <TabsTrigger
            value="claims"
            label="Claims"
            totalCount={claimsPagination.totalEntries}
          />
        </TabsList>
        <TabsContent value="identities" className="w-full">
          <DataCreatedHeader
            variant="identities"
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalIdentities={identitiesPagination.totalEntries}
          />
          <ActivePositionsOnIdentities
            identities={identities}
            pagination={identitiesPagination}
          />
        </TabsContent>
        <TabsContent value="claims">
          <DataCreatedHeader
            variant="claims"
            userIdentity={userIdentity}
            userTotals={userTotals}
            totalClaims={claimsPagination.totalEntries}
          />
          <ActivePositionsOnClaims
            claims={claims}
            pagination={claimsPagination}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
