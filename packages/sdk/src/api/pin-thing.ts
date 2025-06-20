import {
  fetcher,
  PinThingDocument,
  PinThingMutation,
  PinThingMutationVariables,
} from '@0xintuition/graphql'

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
