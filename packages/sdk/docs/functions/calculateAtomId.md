[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / calculateAtomId

# Function: calculateAtomId()

> **calculateAtomId**(`atomData`): `` `0x${string}` ``

Defined in: [packages/sdk/src/utils/calculate-atom-id.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/utils/calculate-atom-id.ts#L9)

Computes an atom ID by hashing the atom data with the ATOM_SALT.

## Parameters

### atomData

`` `0x${string}` ``

Raw atom data as hex.

## Returns

`` `0x${string}` ``

Keccak256 hash representing the atom ID.
