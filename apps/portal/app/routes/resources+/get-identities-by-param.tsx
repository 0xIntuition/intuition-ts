import {
  Atoms_Order_By,
  fetcher,
  GetAtomsDocument,
  GetAtomsQuery,
  GetAtomsQueryVariables,
  Order_By,
} from '@0xintuition/graphql'

import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getUserWallet } from '@server/auth'
import { QueryClient } from '@tanstack/react-query'
import { NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await getUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') ?? '20', 10)
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10)
  const sortBy = url.searchParams.get('sortBy') ?? 'AssetsSum'
  const direction = url.searchParams.get('direction') ?? 'desc'

  // Convert legacy sortBy values to GraphQL orderBy format
  const getOrderBy = (): Atoms_Order_By[] => {
    // Convert direction to GraphQL order_by enum value
    const orderDirection: Order_By =
      direction.toLowerCase() === 'desc' ? 'desc' : 'asc'

    switch (sortBy) {
      case 'AssetsSum':
        return [{ vault: { total_shares: orderDirection } }]
      case 'UpdatedAt':
        return [{ block_timestamp: orderDirection }]
      case 'CreatedAt':
        return [{ block_timestamp: orderDirection }]
      case 'UserAssets':
        return [{ vault: { position_count: orderDirection } }]
      default:
        return [{ vault: { total_shares: orderDirection } }]
    }
  }

  const queryClient = new QueryClient()

  // Fetch identities using GraphQL
  const identitiesResponse = await queryClient.fetchQuery({
    queryKey: ['get-identities', { limit, offset, orderBy: getOrderBy() }],
    queryFn: () =>
      fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {
        limit,
        offset,
        orderBy: getOrderBy(),
      })(),
  })

  return json({
    identities: identitiesResponse.atoms || [],
    total: identitiesResponse.total?.aggregate?.count || 0,
  })
}
