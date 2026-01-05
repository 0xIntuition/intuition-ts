[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / trustBondingGetSystemApy

# Function: trustBondingGetSystemApy()

> **trustBondingGetSystemApy**(`config`): `Promise`\<readonly \[`bigint`, `bigint`\]\>

Defined in: [packages/protocol/src/core/trustbonding/get-system-apy.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/trustbonding/get-system-apy.ts#L9)

Reads the system APY from the TrustBonding contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

## Returns

`Promise`\<readonly \[`bigint`, `bigint`\]\>

System APY as returned by the contract.
