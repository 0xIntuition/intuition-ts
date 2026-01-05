[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetVaultType

# Function: multiVaultGetVaultType()

> **multiVaultGetVaultType**(`config`, `inputs`): `Promise`\<`number`\>

Defined in: [packages/protocol/src/core/multivault/get-vault-type.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-vault-type.ts#L12)

Reads the vault type for a given term from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the vault type lookup.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<`number`\>

Vault type as returned by the contract.
