[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / calculateTripleId

# Function: calculateTripleId()

> **calculateTripleId**(`subjectAtomData`, `predicateAtomData`, `objectAtomData`): `` `0x${string}` ``

Defined in: [packages/sdk/src/utils/calculate-triple-id.ts:11](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/utils/calculate-triple-id.ts#L11)

Computes a triple ID by hashing subject, predicate, and object atom IDs with TRIPLE_SALT.

## Parameters

### subjectAtomData

`` `0x${string}` ``

Subject atom ID.

### predicateAtomData

`` `0x${string}` ``

Predicate atom ID.

### objectAtomData

`` `0x${string}` ``

Object atom ID.

## Returns

`` `0x${string}` ``

Keccak256 hash representing the triple ID.
