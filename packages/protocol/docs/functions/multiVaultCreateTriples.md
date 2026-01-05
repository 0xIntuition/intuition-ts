[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultCreateTriples

# Function: multiVaultCreateTriples()

> **multiVaultCreateTriples**(`config`, `inputs`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/protocol/src/core/multivault/create-triples.ts:17](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/create-triples.ts#L17)

Simulates and submits a MultiVault `createTriples` transaction.

## Parameters

### config

[`WriteConfig`](../type-aliases/WriteConfig.md)

Contract address and viem clients.

### inputs

[`CreateTriplesInputs`](../type-aliases/CreateTriplesInputs.md)

Function args and optional call value.

## Returns

`Promise`\<`` `0x${string}` ``\>

Transaction hash from the wallet client.
