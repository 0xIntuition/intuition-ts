import {
  fetcher,
  SemanticSearchDocument,
  type SemanticSearchQuery,
  type SemanticSearchQueryVariables,
} from '@0xintuition/graphql'

export interface SemanticSearchOptions {
  limit: number
}

/**
 * Runs a semantic search query against the GraphQL API.
 * @param query Query string for semantic search.
 * @param options Search options such as result limit.
 * @returns GraphQL semantic search response data or null on error.
 */
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
