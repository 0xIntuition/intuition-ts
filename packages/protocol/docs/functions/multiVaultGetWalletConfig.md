[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetWalletConfig

# Function: multiVaultGetWalletConfig()

> **multiVaultGetWalletConfig**(`config`): `Promise`\<\{ `atomWalletBeacon`: `` `0x${string}` ``; `atomWalletFactory`: `` `0x${string}` ``; `atomWarden`: `` `0x${string}` ``; `entryPoint`: `` `0x${string}` ``; \}\>

Defined in: [packages/protocol/src/core/multivault/get-wallet-config.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-wallet-config.ts#L9)

Reads the wallet configuration from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

## Returns

`Promise`\<\{ `atomWalletBeacon`: `` `0x${string}` ``; `atomWalletFactory`: `` `0x${string}` ``; `atomWarden`: `` `0x${string}` ``; `entryPoint`: `` `0x${string}` ``; \}\>

Wallet configuration struct from the contract.
