[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingEmissionsForEpoch

# Function: trustBondingEmissionsForEpoch()

> **trustBondingEmissionsForEpoch**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/emissions-for-epoch.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/emissions-for-epoch.ts#L12)

Reads emissions for a specific epoch from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the emissions query.

#### args

readonly \[`bigint`\]

## Returns

`Promise`\<`bigint`\>

Emissions data as returned by the contract.
