[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / pinThing

# Function: pinThing()

> **pinThing**(`variables`): `Promise`\<`string` \| `null`\>

Defined in: [packages/sdk/src/api/pin-thing.ts:13](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/api/pin-thing.ts#L13)

Pins a "thing" via the GraphQL API and returns the resulting URI.

## Parameters

### variables

`PinThingMutationVariables`

PinThing mutation variables.

## Returns

`Promise`\<`string` \| `null`\>

IPFS URI string or null if pinning fails.
