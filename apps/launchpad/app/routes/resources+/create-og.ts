import {
  fetcher,
  GetListDetailsDocument,
  GetListDetailsQuery,
  GetListDetailsQueryVariables,
} from '@0xintuition/graphql'

import { formatBalance } from '@lib/utils/misc'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { QueryClient } from '@tanstack/react-query'

import { createOGImage } from '../../.server/og'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { origin, searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  const type = searchParams.get('type') as 'list' | 'identity' | 'claim'
  if (!id || !type) {
    throw new Response('Missing required parameters', { status: 400 })
  }

  const queryClient = new QueryClient()

  let title, holders, tvl, holdersFor, holdersAgainst, tvlFor, tvlAgainst

  if (type === 'list') {
    const listData = (await queryClient.fetchQuery({
      queryKey: ['listDetails', id],
      queryFn: async () => {
        return fetcher<GetListDetailsQuery, GetListDetailsQueryVariables>(
          GetListDetailsDocument,
          {
            tagPredicateId: 3,
            globalWhere: {
              predicate_id: { _eq: 3 },
              object_id: { _eq: 620 },
            },
          },
        )
      },
    })) as GetListDetailsQuery

    if (!listData?.globalTriples?.[0]) {
      throw new Response('List not found', { status: 404 })
    }

    title = listData.globalTriples[0].object.label
    holders =
      listData.globalTriples[0].vault?.positions_aggregate.aggregate?.count
    tvl = +formatBalance(
      BigInt(
        listData.globalTriples[0].vault?.positions_aggregate?.aggregate?.sum
          ?.shares ?? 0,
      ),
      18,
    )
  }

  const png = await createOGImage(
    title ?? 'Intuition Launchpad',
    type,
    origin,
    (holders ?? 0).toString(),
    tvl?.toString(),
    holdersFor,
    holdersAgainst,
    tvlFor,
    tvlAgainst,
  )

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
