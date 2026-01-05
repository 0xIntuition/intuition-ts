[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultConvertToAssets

# Function: multiVaultConvertToAssets()

> **multiVaultConvertToAssets**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/multivault/convert-to-assets.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/convert-to-assets.ts#L12)

Converts shares to assets using the MultiVault `convertToAssets` view.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the conversion.

#### args

readonly \[`` `0x${string}` ``, `bigint`, `bigint`\]

## Returns

`Promise`\<`bigint`\>

Assets amount as returned by the contract.
