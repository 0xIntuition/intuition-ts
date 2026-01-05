[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetAtom

# Function: multiVaultGetAtom()

> **multiVaultGetAtom**(`config`, `inputs`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/protocol/src/core/multivault/get-atom.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-atom.ts#L12)

Reads an atom struct from the MultiVault `getAtom` view function.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the atom lookup.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<`` `0x${string}` ``\>

Contract response for the atom.
