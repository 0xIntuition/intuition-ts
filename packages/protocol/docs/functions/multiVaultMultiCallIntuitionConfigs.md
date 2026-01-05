[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultMultiCallIntuitionConfigs

# Function: multiVaultMultiCallIntuitionConfigs()

> **multiVaultMultiCallIntuitionConfigs**(`config`): `Promise`\<[`MultivaultConfig`](../type-aliases/MultivaultConfig.md)\>

Defined in: [packages/protocol/src/core/multivault/multicall-intuition-config.ts:16](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/multicall-intuition-config.ts#L16)

Fetches and formats multiple MultiVault configuration values via multicall.

## Parameters

### config

[`MultiCallIntuitionConfigs`](../type-aliases/MultiCallIntuitionConfigs.md)

Contract address and public client.

## Returns

`Promise`\<[`MultivaultConfig`](../type-aliases/MultivaultConfig.md)\>

Aggregated configuration values with raw and formatted fields.
