import { IdentitiesService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchQuery = url.searchParams.get('search') || ''
  logger('[search-identities] searchQuery', searchQuery)
  const response = await IdentitiesService.searchIdentity({
    displayName: searchQuery,
  })
  const data = response.data
  if (data) {
    logger('data', data)
    logger('search data length', data.length, searchQuery)
  }

  return json(data ?? [])
}
