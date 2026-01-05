[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultIsTermCreated

# Function: multiVaultIsTermCreated()

> **multiVaultIsTermCreated**(`config`, `inputs`): `Promise`\<`boolean`\>

Defined in: [packages/protocol/src/core/multivault/is-term-created.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/is-term-created.ts#L12)

Checks whether a term has been created in the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the check.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<`boolean`\>

True if the term exists, as returned by the contract.
