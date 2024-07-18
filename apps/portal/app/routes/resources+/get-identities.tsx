import { IdentitiesService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { setupApiWithWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  await setupApiWithWallet(request)

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
