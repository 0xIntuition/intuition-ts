import {
  fetcher,
  GetTripleDocument,
  type GetTripleQuery,
  type GetTripleQueryVariables,
} from '@0xintuition/graphql'

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
