[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultCreateAtomsEncode

# Function: multiVaultCreateAtomsEncode()

> **multiVaultCreateAtomsEncode**(`data`, `assets`): `` `0x${string}` ``

Defined in: [packages/protocol/src/core/multivault/create-atoms-encode.ts:11](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/create-atoms-encode.ts#L11)

Encodes calldata for the MultiVault `createAtoms` function.

## Parameters

### data

`` `0x${string}` ``[]

Atom data payloads as hex.

### assets

`bigint`[]

Asset amounts to deposit for each atom.

## Returns

`` `0x${string}` ``

Hex-encoded calldata for `createAtoms`.
