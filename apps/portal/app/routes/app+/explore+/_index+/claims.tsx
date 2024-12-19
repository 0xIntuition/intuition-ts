import { IconName } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
} from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ClaimsList } from '@components/list/claims'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { HEADER_BANNER_CLAIMS, NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { offset, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
  })
  const subjectId = searchParams.get('subject') || null
  const predicateId = searchParams.get('predicate') || null
  const objectId = searchParams.get('object') || null

  const claims = await fetchWrapper(request, ClaimsService, {
    offset,
    limit,
    sortBy: sortBy as ClaimSortColumn,
    direction,
    subject: subjectId,
    predicate: predicateId,
    object: objectId,
  })

  const identities = await fetchWrapper(request, IdentitiesService, {
    offset: 0,
    limit: 10,
    search: null,
  })

  return json({
    claims: claims.data as ClaimPresenter[],
    claimsPagination: {
      totalEntries: claims.total ?? 0,
      limit,
      offset,
      onOffsetChange: () => {},
      onLimitChange: () => {},
    },
    identities: identities.data,
  })
}

export default function ExploreClaims() {
  const { claims, claimsPagination } = useLiveLoader<typeof loader>()

  return (
    <>
      <ExploreHeader
        title="Claims"
        description="Explore claims made about identities"
        icon={IconName.claim}
        bgImage={HEADER_BANNER_CLAIMS}
      />
      <ExploreSearch variant="claim" />
      <ClaimsList
        claims={claims}
        pagination={claimsPagination}
        enableSearch={false}
        enableSort={true}
      />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="explore/claims" />
}
