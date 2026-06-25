[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchCreateTripleStatements

# Function: batchCreateTripleStatements()

> **batchCreateTripleStatements**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; \}\>

Defined in: [packages/sdk/src/core/batch-create-triple-statements.ts:16](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/core/batch-create-triple-statements.ts#L16)

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
