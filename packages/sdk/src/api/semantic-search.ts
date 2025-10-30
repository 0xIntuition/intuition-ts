import {
  fetcher,
  SemanticSearchDocument,
  type SemanticSearchQuery,
  type SemanticSearchQueryVariables,
} from '@0xintuition/graphql'

export interface SemanticSearchOptions {
  limit: number
}

export async function semanticSearch(
  query: string,
  { limit = 3 }: SemanticSearchOptions,
) {
  try {
    const data = await fetcher<
      SemanticSearchQuery,
      SemanticSearchQueryVariables
    >(SemanticSearchDocument, {
      query,
      limit,
    })()

    return data
  } catch (error) {
    console.error('Error fetching atom:', error)
    return null
  }
}
