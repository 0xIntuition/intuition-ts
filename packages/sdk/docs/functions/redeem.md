[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / redeem

# Function: redeem()

> **redeem**(`config`, `data`): `Promise`\<\{ `state`: `any`[]; `transactionHash`: `` `0x${string}` ``; \}\>

Defined in: [packages/sdk/src/core/redeem.ts:14](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/core/redeem.ts#L14)

Redeems shares for a term and returns parsed Redeemed events.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

readonly \[`` `0x${string}` ``, `` `0x${string}` ``, `bigint`, `bigint`, `bigint`\]

Redeem arguments for the MultiVault contract.

## Returns

`Promise`\<\{ `state`: `any`[]; `transactionHash`: `` `0x${string}` ``; \}\>

Transaction hash and decoded event args.
