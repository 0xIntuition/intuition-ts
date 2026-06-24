[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchCreateAtomsFromThings

# Function: batchCreateAtomsFromThings()

## Call Signature

> **batchCreateAtomsFromThings**(`config`, `data`, `depositAmount?`): `Promise`\<[`BatchCreateAtomsFromThingsResult`](../type-aliases/BatchCreateAtomsFromThingsResult.md)\>

Defined in: [packages/sdk/src/core/batch-create-atoms-from-things.ts:32](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/core/batch-create-atoms-from-things.ts#L32)

Pins multiple "things", creates atoms in batch, and returns creation events.

### Parameters

#### config

`WriteConfig`

Contract address and viem clients.

#### data

`Exact`\<\{ `description?`: `InputMaybe`\<`string`\>; `image?`: `InputMaybe`\<`string`\>; `name`: `string`; `url?`: `InputMaybe`\<`string`\>; \}\>[]

Array of PinThing mutation variables.

#### depositAmount?

`bigint`

Optional additional deposit amount per atom.

### Returns

`Promise`\<[`BatchCreateAtomsFromThingsResult`](../type-aliases/BatchCreateAtomsFromThingsResult.md)\>

Created atom URIs, transaction hash, and decoded event args.

## Call Signature

> **batchCreateAtomsFromThings**(`config`, `data`, `options?`): `Promise`\<[`BatchCreateAtomsFromThingsResult`](../type-aliases/BatchCreateAtomsFromThingsResult.md)\>

Defined in: [packages/sdk/src/core/batch-create-atoms-from-things.ts:44](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/core/batch-create-atoms-from-things.ts#L44)

Pins multiple "things", creates atoms in batch, and returns creation events.

### Parameters

#### config

`WriteConfig`

Contract address and viem clients.

#### data

`Exact`\<\{ `description?`: `InputMaybe`\<`string`\>; `image?`: `InputMaybe`\<`string`\>; `name`: `string`; `url?`: `InputMaybe`\<`string`\>; \}\>[]

Array of PinThing mutation variables.

#### options?

[`BatchCreateAtomsFromThingsOptions`](../type-aliases/BatchCreateAtomsFromThingsOptions.md)

Optional additional deposit amount per atom and pinning options.

### Returns

`Promise`\<[`BatchCreateAtomsFromThingsResult`](../type-aliases/BatchCreateAtomsFromThingsResult.md)\>

Created atom URIs, transaction hash, and decoded event args.
