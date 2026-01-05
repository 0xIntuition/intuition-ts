[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetShares

# Function: multiVaultGetShares()

> **multiVaultGetShares**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/multivault/get-shares.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-shares.ts#L12)

Reads share balance information from the MultiVault `getShares` view function.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the share lookup.

#### args

readonly \[`` `0x${string}` ``, `` `0x${string}` ``, `bigint`\]

## Returns

`Promise`\<`bigint`\>

Contract response for the share query.
