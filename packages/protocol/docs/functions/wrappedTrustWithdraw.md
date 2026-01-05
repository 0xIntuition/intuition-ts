[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / wrappedTrustWithdraw

# Function: wrappedTrustWithdraw()

> **wrappedTrustWithdraw**(`config`, `inputs`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/protocol/src/core/wrapped-trust/withdraw.ts:16](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/wrapped-trust/withdraw.ts#L16)

Simulates and submits a WrappedTrust `withdraw` transaction.

## Parameters

### config

[`WriteConfig`](../type-aliases/WriteConfig.md)

Contract address and viem clients.

### inputs

[`WrappedTrustWithdrawInputs`](../type-aliases/WrappedTrustWithdrawInputs.md)

Function args for the withdrawal.

## Returns

`Promise`\<`` `0x${string}` ``\>

Transaction hash from the wallet client.
