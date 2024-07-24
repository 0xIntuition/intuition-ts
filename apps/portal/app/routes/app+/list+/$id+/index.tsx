import { Suspense } from 'react'

import { Claim, ListHeaderCard } from '@0xintuition/1ui'
import { ClaimPresenter, ClaimsService } from '@0xintuition/api'

import { IdentitiesList } from '@components/list/identities'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { getListIdentities } from '@lib/services/lists'
import { NO_CLAIM_ERROR, NO_PARAM_ID_ERROR } from '@lib/utils/errors'
import logger from '@lib/utils/logger'
import { DataErrorDisplay, fetchWrapper, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData, useRouteLoaderData } from '@remix-run/react'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const claim = await fetchWrapper({
    method: ClaimsService.getClaimById,
    args: { id },
  })

  invariant(claim.object?.id, NO_PARAM_ID_ERROR)

  return defer({
    listIdentities: getListIdentities({
      objectId: claim.object.id,
      searchParams,
    }),
  })
}

export default function ListOverview() {
  const { listIdentities } = useLoaderData<typeof loader>()
  const { claim } =
    useRouteLoaderData<{ claim: ClaimPresenter }>('routes/app+/list+/$id') ?? {}
  invariant(claim, NO_CLAIM_ERROR)
  logger('claim on index from routeloader', claim)
  logger('listIdentities', listIdentities)

  return (
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex flex-col w-full pb-4">
        <Suspense fallback={<DataHeaderSkeleton />}>
          <Await resolve={listIdentities} errorElement={<></>}>
            {(resolvedListIdentities) => (
              <ListHeaderCard
                label="Identities"
                value={resolvedListIdentities.pagination.totalEntries}
              >
                <Claim
                  size="md"
                  subject={{
                    variant: claim.subject?.is_user ? 'user' : 'non-user',
                    label: '?',
                    imgSrc: null,
                  }}
                  predicate={{
                    variant: claim.predicate?.is_user ? 'user' : 'non-user',
                    label: claim.predicate?.is_user
                      ? claim.predicate?.user?.display_name ??
                        claim.predicate?.display_name
                      : claim.predicate?.display_name ?? '',
                    imgSrc: claim.predicate?.is_user
                      ? claim.predicate?.user?.image ?? claim.predicate?.image
                      : claim.predicate?.image ?? null,
                  }}
                  object={{
                    variant: claim.object?.is_user ? 'user' : 'non-user',
                    label: claim.object?.is_user
                      ? claim.object?.user?.display_name ??
                        claim.object?.display_name
                      : claim.object?.display_name ?? '',
                    imgSrc: claim.object?.is_user
                      ? claim.object?.user?.image ?? claim.object?.image
                      : claim.object?.image ?? null,
                  }}
                />
              </ListHeaderCard>
            )}
          </Await>
        </Suspense>
        <Suspense fallback={<PaginatedListSkeleton />}>
          <Await resolve={listIdentities} errorElement={<DataErrorDisplay />}>
            {(resolvedListIdentities) => (
              <IdentitiesList
                identities={resolvedListIdentities.listIdentities}
                pagination={resolvedListIdentities.pagination}
                enableSearch={true}
                enableSort={true}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
