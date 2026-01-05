[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchCreateAtomsFromSmartContracts

# Function: batchCreateAtomsFromSmartContracts()

> **batchCreateAtomsFromSmartContracts**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `` `0x${string}` ``[]; \}\>

Defined in: [packages/sdk/src/core/batch-create-atoms-from-smart-contracts.ts:17](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/core/batch-create-atoms-from-smart-contracts.ts#L17)

Creates atoms in batch for smart contracts (CAIP-10) and returns events.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

`object`[]

Array of smart contract addresses with chain IDs.

### depositAmount?

`bigint`

Optional additional deposit amount per atom.

## Returns

`Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `` `0x${string}` ``[]; \}\>

Hex-encoded CAIP-10 references, transaction hash, and decoded event args.
