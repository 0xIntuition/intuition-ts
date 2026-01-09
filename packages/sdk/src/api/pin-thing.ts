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
 * @deprecated This function is deprecated. Use `uploadJsonToPinata` from the SDK instead.
 * The SDK now supports direct Pinata uploads without requiring backend mediation.
 * See `createAtomFromThing` and `batchCreateAtomsFromThings` for updated implementations.
 */
export async function pinThing(variables: PinThingMutationVariables) {
  try {
    const data = await fetcher<PinThingMutation, PinThingMutationVariables>(
      PinThingDocument,
      variables,
    )()
    if (data.pinThing?.uri) {
      return data.pinThing?.uri
    }

    return null
  } catch (error) {
    console.error('Error fetching triple:', error)
    return null
  }
}
