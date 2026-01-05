[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultPreviewDeposit

# Function: multiVaultPreviewDeposit()

> **multiVaultPreviewDeposit**(`config`, `inputs`): `Promise`\<readonly \[`bigint`, `bigint`\]\>

Defined in: [packages/protocol/src/core/multivault/preview-deposit.ts:16](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/preview-deposit.ts#L16)

Previews the result of a deposit using the MultiVault `previewDeposit` view.

## Parameters

### config

[`WriteConfig`](../type-aliases/WriteConfig.md)

Contract address and viem clients (account used for simulation).

### inputs

[`PreviewDepositCurveInputs`](../type-aliases/PreviewDepositCurveInputs.md)

Function args for the preview call.

## Returns

`Promise`\<readonly \[`bigint`, `bigint`\]\>

Previewed shares and fees as returned by the contract.
