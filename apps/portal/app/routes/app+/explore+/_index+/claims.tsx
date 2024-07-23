import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
} from '@0xintuition/api'

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ClaimsList } from '@components/list/claims'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
  })
  const subjectId = searchParams.get('subject') || null
  const predicateId = searchParams.get('predicate') || null
  const objectId = searchParams.get('object') || null

  const claims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      subject: subjectId,
      predicate: predicateId,
      object: objectId,
    },
  })

  const identities = await fetchWrapper({
    method: IdentitiesService.searchIdentity,
    args: {
      page: 1,
      limit: 10,
      sortBy: 'AssetsSum',
      direction: 'desc',
    },
  })

  const claimsTotalPages = calculateTotalPages(claims?.total ?? 0, limit)

  return json({
    identities: identities?.data,
    claims: claims?.data as ClaimPresenter[],
    claimsPagination: {
      currentPage: page,
      limit,
      totalEntries: claims?.total ?? 0,
      totalPages: claimsTotalPages,
    },
  })
}

export default function ExploreClaims() {
  const { claims, identities, claimsPagination } =
    useLoaderData<typeof loader>()
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <ExploreSearch
        variant="claim"
        className="mb-12"
        identities={identities}
      />
      <ClaimsList
        claims={claims}
        pagination={claimsPagination}
        enableSearch={false}
        enableSort={true}
      />
    </div>
  )
}
