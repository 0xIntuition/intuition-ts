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

  const identitiesResponse = await IdentitiesService.getIdentities({
    page: 1,
    limit: 100,
    offset: 0,
    sortBy: 'IdentityId',
    direction: 'asc',
  })
  logger('[get-identities route] identitiesResponse:', identitiesResponse)
  return json({
    identities: identitiesResponse.data,
  })
}
