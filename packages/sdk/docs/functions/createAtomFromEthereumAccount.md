[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / createAtomFromEthereumAccount

# Function: createAtomFromEthereumAccount()

> **createAtomFromEthereumAccount**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `` `0x${string}` ``; \}\>

Defined in: [packages/sdk/src/core/create-atom-from-ethereum-account.ts:17](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/core/create-atom-from-ethereum-account.ts#L17)

Creates an atom for an Ethereum account address and returns the event state.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

`` `0x${string}` ``

Ethereum account address.

### depositAmount?

`bigint`

Optional additional deposit amount.

## Returns

`Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `` `0x${string}` ``; \}\>

Atom data address, transaction hash, and decoded event args.
