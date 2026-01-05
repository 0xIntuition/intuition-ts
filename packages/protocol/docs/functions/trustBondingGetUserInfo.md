[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingGetUserInfo

# Function: trustBondingGetUserInfo()

> **trustBondingGetUserInfo**(`config`, `inputs`): `Promise`\<\{ `bondedBalance`: `bigint`; `eligibleRewards`: `bigint`; `lockedAmount`: `bigint`; `lockEnd`: `bigint`; `maxRewards`: `bigint`; `personalUtilization`: `bigint`; \}\>

Defined in: [packages/protocol/src/core/trustbonding/get-user-info.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/get-user-info.ts#L12)

Reads user info from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the user lookup.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<\{ `bondedBalance`: `bigint`; `eligibleRewards`: `bigint`; `lockedAmount`: `bigint`; `lockEnd`: `bigint`; `maxRewards`: `bigint`; `personalUtilization`: `bigint`; \}\>

User info as returned by the contract.
