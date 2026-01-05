[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / getContractAddressFromChainId

# Function: getContractAddressFromChainId()

> **getContractAddressFromChainId**(`name`, `chainId`): `` `0x${string}` ``

Defined in: [packages/protocol/src/utils/get-contract-address-from-chain-id.ts:12](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/utils/get-contract-address-from-chain-id.ts#L12)

Resolves a deployed contract address by name and chain ID.

## Parameters

### name

Contract name to look up.

`"MultiVault"` | `"BondingCurveRegistry"` | `"OffsetProgressiveCurve"`

### chainId

`number`

Chain ID for the deployment.

## Returns

`` `0x${string}` ``

Contract address for the requested deployment.

## Throws

Error if the deployment is missing.
