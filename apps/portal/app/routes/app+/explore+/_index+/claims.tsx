import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
} from '@0xintuition/api'

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ClaimsList } from '@components/list/claims'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { logAPI, requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'consts'

export async function loader({ request }: LoaderFunctionArgs) {
  console.log('[EXPLORE CLAIMS] -- START')
  logAPI()
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

  const claims = await fetchWrapper(request, {
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

  const identities = await fetchWrapper(request, {
    method: IdentitiesService.searchIdentity,
    args: {
      page: 1,
      limit: 10,
      sortBy: 'AssetsSum',
      direction: 'desc',
    },
  })

  const claimsTotalPages = calculateTotalPages(claims?.total ?? 0, limit)

  console.log('[EXPLORE CLAIMS] -- END')
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
    <>
      <ExploreSearch variant="claim" identities={identities} />
      <ClaimsList
        claims={claims}
        pagination={claimsPagination}
        enableSearch={false}
        enableSort={true}
      />
    </>
  )
}
