import { Suspense } from 'react'

import { Text } from '@0xintuition/1ui'
import { ClaimsService } from '@0xintuition/api'

import { ClaimsList as ClaimsAboutIdentity } from '@components/list/claims'
import { PositionsOnIdentity } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getPositionsOnIdentity } from '@lib/services/positions'
import { NO_USER_IDENTITY_ERROR, NO_WALLET_ERROR } from '@lib/utils/errors'
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
    positions: getPositionsOnIdentity({ identityId: userWallet, searchParams }),
    claims: getClaimsAboutIdentity({
      identityId: userWallet,
      searchParams,
    }),
    claimsSummary: fetchWrapper({
      method: ClaimsService.claimSummary,
      args: {
        identity: userWallet,
      },
    }),
  })
}

export default function ProfileDataAbout() {
  const { positions, claims, claimsSummary } = useLiveLoader<typeof loader>([
    'attest',
  ])

  const { userIdentity } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  return (
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex flex-col w-full pb-4">
        <div className="flex justify-between items-center w-full">
          <Text
            variant="headline"
            weight="medium"
            className="theme-secondary-foreground pb-3"
          >
            Claims about this Identity
          </Text>
        </div>
        <Suspense fallback={<DataHeaderSkeleton />}>
          <Await resolve={Promise.all([claims, claimsSummary])}>
            {([resolvedClaims, resolvedClaimsSummary]) => (
              <DataAboutHeader
                variant="claims"
                userIdentity={userIdentity}
                totalClaims={resolvedClaims.pagination.totalEntries}
                totalStake={
                  +formatBalance(resolvedClaimsSummary?.assets_sum ?? 0, 18, 4)
                }
              />
            )}
          </Await>
        </Suspense>
        <Suspense fallback={<PaginatedListSkeleton />}>
          <Await resolve={claims} errorElement={<DataErrorDisplay />}>
            {(resolvedClaims) => (
              <ClaimsAboutIdentity
                claims={resolvedClaims.data}
                pagination={resolvedClaims.pagination}
                paramPrefix="claims"
                enableSearch
                enableSort
              />
            )}
          </Await>
        </Suspense>
      </div>
      <div className="flex flex-col pt-4 w-full">
        <div className="flex justify-between items-center w-full">
          <Text
            variant="headline"
            weight="medium"
            className="theme-secondary-foreground pb-3"
          >
            Positions on this Identity
          </Text>
        </div>
        <Suspense fallback={<DataHeaderSkeleton />}>
          <Await resolve={positions}>
            {(resolvedPositions) => (
              <DataAboutHeader
                variant="positions"
                userIdentity={userIdentity}
                totalPositions={resolvedPositions.pagination.totalEntries}
                totalStake={+formatBalance(userIdentity.assets_sum, 18, 4)}
              />
            )}
          </Await>
        </Suspense>
        <Suspense fallback={<PaginatedListSkeleton />}>
          <Await resolve={positions} errorElement={<DataErrorDisplay />}>
            {(resolvedPositions) => (
              <PositionsOnIdentity
                positions={resolvedPositions.data}
                pagination={resolvedPositions.pagination}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
