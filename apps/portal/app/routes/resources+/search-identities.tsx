import { IdentitiesService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { setupApiWithWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  await setupApiWithWallet(request)

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
