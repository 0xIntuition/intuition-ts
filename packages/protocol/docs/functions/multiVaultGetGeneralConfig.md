[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetGeneralConfig

# Function: multiVaultGetGeneralConfig()

> **multiVaultGetGeneralConfig**(`config`): `Promise`\<\{ `admin`: `` `0x${string}` ``; `atomDataMaxLength`: `bigint`; `feeDenominator`: `bigint`; `feeThreshold`: `bigint`; `minDeposit`: `bigint`; `minShare`: `bigint`; `protocolMultisig`: `` `0x${string}` ``; `trustBonding`: `` `0x${string}` ``; \}\>

Defined in: [packages/protocol/src/core/multivault/get-general-config.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-general-config.ts#L9)

Reads the general configuration from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

## Returns

`Promise`\<\{ `admin`: `` `0x${string}` ``; `atomDataMaxLength`: `bigint`; `feeDenominator`: `bigint`; `feeThreshold`: `bigint`; `minDeposit`: `bigint`; `minShare`: `bigint`; `protocolMultisig`: `` `0x${string}` ``; `trustBonding`: `` `0x${string}` ``; \}\>

General configuration struct from the contract.
