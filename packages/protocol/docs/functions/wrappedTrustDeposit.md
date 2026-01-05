[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / wrappedTrustDeposit

# Function: wrappedTrustDeposit()

> **wrappedTrustDeposit**(`config`, `inputs`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/protocol/src/core/wrapped-trust/deposit.ts:16](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/wrapped-trust/deposit.ts#L16)

Simulates and submits a WrappedTrust `deposit` transaction.

## Parameters

### config

[`WriteConfig`](../type-aliases/WriteConfig.md)

Contract address and viem clients.

### inputs

[`WrappedTrustDepositInputs`](../type-aliases/WrappedTrustDepositInputs.md)

Function args for the deposit.

## Returns

`Promise`\<`` `0x${string}` ``\>

Transaction hash from the wallet client.
