[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultIsCounterTriple

# Function: multiVaultIsCounterTriple()

> **multiVaultIsCounterTriple**(`config`, `inputs`): `Promise`\<`boolean`\>

Defined in: [packages/protocol/src/core/multivault/is-counter-triple.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/is-counter-triple.ts#L12)

Checks whether a term ID represents a counter triple in the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the check.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<`boolean`\>

True if the term is a counter triple, as returned by the contract.
