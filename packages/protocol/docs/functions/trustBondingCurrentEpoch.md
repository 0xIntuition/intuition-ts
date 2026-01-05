[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingCurrentEpoch

# Function: trustBondingCurrentEpoch()

> **trustBondingCurrentEpoch**(`config`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/current-epoch.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/current-epoch.ts#L9)

Reads the current epoch from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

## Returns

`Promise`\<`bigint`\>

Current epoch as returned by the contract.
