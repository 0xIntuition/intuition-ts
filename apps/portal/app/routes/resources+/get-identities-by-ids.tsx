import { IdentitiesService, IdentityPresenter } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { setupApiWithWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  await setupApiWithWallet(request)

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
