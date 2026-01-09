[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchCreateAtomsFromThings

# Function: batchCreateAtomsFromThings()

> **batchCreateAtomsFromThings**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `string`[]; \}\>

Defined in: [packages/sdk/src/core/batch-create-atoms-from-things.ts:20](https://github.com/0xIntuition/intuition-ts/blob/main/packages/sdk/src/core/batch-create-atoms-from-things.ts#L20)

Pins multiple "things" to IPFS via Pinata, creates atoms in batch, and returns creation events.

## Parameters

### config

`CreateAtomConfigWithIpfs`

Contract address, viem clients, and Pinata API JWT.

**Type**: `WriteConfig & { pinataApiJWT: string }`

### data

`Exact`\<\{ \}\>[]

Array of PinThing mutation variables.

### depositAmount?

`bigint`

Optional additional deposit amount per atom.

## Returns

`Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `string`[]; \}\>

Created atom URIs, transaction hash, and decoded event args.
