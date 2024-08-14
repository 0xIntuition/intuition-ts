import { Suspense } from 'react'

import { EmptyStateCard, ErrorStateCard, Text } from '@0xintuition/1ui'
import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  IdentityPresenter,
  SortDirection,
  UserTotalsPresenter,
} from '@0xintuition/api'

import { ClaimsList as ClaimsAboutIdentity } from '@components/list/claims'
import { FollowList } from '@components/list/follow'
import { ListClaimsList } from '@components/list/list-claims'
import { ListClaimsSkeletonLayout } from '@components/list/list-skeletons'
import { ConnectionsHeaderVariants } from '@components/profile/connections-header'
import { OverviewAboutHeader } from '@components/profile/overview-about-header'
import { OverviewCreatedHeader } from '@components/profile/overview-created-header'
import { OverviewStakingHeader } from '@components/profile/overview-staking-header'
import { RevalidateButton } from '@components/revalidate-button'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getConnectionsData } from '@lib/services/connections'
import { getUserSavedLists } from '@lib/services/lists'
import { getPositionsOnIdentity } from '@lib/services/positions'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Await, useParams, useRouteLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import {
  NO_PARAM_ID_ERROR,
  NO_USER_IDENTITY_ERROR,
  NO_WALLET_ERROR,
  PATHS,
} from 'app/consts'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const wallet = params.wallet
  invariant(wallet, NO_PARAM_ID_ERROR)

  let userIdentity
  try {
    userIdentity = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityById,
      args: { id: wallet },
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw redirect('/invite')
    }
    logger('Error fetching userIdentity', error)
    throw error
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const listSearchParams = new URLSearchParams()
  listSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
  listSearchParams.set('direction', SortDirection.DESC)
  listSearchParams.set('limit', '6')

  const claimSearchParams = new URLSearchParams()
  claimSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
  claimSearchParams.set('direction', SortDirection.DESC)
  claimSearchParams.set('limit', '5')

  return defer({
    positions: getPositionsOnIdentity({
      request,
      identityId: userIdentity.id,
      searchParams,
    }),
    claimsSummary: fetchWrapper(request, {
      method: ClaimsService.claimSummary,
      args: {
        identity: userIdentity.id,
      },
    }),
    claims: getClaimsAboutIdentity({
      request,
      identityId: userIdentity.id,
      searchParams: claimSearchParams,
    }),
    savedListClaims: getUserSavedLists({
      request,
      userWallet: wallet,
      searchParams: listSearchParams,
    }),
    connectionsData: getConnectionsData({ request, userWallet: wallet }),
  })
}

export default function ProfileOverview() {
  const { claims, claimsSummary, savedListClaims } = useLiveLoader<
    typeof loader
  >(['attest', 'create'])
  const { connectionsData } = useLiveLoader<typeof loader>(['attest'])
  const { userIdentity, userTotals } =
    useRouteLoaderData<{
      userIdentity: IdentityPresenter
      userTotals: UserTotalsPresenter
    }>('routes/app+/profile+/$wallet') ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)
  const params = useParams()
  const { wallet } = params

  logger('userIdentity', userIdentity)
  logger('userTotals', userTotals)

  return (
    <div className="flex flex-col gap-6">
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        User Stats
      </Text>
      <div className="flex flex-col items-center gap-6">
        <OverviewStakingHeader
          totalClaims={userTotals?.total_positions_on_claims ?? 0}
          totalIdentities={userTotals?.total_positions_on_identities ?? 0}
          totalStake={
            +formatBalance(userTotals?.total_position_value ?? '0', 18)
          }
          link={`${PATHS.PROFILE}/${wallet}/data-created`}
        />
      </div>

      <div className="flex flex-row items-center gap-6 max-md:flex-col">
        <OverviewCreatedHeader
          variant="identities"
          totalCreated={userTotals?.total_identities ?? 0}
          link={`${PATHS.PROFILE}/${wallet}/data-created`}
        />
        <OverviewCreatedHeader
          variant="claims"
          totalCreated={userTotals?.total_claims ?? 0}
          link={`${PATHS.PROFILE}/${wallet}/data-created`}
        />
      </div>
      <Suspense fallback={<DataHeaderSkeleton />}>
        <Await resolve={claims} errorElement={<></>}>
          {(resolvedClaims) => (
            <Await resolve={claimsSummary} errorElement={<></>}>
              {(resolvedClaimsSummary) => (
                <OverviewAboutHeader
                  variant="claims"
                  userIdentity={userIdentity}
                  totalClaims={resolvedClaims.pagination?.totalEntries}
                  totalStake={
                    +formatBalance(
                      resolvedClaimsSummary?.assets_sum ?? 0,
                      18,
                      4,
                    )
                  }
                  link={`${PATHS.PROFILE}/${wallet}/data-about`}
                />
              )}
            </Await>
          )}
        </Await>
      </Suspense>
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        Top Claims about this Identity
      </Text>
      <Suspense fallback={<PaginatedListSkeleton />}>
        <Await
          resolve={claims}
          errorElement={
            <ErrorStateCard>
              <RevalidateButton />
            </ErrorStateCard>
          }
        >
          {(resolvedClaims) => {
            if (!resolvedClaims || resolvedClaims.data.length === 0) {
              return (
                <EmptyStateCard message="This user has no claims about their identity yet." />
              )
            }
            return (
              <ClaimsAboutIdentity
                claims={resolvedClaims.data}
                paramPrefix="claims"
                enableSearch={false}
                enableSort={false}
              />
            )
          }}
        </Await>
      </Suspense>
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        Top Followers
      </Text>
      <Suspense fallback={<PaginatedListSkeleton />}>
        <Await
          resolve={connectionsData}
          errorElement={
            <ErrorStateCard>
              <RevalidateButton />
            </ErrorStateCard>
          }
        >
          {(resolvedConnectionsData) => {
            if (!resolvedConnectionsData) {
              return (
                <EmptyStateCard message="This user has no follow claim yet. A follow claim will be created when the first person follows them." />
              )
            }
            return (
              <FollowList
                identities={resolvedConnectionsData.followers ?? []}
                paramPrefix={ConnectionsHeaderVariants.followers}
                enableSearch={false}
                enableSort={false}
              />
            )
          }}
        </Await>
      </Suspense>
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        Top Lists
      </Text>
      <Suspense fallback={<ListClaimsSkeletonLayout totalItems={6} />}>
        <Await resolve={savedListClaims}>
          {(resolvedSavedListClaims) => {
            return (
              <ListClaimsList
                listClaims={resolvedSavedListClaims.savedListClaims}
                enableSort={false}
                enableSearch={false}
                columns={3}
                sourceUserAddress={wallet}
              />
            )
          }}
        </Await>
      </Suspense>
    </div>
  )
}
