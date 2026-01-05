[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / sync

# Function: sync()

> **sync**(`config`, `data`): `Promise`\<`boolean` \| [`CostEstimation`](../interfaces/CostEstimation.md)\>

Defined in: [packages/sdk/src/experimental/utils.ts:384](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/experimental/utils.ts#L384)

Synchronizes data into atoms/triples and ensures deposits for missing positions.

## Parameters

### config

[`SyncConfig`](../interfaces/SyncConfig.md)

Sync configuration including clients, logging, and batch options.

### data

`Record`\<`string`, `Record`\<`string`, `string` \| `string`[]\>\>

Subject/predicate/object data to sync.

## Returns

`Promise`\<`boolean` \| [`CostEstimation`](../interfaces/CostEstimation.md)\>

Cost estimation details; in dry-run mode no transactions are sent.
