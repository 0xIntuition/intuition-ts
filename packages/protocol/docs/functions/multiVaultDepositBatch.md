[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultDepositBatch

# Function: multiVaultDepositBatch()

> **multiVaultDepositBatch**(`config`, `inputs`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/protocol/src/core/multivault/deposit-batch.ts:17](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/deposit-batch.ts#L17)

Simulates and submits a MultiVault `depositBatch` transaction.

## Parameters

### config

[`WriteConfig`](../type-aliases/WriteConfig.md)

Contract address and viem clients.

### inputs

[`DepositBatchInputs`](../type-aliases/DepositBatchInputs.md)

Function args and call value.

## Returns

`Promise`\<`` `0x${string}` ``\>

Transaction hash from the wallet client.
