[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingTotalBondedBalanceAtEpochEnd

# Function: trustBondingTotalBondedBalanceAtEpochEnd()

> **trustBondingTotalBondedBalanceAtEpochEnd**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/total-bonded-balance-at-epoch-end.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/total-bonded-balance-at-epoch-end.ts#L12)

Reads total bonded balance at epoch end from the TrustBonding contract.

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

Total bonded balance as returned by the contract.
