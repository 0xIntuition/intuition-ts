[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingGetSystemUtilizationRatio

# Function: trustBondingGetSystemUtilizationRatio()

> **trustBondingGetSystemUtilizationRatio**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/get-system-utilization-ratio.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/get-system-utilization-ratio.ts#L12)

Reads the system utilization ratio from the TrustBonding contract.

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

System utilization ratio as returned by the contract.
