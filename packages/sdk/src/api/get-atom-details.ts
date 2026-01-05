import {
  fetcher,
  GetAtomDocument,
  type GetAtomQuery,
  type GetAtomQueryVariables,
} from '@0xintuition/graphql'

/**
 * Fetches atom details from the GraphQL API by atom ID.
 * @param atomId Atom ID to look up.
 * @returns Atom details or null if not found or on error.
 */
export async function getAtomDetails(atomId: string) {
  try {
    const data = await fetcher<GetAtomQuery, GetAtomQueryVariables>(
      GetAtomDocument,
      {
        id: atomId,
      },
    )()

    if (data?.atom) {
      return data.atom
    }

    return null
  } catch (error) {
    console.error('Error fetching atom:', error)
    return null
  }
}
