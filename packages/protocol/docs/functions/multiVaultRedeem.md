[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultRedeem

# Function: multiVaultRedeem()

> **multiVaultRedeem**(`config`, `inputs`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/protocol/src/core/multivault/redeem.ts:26](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/redeem.ts#L26)

Simulates and submits a MultiVault `redeem` transaction.

## Parameters

### config

[`RedeemConfig`](../type-aliases/RedeemConfig.md)

Contract address and viem clients.

### inputs

[`RedeemInputs`](../type-aliases/RedeemInputs.md)

Function args for redeeming shares.

## Returns

`Promise`\<`` `0x${string}` ``\>

Transaction hash from the wallet client.
