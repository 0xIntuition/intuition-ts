import {
  fetcher,
  PinThingDocument,
  type PinThingMutation,
  type PinThingMutationVariables,
} from '@0xintuition/graphql'

/**
 * Pins a "thing" via the GraphQL API and returns the resulting URI.
 * @param variables PinThing mutation variables.
 * @returns IPFS URI string or null if pinning fails.
 */
export async function pinThing(variables: PinThingMutationVariables) {
  try {
    const data = await fetcher<PinThingMutation, PinThingMutationVariables>(
      PinThingDocument,
      variables,
    )()
    data.pinThing?.uri
    if (data.pinThing?.uri) {
      return data.pinThing?.uri
    }

    return null
  } catch (error) {
    console.error('Error fetching triple:', error)
    return null
  }
}
