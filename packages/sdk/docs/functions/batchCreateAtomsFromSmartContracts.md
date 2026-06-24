[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchCreateAtomsFromSmartContracts

# Function: batchCreateAtomsFromSmartContracts()

> **batchCreateAtomsFromSmartContracts**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `` `0x${string}` ``[]; \}\>

Defined in: [packages/sdk/src/core/batch-create-atoms-from-smart-contracts.ts:17](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/core/batch-create-atoms-from-smart-contracts.ts#L17)

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
