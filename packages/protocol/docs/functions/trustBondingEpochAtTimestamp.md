[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingEpochAtTimestamp

# Function: trustBondingEpochAtTimestamp()

> **trustBondingEpochAtTimestamp**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/epoch-at-timestamp.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/epoch-at-timestamp.ts#L12)

Reads the epoch index for a given timestamp from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the timestamp lookup.

#### args

readonly \[`bigint`\]

## Returns

`Promise`\<`bigint`\>

Epoch index as returned by the contract.
