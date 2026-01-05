[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingEpochsPerYear

# Function: trustBondingEpochsPerYear()

> **trustBondingEpochsPerYear**(`config`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/epochs-per-year.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/epochs-per-year.ts#L9)

Reads the number of epochs per year from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

## Returns

`Promise`\<`bigint`\>

Epochs per year as returned by the contract.
