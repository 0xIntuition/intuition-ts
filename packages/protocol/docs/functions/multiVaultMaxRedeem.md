[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultMaxRedeem

# Function: multiVaultMaxRedeem()

> **multiVaultMaxRedeem**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/multivault/max-redeem.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/max-redeem.ts#L12)

Reads the maximum redeemable shares for a user and term from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the max redeem query.

#### args

readonly \[`` `0x${string}` ``, `` `0x${string}` ``, `bigint`\]

## Returns

`Promise`\<`bigint`\>

Maximum redeemable shares as returned by the contract.
