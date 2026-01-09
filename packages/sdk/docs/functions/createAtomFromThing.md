[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / createAtomFromThing

# Function: createAtomFromThing()

> **createAtomFromThing**(`config`, `data`, `depositAmount?`): `Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `string`; \}\>

Defined in: [packages/sdk/src/core/create-atom-from-thing.ts:20](https://github.com/0xIntuition/intuition-ts/blob/main/packages/sdk/src/core/create-atom-from-thing.ts#L20)

Pins a "thing" to IPFS via Pinata, creates an atom on-chain, and returns the event state.

## Parameters

### config

`CreateAtomConfigWithIpfs`

Contract address, viem clients, and Pinata API JWT.

**Type**: `WriteConfig & { pinataApiJWT: string }`

### data

`PinThingMutationVariables`

PinThing mutation variables used to build the IPFS payload.

### depositAmount?

`bigint`

Optional additional deposit amount.

## Returns

`Promise`\<\{ `state`: \{ `atomData`: `` `0x${string}` ``; `atomWallet`: `` `0x${string}` ``; `creator`: `` `0x${string}` ``; `termId`: `` `0x${string}` ``; \}; `transactionHash`: `` `0x${string}` ``; `uri`: `string`; \}\>

Created atom URI, transaction hash, and decoded event args.
