import { Suspense } from 'react'

import { Button, ErrorStateCard, Icon, IconName, Text } from '@0xintuition/1ui'
import { ApiError, ClaimsService, IdentitiesService } from '@0xintuition/api'

import CreateClaimModal from '@components/create-claim/create-claim-modal'
import { ClaimsList as ClaimsAboutIdentity } from '@components/list/claims'
import { PositionsOnIdentity } from '@components/list/positions-on-identity'
import DataAboutHeader from '@components/profile/data-about-header'
import { RevalidateButton } from '@components/revalidate-button'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getPositionsOnIdentity } from '@lib/services/positions'
import { createClaimModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Await, useRouteLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { NO_USER_IDENTITY_ERROR, NO_WALLET_ERROR } from 'app/consts'
import { useAtom } from 'jotai'

import { ProfileLoaderData } from './_layout'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  let userIdentity
  try {
    userIdentity = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityById,
      args: { id: userWallet },
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

  return defer({
    positions: getPositionsOnIdentity({
      request,
      identityId: userIdentity.id,
      searchParams,
    }),
    claims: getClaimsAboutIdentity({
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
    userWallet,
  })
}

export default function ProfileDataAbout() {
  const { positions, claims, claimsSummary, userWallet } = useLiveLoader<
    typeof loader
  >(['attest'])

  const { userIdentity } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  const [createClaimModalActive, setCreateClaimModalActive] =
    useAtom(createClaimModalAtom)

  return (
    <>
      <div className="flex-col justify-start items-start flex w-full gap-6">
        <div className="flex flex-col w-full gap-6">
          <div className="flex max-lg:flex-col justify-between items-center max-lg:w-full">
            <div className="self-stretch justify-between items-center inline-flex">
              <Text
                variant="headline"
                weight="medium"
                className="theme-secondary-foreground w-full"
              >
                Claims about this Identity
              </Text>
            </div>
            <Button
              variant="primary"
              className="max-lg:w-full max-lg:mt-2"
              onClick={() => setCreateClaimModalActive(true)}
            >
              <Icon name={IconName.claim} className="h-4 w-4" /> Make a Claim
            </Button>
          </div>
          <Suspense fallback={<DataHeaderSkeleton />}>
            <Await resolve={claims} errorElement={<></>}>
              {(resolvedClaims) => (
                <Await resolve={claimsSummary} errorElement={<></>}>
                  {(resolvedClaimsSummary) => (
                    <DataAboutHeader
                      variant="claims"
                      userIdentity={userIdentity}
                      totalClaims={resolvedClaims.pagination.totalEntries}
                      totalStake={
                        +formatBalance(
                          resolvedClaimsSummary?.assets_sum ?? 0,
                          18,
                          4,
                        )
                      }
                    />
                  )}
                </Await>
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
        <div className="flex flex-col pt-4 w-full gap-6">
          <div className="self-stretch justify-between items-center inline-flex">
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
      {userWallet && (
        <CreateClaimModal
          open={createClaimModalActive}
          wallet={userWallet}
          onClose={() => setCreateClaimModalActive(false)}
        />
      )}
    </>
  )
}
