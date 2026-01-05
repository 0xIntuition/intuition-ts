[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / createAtomFromIpfsUpload

# Function: createAtomFromIpfsUpload()

> **createAtomFromIpfsUpload**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: \{ `assets`: `bigint`; `assetsAfterFees`: `bigint`; `curveId`: `bigint`; `receiver`: `` `0x${string}` ``; `sender`: `` `0x${string}` ``; `shares`: `bigint`; `termId`: `` `0x${string}` ``; `totalShares`: `bigint`; `vaultType`: `number`; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `string`; \}\>

Defined in: [packages/sdk/src/core/create-atom-from-ipfs-upload.ts:23](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/core/create-atom-from-ipfs-upload.ts#L23)

Uploads JSON to Pinata, creates an atom on-chain, and returns the event state.

## Parameters

### config

[`CreateAtomConfigWithIpfs`](../type-aliases/CreateAtomConfigWithIpfs.md)

Contract address, viem clients, and Pinata API JWT.

### data

`unknown`

JSON-serializable payload to upload.

### depositAmount?

`bigint`

Optional additional deposit amount.

## Returns

`Promise`\<\{ `state`: \{ `assets`: `bigint`; `assetsAfterFees`: `bigint`; `curveId`: `bigint`; `receiver`: `` `0x${string}` ``; `sender`: `` `0x${string}` ``; `shares`: `bigint`; `termId`: `` `0x${string}` ``; `totalShares`: `bigint`; `vaultType`: `number`; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `string`; \}\>

Created atom URI, transaction hash, and decoded event args.
