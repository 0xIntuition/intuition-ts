[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetUserLastActiveEpoch

# Function: multiVaultGetUserLastActiveEpoch()

> **multiVaultGetUserLastActiveEpoch**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/multivault/get-user-last-active-epoch.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-user-last-active-epoch.ts#L12)

Reads the last active epoch for a user from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the user lookup.

#### args

readonly \[`` `0x${string}` ``\]

## Returns

`Promise`\<`bigint`\>

Last active epoch as returned by the contract.
