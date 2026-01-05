[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / findTripleIds

# Function: findTripleIds()

> **findTripleIds**(`address`, `triplesWithAtomIds`): `Promise`\<[`TripleWithIds`](../type-aliases/TripleWithIds.md)[]\>

Defined in: [packages/sdk/src/experimental/utils.ts:226](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/experimental/utils.ts#L226)

Resolves triple IDs for subject/predicate/object atom IDs, batching when needed.

## Parameters

### address

`` `0x${string}` ``

Wallet address used for the triples query.

### triplesWithAtomIds

`string`[][]

Triples expressed as subject/predicate/object IDs.

## Returns

`Promise`\<[`TripleWithIds`](../type-aliases/TripleWithIds.md)[]\>

List of triples with IDs and position data.
