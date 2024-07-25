import { NO_WALLET_ERROR } from 'constants'

import { IdentitiesService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

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
