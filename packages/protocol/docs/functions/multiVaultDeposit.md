[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultDeposit

# Function: multiVaultDeposit()

> **multiVaultDeposit**(`config`, `inputs`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/protocol/src/core/multivault/deposit.ts:17](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/deposit.ts#L17)

Simulates and submits a MultiVault `deposit` transaction.

## Parameters

### config

[`WriteConfig`](../type-aliases/WriteConfig.md)

Contract address and viem clients.

### inputs

[`DepositInputs`](../type-aliases/DepositInputs.md)

Function args and optional call value.

## Returns

`Promise`\<`` `0x${string}` ``\>

Transaction hash from the wallet client.
