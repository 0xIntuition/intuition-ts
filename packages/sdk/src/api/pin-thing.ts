import {
  requestPinThing,
  type PinThingMutationVariables,
  type PinThingRequestOptions,
} from '@0xintuition/graphql'

export type PinThingOptions = PinThingRequestOptions

/**
 * Pins a "thing" via the GraphQL API and returns the resulting URI.
 * @param variables PinThing mutation variables.
 * @param options Optional pinning endpoint and API key overrides.
 * @returns IPFS URI string.
 */
export async function pinThing(
  variables: PinThingMutationVariables,
  options?: PinThingOptions,
): Promise<string> {
  return requestPinThing(variables, options)
}
