[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingEpochTimestampEnd

# Function: trustBondingEpochTimestampEnd()

> **trustBondingEpochTimestampEnd**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/epoch-timestamp-end.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/epoch-timestamp-end.ts#L12)

Reads the end timestamp for a given epoch from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the epoch query.

#### args

readonly \[`bigint`\]

## Returns

`Promise`\<`bigint`\>

Epoch end timestamp as returned by the contract.
