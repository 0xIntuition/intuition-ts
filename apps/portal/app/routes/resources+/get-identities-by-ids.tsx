import { IdentitiesService, IdentityPresenter, OpenAPI } from '@0xintuition/api'

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
  const idQuery = url.searchParams.get('id') || ''
  logger('[get-identities-by-ids] idQuery', idQuery)
  const idQueryArray = idQuery.split(',')

  const result: IdentityPresenter[] = []
  for (const id of idQueryArray) {
    await IdentitiesService.getIdentityById({
      id,
    }).then((response) => result.push(response))
  }
  logger('[get-identities-by-ids route] identityResponse:', result)
  return json(result ?? [])
}
