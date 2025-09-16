import {
  fetcher,
  GlobalSearchDocument,
  type GlobalSearchQuery,
  type GlobalSearchQueryVariables,
} from '@0xintuition/graphql'

export interface GlobalSearchOptions {
  atomsLimit?: number
  accountsLimit?: number
  triplesLimit?: number
  collectionsLimit?: number
}

export async function globalSearch(
  query: string,
  {
    atomsLimit = 5,
    accountsLimit = 5,
    triplesLimit = 5,
    collectionsLimit = 5,
  }: GlobalSearchOptions,
) {
  try {
    const data = await fetcher<GlobalSearchQuery, GlobalSearchQueryVariables>(
      GlobalSearchDocument,
      {
        likeStr: query,
        atomsLimit,
        accountsLimit,
        triplesLimit,
        collectionsLimit,
      },
    )()

    return data
  } catch (error) {
    console.error('Error fetching atom:', error)
    return null
  }
}
