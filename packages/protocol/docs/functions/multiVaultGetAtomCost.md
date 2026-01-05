[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultGetAtomCost

# Function: multiVaultGetAtomCost()

> **multiVaultGetAtomCost**(`config`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/multivault/get-atom-cost.ts:9](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/get-atom-cost.ts#L9)

Reads the base atom cost from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

## Returns

`Promise`\<`bigint`\>

Base atom creation cost as returned by the contract.
