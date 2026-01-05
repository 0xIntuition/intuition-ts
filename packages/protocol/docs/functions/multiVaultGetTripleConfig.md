[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetTripleConfig

# Function: multiVaultGetTripleConfig()

> **multiVaultGetTripleConfig**(`config`): `Promise`\<\{ `atomDepositFractionForTriple`: `bigint`; `tripleCreationProtocolFee`: `bigint`; \}\>

Defined in: [packages/protocol/src/core/multivault/get-triple-config.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-triple-config.ts#L9)

Reads the triple configuration from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

## Returns

`Promise`\<\{ `atomDepositFractionForTriple`: `bigint`; `tripleCreationProtocolFee`: `bigint`; \}\>

Triple configuration struct from the contract.
