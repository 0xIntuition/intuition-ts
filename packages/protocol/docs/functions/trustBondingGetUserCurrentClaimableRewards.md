[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingGetUserCurrentClaimableRewards

# Function: trustBondingGetUserCurrentClaimableRewards()

> **trustBondingGetUserCurrentClaimableRewards**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/get-user-current-claimable-rewards.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/get-user-current-claimable-rewards.ts#L12)

Reads the user's current claimable rewards from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the rewards query.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<`bigint`\>

Claimable rewards as returned by the contract.
