import {
  fetcher,
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
} from '@0xintuition/graphql'

export async function getAtom(atomId: string) {
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
