import { IdentitiesService, SortColumn, SortDirection } from '@0xintuition/api'

import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') ?? '1', 10)
  const limit = parseInt(url.searchParams.get('limit') ?? '20', 10)
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10)
  const sortBy = (url.searchParams.get('sortBy') ?? 'AssetsSum') as SortColumn
  const direction = (url.searchParams.get('direction') ??
    'desc') as SortDirection

  const identitiesResponse = await IdentitiesService.getIdentities({
    page,
    limit,
    offset,
    sortBy,
    direction,
  })

  return json({
    identities: identitiesResponse.data,
  })
}
