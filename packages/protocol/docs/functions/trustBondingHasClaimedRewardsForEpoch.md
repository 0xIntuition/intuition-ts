[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingHasClaimedRewardsForEpoch

# Function: trustBondingHasClaimedRewardsForEpoch()

> **trustBondingHasClaimedRewardsForEpoch**(`config`, `inputs`): `Promise`\<`boolean`\>

Defined in: [packages/protocol/src/core/trustbonding/has-claimed-rewards-for-epoch.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/has-claimed-rewards-for-epoch.ts#L12)

Checks whether a user has claimed rewards for a given epoch.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the claim check.

#### args

readonly \[`` `0x${string}` ``, `bigint`\]

## Returns

`Promise`\<`boolean`\>

True if rewards have been claimed, as returned by the contract.
