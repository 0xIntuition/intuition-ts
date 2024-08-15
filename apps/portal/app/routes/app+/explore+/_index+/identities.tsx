import { IdentitiesService, IdentityPresenter } from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import { ExploreSearch } from '@components/explore/ExploreSearch'
import { IdentitiesList } from '@components/list/identities'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
  })
  const displayName = searchParams.get('identity') || null
  const hasTag = searchParams.get('tagIds') || null
  const isUser = searchParams.get('isUser')

  const identities = await fetchWrapper(request, {
    method: IdentitiesService.searchIdentity,
    args: {
      page,
      limit,
      sortBy,
      direction,
      displayName,
      hasTag,
      isUser: isUser === 'true' ? true : isUser === 'false' ? false : undefined,
    },
  })

  const totalPages = calculateTotalPages(identities?.total ?? 0, limit)

  return json({
    identities: identities?.data as IdentityPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: page,
      limit,
      totalEntries: identities?.total ?? 0,
      totalPages,
    },
  })
}

export default function ExploreIdentities() {
  const { identities, pagination } = useLoaderData<typeof loader>()

  return (
    <>
      <ExploreSearch variant="identity" />
      <IdentitiesList
        variant="explore"
        identities={identities}
        pagination={pagination}
        enableSearch={false}
        enableSort={true}
      />
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="explore/identities" />
}
