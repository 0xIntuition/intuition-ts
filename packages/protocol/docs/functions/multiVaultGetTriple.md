[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetTriple

# Function: multiVaultGetTriple()

> **multiVaultGetTriple**(`config`, `inputs`): `Promise`\<readonly \[`` `0x${string}` ``, `` `0x${string}` ``, `` `0x${string}` ``\]\>

Defined in: [packages/protocol/src/core/multivault/get-triple.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-triple.ts#L12)

Reads a triple struct from the MultiVault `getTriple` view function.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the triple lookup.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<readonly \[`` `0x${string}` ``, `` `0x${string}` ``, `` `0x${string}` ``\]\>

Contract response for the triple.
