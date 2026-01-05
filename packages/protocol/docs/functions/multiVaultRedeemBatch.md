[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultRedeemBatch

# Function: multiVaultRedeemBatch()

> **multiVaultRedeemBatch**(`config`, `inputs`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/protocol/src/core/multivault/redeem-batch.ts:16](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/redeem-batch.ts#L16)

Simulates and submits a MultiVault `redeemBatch` transaction.

## Parameters

### config

[`WriteConfig`](../type-aliases/WriteConfig.md)

Contract address and viem clients.

### inputs

[`RedeemBatchInputs`](../type-aliases/RedeemBatchInputs.md)

Function args for batch redeeming shares.

## Returns

`Promise`\<`` `0x${string}` ``\>

Transaction hash from the wallet client.
