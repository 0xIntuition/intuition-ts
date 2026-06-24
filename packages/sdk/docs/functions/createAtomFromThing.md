[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / createAtomFromThing

# Function: createAtomFromThing()

## Call Signature

> **createAtomFromThing**(`config`, `data`, `depositAmount?`): `Promise`\<[`CreateAtomFromThingResult`](../type-aliases/CreateAtomFromThingResult.md)\>

Defined in: [packages/sdk/src/core/create-atom-from-thing.ts:30](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/core/create-atom-from-thing.ts#L30)

Pins a "thing" to IPFS, creates an atom on-chain, and returns the event state.

### Parameters

#### config

`WriteConfig`

Contract address and viem clients.

#### data

`PinThingMutationVariables`

PinThing mutation variables used to build the IPFS payload.

#### depositAmount?

`bigint`

Optional additional deposit amount.

### Returns

`Promise`\<[`CreateAtomFromThingResult`](../type-aliases/CreateAtomFromThingResult.md)\>

Created atom URI, transaction hash, and decoded event args.

## Call Signature

> **createAtomFromThing**(`config`, `data`, `options?`): `Promise`\<[`CreateAtomFromThingResult`](../type-aliases/CreateAtomFromThingResult.md)\>

Defined in: [packages/sdk/src/core/create-atom-from-thing.ts:42](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/core/create-atom-from-thing.ts#L42)

Pins a "thing" to IPFS, creates an atom on-chain, and returns the event state.

### Parameters

#### config

`WriteConfig`

Contract address and viem clients.

#### data

`PinThingMutationVariables`

PinThing mutation variables used to build the IPFS payload.

#### options?

[`CreateAtomFromThingOptions`](../type-aliases/CreateAtomFromThingOptions.md)

Optional additional deposit amount and pinning options.

### Returns

`Promise`\<[`CreateAtomFromThingResult`](../type-aliases/CreateAtomFromThingResult.md)\>

Created atom URI, transaction hash, and decoded event args.
