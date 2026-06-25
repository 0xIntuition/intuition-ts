[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / createAtomFromString

# Function: createAtomFromString()

> **createAtomFromString**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `string`; \}\>

Defined in: [packages/sdk/src/core/create-atom-from-string.ts:17](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/core/create-atom-from-string.ts#L17)

Creates an atom from a raw string payload and returns the event state.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

`string`

String payload to store as the atom.

### depositAmount?

`bigint`

Optional additional deposit amount.

## Returns

`Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `string`; \}\>

Atom data string, transaction hash, and decoded event args.
