[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetInverseTripleId

# Function: multiVaultGetInverseTripleId()

> **multiVaultGetInverseTripleId**(`config`, `inputs`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/protocol/src/core/multivault/get-inverse-triple-id.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-inverse-triple-id.ts#L12)

Reads the inverse triple ID for a given triple from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the inverse triple lookup.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<`` `0x${string}` ``\>

Inverse triple ID as returned by the contract.
