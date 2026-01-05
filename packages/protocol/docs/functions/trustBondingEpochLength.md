[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingEpochLength

# Function: trustBondingEpochLength()

> **trustBondingEpochLength**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/epoch-length.ts:11](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/epoch-length.ts#L11)

Reads the epoch length from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

#### args

readonly \[\]

## Returns

`Promise`\<`bigint`\>

Epoch length as returned by the contract.
