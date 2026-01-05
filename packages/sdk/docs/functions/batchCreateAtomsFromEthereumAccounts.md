[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchCreateAtomsFromEthereumAccounts

# Function: batchCreateAtomsFromEthereumAccounts()

> **batchCreateAtomsFromEthereumAccounts**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `` `0x${string}` ``[]; \}\>

Defined in: [packages/sdk/src/core/batch-create-atoms-from-ethereum-accounts.ts:17](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/core/batch-create-atoms-from-ethereum-accounts.ts#L17)

Creates atoms in batch for Ethereum account addresses and returns events.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

`` `0x${string}` ``[]

Array of Ethereum account addresses.

### depositAmount?

`bigint`

Optional additional deposit amount per atom.

## Returns

`Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `` `0x${string}` ``[]; \}\>

Atom data addresses, transaction hash, and decoded event args.
