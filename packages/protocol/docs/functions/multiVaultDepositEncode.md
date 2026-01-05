[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultDepositEncode

# Function: multiVaultDepositEncode()

> **multiVaultDepositEncode**(`receiver`, `termId`, `curveId`, `minShares`): `` `0x${string}` ``

Defined in: [packages/protocol/src/core/multivault/deposit-encode.ts:13](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/deposit-encode.ts#L13)

Encodes calldata for the MultiVault `deposit` function.

## Parameters

### receiver

`` `0x${string}` ``

Address that will receive the shares.

### termId

`` `0x${string}` ``

Term ID to deposit into.

### curveId

`bigint`

Bonding curve ID for the deposit.

### minShares

`bigint`

Minimum shares to accept.

## Returns

`` `0x${string}` ``

Hex-encoded calldata for `deposit`.
