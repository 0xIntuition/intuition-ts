import { IdentitiesService, IdentityPresenter } from '@0xintuition/api'

import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const idQuery = url.searchParams.get('id') || ''
  const idQueryArray = idQuery.split(',')

  const result: IdentityPresenter[] = []
  for (const id of idQueryArray) {
    await IdentitiesService.getIdentityById({
      id,
    }).then((response) => result.push(response))
  }
  return json(result ?? [])
}
