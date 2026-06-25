[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / findTripleIds

# Function: findTripleIds()

> **findTripleIds**(`address`, `triplesWithAtomIds`): `Promise`\<[`TripleWithIds`](../type-aliases/TripleWithIds.md)[]\>

Defined in: [packages/sdk/src/experimental/utils.ts:226](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/experimental/utils.ts#L226)

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
