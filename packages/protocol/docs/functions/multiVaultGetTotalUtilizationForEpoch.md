[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetTotalUtilizationForEpoch

# Function: multiVaultGetTotalUtilizationForEpoch()

> **multiVaultGetTotalUtilizationForEpoch**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/multivault/get-total-utilization-for-epoch.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-total-utilization-for-epoch.ts#L12)

Reads total utilization for an epoch from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the utilization query.

#### args

readonly \[`bigint`\]

## Returns

`Promise`\<`bigint`\>

Utilization data as returned by the contract.
