import {
  IdentitiesService,
  IdentityPresenter,
  SortColumn,
  SortDirection,
} from '@0xintuition/api'

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { IdentitiesList } from '@components/list/identities'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { PaginationType } from 'types/pagination'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const displayNameQuery = searchParams.get('identity')
  const hasTagQuery = searchParams.get('tagIds')
  const sortBy: SortColumn =
    (searchParams.get('sortBy') as SortColumn) ?? 'AssetsSum'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  const identities = await fetchWrapper(IdentitiesService.searchIdentity, {
    page,
    limit: Number(limit),
    sortBy: sortBy as SortColumn,
    direction: direction as SortDirection,
    displayName: displayNameQuery,
    hasTag: hasTagQuery,
  })

  const totalPages = calculateTotalPages(identities?.total ?? 0, Number(limit))

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

export default function ExploreIdentities() {
  const { identities, pagination } = useLoaderData<typeof loader>()

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <ExploreSearch variant="identity" className="mb-12" />
      <IdentitiesList
        identities={identities}
        pagination={pagination as PaginationType}
      />
    </div>
  )
}
