[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / pinThing

# Function: pinThing()

> **pinThing**(`variables`, `options?`): `Promise`\<`string`\>

Defined in: [packages/sdk/src/api/pin-thing.ts:15](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/api/pin-thing.ts#L15)

Pins a "thing" via the public gated Intuition pinning endpoint and returns the resulting URI.

## Parameters

### variables

`PinThingMutationVariables`

PinThing mutation variables.

### options?

`PinThingRequestOptions`

Optional pinning endpoint and API key overrides.

## Returns

`Promise`\<`string`\>

IPFS URI string.
