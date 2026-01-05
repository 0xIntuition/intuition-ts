[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultRedeemEncode

# Function: multiVaultRedeemEncode()

> **multiVaultRedeemEncode**(`receiver`, `termId`, `curveId`, `shares`, `minAssets`): `` `0x${string}` ``

Defined in: [packages/protocol/src/core/multivault/redeem-encode.ts:14](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/redeem-encode.ts#L14)

Encodes calldata for the MultiVault `redeem` function.

## Parameters

### receiver

`` `0x${string}` ``

Address that will receive the assets.

### termId

`` `0x${string}` ``

Term ID to redeem from.

### curveId

`bigint`

Bonding curve ID for the redemption.

### shares

`bigint`

Shares to redeem.

### minAssets

`bigint`

Minimum assets to accept.

## Returns

`` `0x${string}` ``

Hex-encoded calldata for `redeem`.
