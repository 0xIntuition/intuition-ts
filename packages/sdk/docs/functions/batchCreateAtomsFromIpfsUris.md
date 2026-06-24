[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchCreateAtomsFromIpfsUris

# Function: batchCreateAtomsFromIpfsUris()

> **batchCreateAtomsFromIpfsUris**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `string`[]; \}\>

Defined in: [packages/sdk/src/core/batch-create-atoms-from-ipfs-uris.ts:17](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/core/batch-create-atoms-from-ipfs-uris.ts#L17)

Creates atoms in batch from IPFS URIs and returns creation events.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

`string`[]

Array of IPFS URIs.

### depositAmount?

`bigint`

Optional additional deposit amount per atom.

## Returns

`Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `string`[]; \}\>

Created atom URIs, transaction hash, and decoded event args.
