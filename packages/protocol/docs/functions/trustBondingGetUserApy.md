[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingGetUserApy

# Function: trustBondingGetUserApy()

> **trustBondingGetUserApy**(`config`, `inputs`): `Promise`\<readonly \[`bigint`, `bigint`\]\>

Defined in: [packages/protocol/src/core/trustbonding/get-user-apy.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/get-user-apy.ts#L12)

Reads the user APY from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the APY query.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<readonly \[`bigint`, `bigint`\]\>

User APY as returned by the contract.
