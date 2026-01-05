[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / createAtomFromIpfsUri

# Function: createAtomFromIpfsUri()

> **createAtomFromIpfsUri**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `` `ipfs://${string}` ``; \}\>

Defined in: [packages/sdk/src/core/create-atom-from-ipfs-uri.ts:17](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/core/create-atom-from-ipfs-uri.ts#L17)

Creates an atom from an IPFS URI and returns the creation event state.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

`` `ipfs://${string}` ``

IPFS URI to store as the atom payload.

### depositAmount?

`bigint`

Optional additional deposit amount.

## Returns

`Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `` `ipfs://${string}` ``; \}\>

Created atom URI, transaction hash, and decoded event args.
