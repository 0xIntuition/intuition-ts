[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchCreateAtomsFromEthereumAccounts

# Function: batchCreateAtomsFromEthereumAccounts()

> **batchCreateAtomsFromEthereumAccounts**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: `object`[]; `transactionHash`: `` `0x${string}` ``; `uris`: `` `0x${string}` ``[]; \}\>

Defined in: [packages/sdk/src/core/batch-create-atoms-from-ethereum-accounts.ts:17](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/core/batch-create-atoms-from-ethereum-accounts.ts#L17)

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
