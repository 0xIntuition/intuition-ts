[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultPreviewAtomCreate

# Function: multiVaultPreviewAtomCreate()

> **multiVaultPreviewAtomCreate**(`config`, `inputs`): `Promise`\<readonly \[`bigint`, `bigint`, `bigint`\]\>

Defined in: [packages/protocol/src/core/multivault/preview-atom-create.ts:16](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/preview-atom-create.ts#L16)

Previews atom creation costs using the MultiVault `previewAtomCreate` view.

## Parameters

### config

[`WriteConfig`](../type-aliases/WriteConfig.md)

Contract address and viem clients (account used for simulation).

### inputs

[`PreviewAtomCreateInputs`](../type-aliases/PreviewAtomCreateInputs.md)

Function args for the preview call.

## Returns

`Promise`\<readonly \[`bigint`, `bigint`, `bigint`\]\>

Previewed costs as returned by the contract.
