import { IdentitiesService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  logger('url searchParams', url.searchParams)
  const searchQuery = url.searchParams.get('tagIds') || ''
  logger('[search-identities] searchQuery', searchQuery)
  const response = await IdentitiesService.searchIdentity({
    hasTag: searchQuery,
  })
  const data = response.data
  if (data) {
    logger('[search-identities-by-tags] data', data)
    logger('s[search-identities-by-tags] data length', data.length, searchQuery)
  }

  return json(data ?? [])
}
