import { Suspense } from 'react'

import { Skeleton } from '@0xintuition/1ui'
import { ClaimsService } from '@0xintuition/api'

import { ClaimsList as ClaimsAboutIdentity } from '@components/list/claims'
import { PositionsOnIdentity } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
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
        <DataAboutHeader
          variant="claims"
          title="Claims about this Identity"
          userIdentity={userIdentity}
          totalClaims={
            <Suspense fallback={<Skeleton className="h-6 w-6 inline-flex" />}>
              <Await resolve={claims}>
                {(resolvedClaims) => resolvedClaims.pagination.totalEntries}
              </Await>
            </Suspense>
          }
          totalStake={
            <Suspense fallback={<Skeleton className="h-6 w-14 inline-flex" />}>
              <Await resolve={claimsSummary}>
                {(cs) => `${formatBalance(cs?.assets_sum ?? 0, 18, 4)} ETH`}
              </Await>
            </Suspense>
          }
        />
        <Suspense fallback={<Skeleton className="w-full h-28 mt-6" />}>
          <Await
            resolve={claims}
            errorElement={<DataErrorDisplay dataType={'claims'} />}
          >
            {(resolvedClaims) => (
              <ClaimsAboutIdentity
                claims={resolvedClaims.data}
                pagination={resolvedClaims.pagination}
                paramPrefix="claims"
                enableSearch
              />
            )}
          </Await>
        </Suspense>
      </div>
      <div className="flex flex-col pt-4 w-full">
        <DataAboutHeader
          variant="positions"
          title="Positions on this Identity"
          userIdentity={userIdentity}
          totalPositions={userIdentity.num_positions}
          totalStake={+formatBalance(userIdentity.assets_sum, 18, 4)}
        />
        <Suspense fallback={<Skeleton className="w-full h-28 mt-6" />}>
          <Await
            resolve={positions}
            errorElement={<DataErrorDisplay dataType={'positions'} />}
          >
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
