import {
  NO_PARAM_ID_ERROR,
  NO_USER_IDENTITY_ERROR,
  NO_WALLET_ERROR,
} from 'constants'
import { Suspense } from 'react'

import { ErrorStateCard, Text } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  PositionPresenter,
} from '@0xintuition/api'

import { ClaimsList as ClaimsAboutIdentity } from '@components/list/claims'
import { PositionsOnIdentity } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
import { RevalidateButton } from '@components/revalidate-button'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getPositionsOnIdentity } from '@lib/services/positions'
import { fetchWrapper, formatBalance, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData, useRouteLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

import { ProfileLoaderData } from '../_index+/_layout'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const wallet = params.wallet
  invariant(wallet, NO_PARAM_ID_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    positions: getPositionsOnIdentity({ identityId: wallet, searchParams }),
    claims: getClaimsAboutIdentity({
      identityId: wallet,
      searchParams,
    }),
    claimsSummary: fetchWrapper({
      method: ClaimsService.claimSummary,
      args: {
        identity: wallet,
      },
    }),
  })
}

export default function ProfileDataAbout() {
  const { positions, claims, claimsSummary } = useLoaderData<typeof loader>()

  const { userIdentity } =
    useRouteLoaderData<ProfileLoaderData>('routes/app+/profile+/$wallet') ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  return (
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex flex-col w-full pb-4">
        <div className="self-stretch justify-between items-center inline-flex mb-6">
          <Text
            variant="headline"
            weight="medium"
            className="theme-secondary-foreground w-full"
          >
            Claims about this Identity
          </Text>
        </div>
        <Suspense fallback={<DataHeaderSkeleton />}>
          <Await
            resolve={Promise.all([claims, claimsSummary])}
            errorElement={<></>}
          >
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
          <Await
            resolve={claims}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
          >
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
        <div className="self-stretch justify-between items-center inline-flex mb-6">
          <Text
            variant="headline"
            weight="medium"
            className="theme-secondary-foreground w-full"
          >
            Positions on this Identity
          </Text>
        </div>
        <Suspense fallback={<DataHeaderSkeleton />}>
          <Await resolve={positions} errorElement={<></>}>
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
          <Await
            resolve={positions}
            errorElement={
              <ErrorStateCard>
                <RevalidateButton />
              </ErrorStateCard>
            }
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
