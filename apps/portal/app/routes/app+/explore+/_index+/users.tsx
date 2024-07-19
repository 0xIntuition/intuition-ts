import { IdentityPresenter, SortColumn, SortDirection } from '@0xintuition/api'

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { IdentitiesList } from '@components/list/identities'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { fetchUserIdentities } from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import { calculateTotalPages, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const displayNameQuery = searchParams.get('user')
  const hasTagQuery = searchParams.get('tagIds')
  const sortBy: SortColumn =
    (searchParams.get('sortBy') as SortColumn) ?? 'UpdatedAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const identities = await fetchUserIdentities(
    page,
    Number(limit),
    sortBy as SortColumn,
    direction as SortDirection,
    displayNameQuery,
    hasTagQuery,
  )

  const totalPages = calculateTotalPages(identities?.total ?? 0, Number(limit))
  logger('identities', identities)

  return json({
    identities: identities?.data as IdentityPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: identities?.total ?? 0,
      totalPages,
    },
  })
}

export default function ExploreUsers() {
  const { identities, pagination } = useLoaderData<typeof loader>()

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <ExploreSearch variant="user" className="mb-12" />
      <IdentitiesList identities={identities} pagination={pagination} />
    </div>
  )
}
