[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetVault

# Function: multiVaultGetVault()

> **multiVaultGetVault**(`config`, `inputs`): `Promise`\<readonly \[`bigint`, `bigint`\]\>

Defined in: [packages/protocol/src/core/multivault/get-vault.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-vault.ts#L12)

Reads a vault struct from the MultiVault `getVault` view function.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the vault lookup.

#### args

readonly \[`` `0x${string}` ``, `bigint`\]

## Returns

`Promise`\<readonly \[`bigint`, `bigint`\]\>

Contract response for the vault.
