[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / batchDeposit

# Function: batchDeposit()

> **batchDeposit**(`config`, `data`): `Promise`\<\{ `state`: `any`[]; `transactionHash`: `` `0x${string}` ``; \}\>

Defined in: [packages/sdk/src/core/batch-deposit.ts:14](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/core/batch-deposit.ts#L14)

Deposits assets for multiple terms and returns parsed Deposited events.

## Parameters

### config

`WriteConfig`

Contract address and viem clients.

### data

readonly \[`` `0x${string}` ``, readonly `` `0x${string}` ``[], readonly `bigint`[], readonly `bigint`[], readonly `bigint`[]\]

DepositBatch arguments for the MultiVault contract.

## Returns

`Promise`\<\{ `state`: `any`[]; `transactionHash`: `` `0x${string}` ``; \}\>

Transaction hash and decoded event args.
