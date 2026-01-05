[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetBondingCurveConfig

# Function: multiVaultGetBondingCurveConfig()

> **multiVaultGetBondingCurveConfig**(`config`): `Promise`\<\{ `defaultCurveId`: `bigint`; `registry`: `` `0x${string}` ``; \}\>

Defined in: [packages/protocol/src/core/multivault/get-bonding-curve-config.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-bonding-curve-config.ts#L9)

Reads the bonding curve configuration from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

## Returns

`Promise`\<\{ `defaultCurveId`: `bigint`; `registry`: `` `0x${string}` ``; \}\>

Bonding curve configuration struct from the contract.
