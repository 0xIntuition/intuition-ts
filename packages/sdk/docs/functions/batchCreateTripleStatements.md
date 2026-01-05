[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchCreateTripleStatements

# Function: batchCreateTripleStatements()

> **batchCreateTripleStatements**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; \}\>

Defined in: [packages/sdk/src/core/batch-create-triple-statements.ts:16](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/core/batch-create-triple-statements.ts#L16)

Creates triples in batch and returns parsed TripleCreated events.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

readonly \[readonly `` `0x${string}` ``[], readonly `` `0x${string}` ``[], readonly `` `0x${string}` ``[], readonly `bigint`[]\]

CreateTriples arguments for the MultiVault contract.

### depositAmount?

`bigint`

Optional additional deposit amount.

## Returns

`Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; \}\>

Transaction hash and decoded event args.
