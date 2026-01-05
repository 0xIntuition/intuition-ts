[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetUserUtilizationForEpoch

# Function: multiVaultGetUserUtilizationForEpoch()

> **multiVaultGetUserUtilizationForEpoch**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/multivault/get-user-utilization-for-epoch.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-user-utilization-for-epoch.ts#L12)

Reads a user's utilization for an epoch from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the utilization query.

#### args

readonly \[`` `0x${string}` ``, `bigint`\]

## Returns

`Promise`\<`bigint`\>

Utilization data as returned by the contract.
