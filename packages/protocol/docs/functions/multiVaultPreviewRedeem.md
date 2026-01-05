[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultPreviewRedeem

# Function: multiVaultPreviewRedeem()

> **multiVaultPreviewRedeem**(`config`, `inputs`): `Promise`\<readonly \[`bigint`, `bigint`\]\>

Defined in: [packages/protocol/src/core/multivault/preview-redeem.ts:16](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/preview-redeem.ts#L16)

Previews the result of a redeem using the MultiVault `previewRedeem` view.

## Parameters

### config

[`WriteConfig`](../type-aliases/WriteConfig.md)

Contract address and viem clients (account used for simulation).

### inputs

[`PreviewRedeemCurveInputs`](../type-aliases/PreviewRedeemCurveInputs.md)

Function args for the preview call.

## Returns

`Promise`\<readonly \[`bigint`, `bigint`\]\>

Previewed assets and fees as returned by the contract.
