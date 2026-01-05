[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / multiVaultProtocolFeeAmount

# Function: multiVaultProtocolFeeAmount()

> **multiVaultProtocolFeeAmount**(`config`, `inputs`): `Promise`\<`bigint`\>

Defined in: [packages/protocol/src/core/multivault/protocol-fee-amount.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/core/multivault/protocol-fee-amount.ts#L12)

Reads the protocol fee amount for a transaction from the MultiVault contract.

## Parameters

### config

[`ReadConfig`](../type-aliases/ReadConfig.md)

Contract address and public client.

### inputs

Function args for the fee calculation.

#### args

readonly \[`bigint`\]

## Returns

`Promise`\<`bigint`\>

Protocol fee amount as returned by the contract.
