[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / createAtomFromSmartContract

# Function: createAtomFromSmartContract()

> **createAtomFromSmartContract**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `string`; \}\>

Defined in: [packages/sdk/src/core/create-atom-from-smart-contract.ts:17](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/core/create-atom-from-smart-contract.ts#L17)

Creates an atom for a smart contract CAIP-10 address and returns the event state.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

Smart contract address and chain ID.

#### address

`` `0x${string}` ``

#### chainId

`number`

### depositAmount?

`bigint`

Optional additional deposit amount.

## Returns

`Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `string`; \}\>

Created atom URI, transaction hash, and decoded event args.
