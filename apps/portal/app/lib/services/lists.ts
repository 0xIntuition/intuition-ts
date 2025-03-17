import {
  fetcher,
  GetListsDocument,
  GetListsQuery,
  GetListsQueryVariables,
} from '@0xintuition/graphql'

import { getSpecialPredicate } from '@lib/utils/app'
import { QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV } from 'app/consts'

export async function getFeaturedLists({
  listIds,
  queryClient,
}: {
  request: Request
  listIds: number[]
  queryClient: QueryClient
}) {
  const listsWhere = {
    _and: [
      {
        predicate_id: {
          _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      },
      {
        object: {
          id: { _in: listIds },
        },
      },
    ],
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-featured-lists', { listsWhere }],
    queryFn: () =>
      fetcher<GetListsQuery, GetListsQueryVariables>(GetListsDocument, {
        where: listsWhere,
      })(),
  })

  return {
    initialParams: {
      listsWhere,
    },
  }
}
