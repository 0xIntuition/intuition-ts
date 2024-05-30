import { IdentitiesService, OpenAPI } from '@0xintuition/api'

import { PrivyButton } from '@client/privy-button'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'
import { ClientOnly } from 'remix-utils/client-only'

export async function loader({ request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  // pagination
  const sortBy = searchParams.get('sortBy') ?? 'assets_sum'
  const direction = searchParams.get('direction') ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  // search
  const search = url.searchParams.get('search') || ''

  const { data: identities, total } = await IdentitiesService.getIdentities({
    paging: {
      page: 1,
      limit: 10,
      offset: 0,
    },
    sort: {
      sortBy: 'IdentityId',
      direction: 'asc',
    },
  })

  const totalPages = calculateTotalPages(total, Number(limit))

  return json({
    identities: identities ?? [],
    sortBy,
    direction,
    search,
    pagination: { page: Number(page), limit: Number(limit), total, totalPages },
  })
}

export default function PublicProfile() {
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        Public profile route test
        <ClientOnly>{() => <PrivyButton />}</ClientOnly>
      </div>
    </div>
  )
}
