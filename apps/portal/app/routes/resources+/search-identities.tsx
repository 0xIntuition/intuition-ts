import { IdentitiesService, OpenAPI } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const url = new URL(request.url)
  const searchQuery = url.searchParams.get('search') || ''
  logger('[search-identities] searchQuery', searchQuery)
  const response = await IdentitiesService.searchIdentity({
    displayName: searchQuery,
  })
  const data = response.data

  if (data) {
    logger('search data length', data.length, searchQuery)
  }

  return json(data ?? [])
}
