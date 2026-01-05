[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultCurrentSharePrice

# Function: multiVaultCurrentSharePrice()

> **multiVaultCurrentSharePrice**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/multivault/current-share-price.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/current-share-price.ts#L12)

Reads the current share price from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the share price lookup.

#### args

readonly \[`` `0x${string}` ``, `bigint`\]

## Returns

`Promise`\<`bigint`\>

Share price as returned by the contract.
