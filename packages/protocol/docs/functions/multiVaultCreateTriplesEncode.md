[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultCreateTriplesEncode

# Function: multiVaultCreateTriplesEncode()

> **multiVaultCreateTriplesEncode**(`subjectIds`, `predicateIds`, `objectIds`, `assets`): `` `0x${string}` ``

Defined in: [packages/protocol/src/core/multivault/create-triples-encode.ts:13](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/create-triples-encode.ts#L13)

Encodes calldata for the MultiVault `createTriples` function.

## Parameters

### subjectIds

`` `0x${string}` ``[]

Subject atom IDs.

### predicateIds

`` `0x${string}` ``[]

Predicate atom IDs.

### objectIds

`` `0x${string}` ``[]

Object atom IDs.

### assets

`bigint`[]

Asset amounts to deposit for each triple.

## Returns

`` `0x${string}` ``

Hex-encoded calldata for `createTriples`.
