[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / pinThing

# Function: pinThing()

> **⚠️ DEPRECATED**: This function is deprecated. Use `uploadJsonToPinata` from the SDK instead. The SDK now supports direct Pinata uploads without requiring backend mediation. See `createAtomFromThing` and `batchCreateAtomsFromThings` for updated implementations.

> **pinThing**(`variables`): `Promise`\<`string` \| `null`\>

Defined in: [packages/sdk/src/api/pin-thing.ts:16](https://github.com/0xIntuition/intuition-ts/blob/main/packages/sdk/src/api/pin-thing.ts#L16)

Pins a "thing" via the GraphQL API and returns the resulting URI (deprecated, backend-mediated).

## Parameters

### variables

`PinThingMutationVariables`

PinThing mutation variables.

## Returns

`Promise`\<`string` \| `null`\>

IPFS URI string or null if pinning fails.
