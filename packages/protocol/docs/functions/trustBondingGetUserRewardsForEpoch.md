[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingGetUserRewardsForEpoch

# Function: trustBondingGetUserRewardsForEpoch()

> **trustBondingGetUserRewardsForEpoch**(`config`, `inputs`): `Promise`\<readonly \[`bigint`, `bigint`\]\>

Defined in: [packages/protocol/src/core/trustbonding/get-user-rewards-for-epoch.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/get-user-rewards-for-epoch.ts#L12)

Reads a user's rewards for a given epoch from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the rewards query.

#### args

readonly \[`` `0x${string}` ``, `bigint`\]

## Returns

`Promise`\<readonly \[`bigint`, `bigint`\]\>

Rewards data as returned by the contract.
