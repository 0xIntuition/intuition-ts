[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultRedeemBatchEncode

# Function: multiVaultRedeemBatchEncode()

> **multiVaultRedeemBatchEncode**(`receiver`, `termId`, `curveId`, `shares`, `minAssets`): `` `0x${string}` ``

Defined in: [packages/protocol/src/core/multivault/redeem-batch-encode.ts:14](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/redeem-batch-encode.ts#L14)

Encodes calldata for the MultiVault `redeemBatch` function.

## Parameters

### receiver

`` `0x${string}` ``

Address that will receive the assets.

### termId

`` `0x${string}` ``[]

Term IDs to redeem from.

### curveId

`bigint`[]

Bonding curve IDs for each redemption.

### shares

`bigint`[]

Shares to redeem per term.

### minAssets

`bigint`[]

Minimum assets to accept per term.

## Returns

`` `0x${string}` ``

Hex-encoded calldata for `redeemBatch`.
