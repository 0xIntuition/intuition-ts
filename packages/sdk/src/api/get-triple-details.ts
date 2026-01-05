import {
  fetcher,
  GetTripleDocument,
  type GetTripleQuery,
  type GetTripleQueryVariables,
} from '@0xintuition/graphql'

/**
 * Fetches triple details from the GraphQL API by triple ID.
 * @param id Triple ID to look up.
 * @returns Triple details or null if not found or on error.
 */
export async function getTripleDetails(id: string) {
  try {
    const data = await fetcher<GetTripleQuery, GetTripleQueryVariables>(
      GetTripleDocument,
      {
        tripleId: id,
      },
    )()

    if (data?.triple) {
      return data.triple
    }

    return null
  } catch (error) {
    console.error('Error fetching triple:', error)
    return null
  }
}
