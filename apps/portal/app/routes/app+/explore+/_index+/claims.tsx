import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  SortDirection,
} from '@0xintuition/api'

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ClaimsList } from '@components/list/claims'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const search = searchParams.get('claim')
  const sortBy: ClaimSortColumn =
    (searchParams.get('sortBy') as ClaimSortColumn) ?? 'AssetsSum'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const claims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit: Number(limit),
      sortBy: sortBy as ClaimSortColumn,
      direction: direction as SortDirection,
      displayName: search,
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

  const claimsTotalPages = calculateTotalPages(
    claims?.total ?? 0,
    Number(limit),
  )

  return json({
    identities: identities?.data,
    claims: claims?.data as ClaimPresenter[],
    claimsPagination: {
      currentPage: Number(page),
      limit: Number(limit),
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
      />
    </div>
  )
}
