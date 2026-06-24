import { executeGraphQLRequest } from './client'
import {
  PinThingDocument,
  type PinThingMutation,
  type PinThingMutationVariables,
} from './generated'

export type PinThingRequestOptions = {
  pinApiKey?: string
  pinApiUrl?: string
}

export async function requestPinThing(
  variables: PinThingMutationVariables,
  options?: PinThingRequestOptions,
): Promise<string> {
  const data = await executeGraphQLRequest<
    PinThingMutation,
    PinThingMutationVariables
  >(PinThingDocument, variables, undefined, options)

  const uri = data.pinThing?.uri
  if (!uri) {
    throw new Error('pinThing returned no URI')
  }

  return uri
}
