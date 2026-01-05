[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingPreviousEpoch

# Function: trustBondingPreviousEpoch()

> **trustBondingPreviousEpoch**(`config`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/trustbonding/previous-epoch.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/previous-epoch.ts#L9)

Reads the previous epoch from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

## Returns

`Promise`\<`bigint`\>

Previous epoch as returned by the contract.
