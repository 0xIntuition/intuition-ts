[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultDepositBatchEncode

# Function: multiVaultDepositBatchEncode()

> **multiVaultDepositBatchEncode**(`receiver`, `termId`, `curveId`, `assets`, `minShares`): `` `0x${string}` ``

Defined in: [packages/protocol/src/core/multivault/deposit-batch-encode.ts:14](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/deposit-batch-encode.ts#L14)

Encodes calldata for the MultiVault `depositBatch` function.

## Parameters

### receiver

`` `0x${string}` ``

Address that will receive the shares.

### termId

`` `0x${string}` ``[]

Term IDs to deposit into.

### curveId

`bigint`[]

Bonding curve IDs for each deposit.

### assets

`bigint`[]

Asset amounts to deposit per term.

### minShares

`bigint`[]

Minimum shares to accept per term.

## Returns

`` `0x${string}` ``

Hex-encoded calldata for `depositBatch`.
