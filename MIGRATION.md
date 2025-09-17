# Migration Guide: Intuition TypeScript SDK v2.0.0

This guide helps you migrate your code from v1.x to v2.0.0-alpha.0 of the Intuition TypeScript packages. This is a **major version update** with significant breaking changes due to the underlying contract migration from `EthMultiVault` to `MultiVault`.

## Contract Migration Overview

The core smart contract has been upgraded from `EthMultiVault` to `MultiVault`, introducing significant architectural changes that impact all TypeScript libraries built on top.

### Key Contract Changes

#### 1. **ID System Migration**

- **EthMultiVault**: Uses `uint256` for atom/triple IDs
- **MultiVault**: Uses `bytes32` for term IDs (atoms and triples are now "terms")

#### 2. **Terminology Changes**

- **EthMultiVault**: Atoms and Triples as separate entities
- **MultiVault**: Unified "Terms" concept (atoms and triples are both terms)
- **EthMultiVault**: Vault IDs
- **MultiVault**: Term IDs with Curve IDs for bonding curves

#### 3. **Bonding Curve Integration**

- **EthMultiVault**: Limited bonding curve support
- **MultiVault**: Full bonding curve integration with curve IDs for all operations

## Breaking Changes Overview

### Package Version Updates

| Package                 | Previous Version | New Version     |
| ----------------------- | ---------------- | --------------- |
| `@0xintuition/protocol` | `1.0.0-alpha.1`  | `2.0.0-alpha.2` |
| `@0xintuition/sdk`      | `1.0.0-alpha.3`  | `2.0.0-alpha.2` |
| `@0xintuition/graphql`  | `1.0.0-alpha.3`  | `2.0.0-alpha.2` |
| `@0xintuition/cli`      | `0.0.2`          | `2.0.0-alpha.2` |

## 1. Contract Migration Impact

### Contract Function Mapping

The migration from `EthMultiVault` to `MultiVault` requires updating all contract interactions. Here's the complete function mapping:

#### Core Creation Functions

##### Atom Creation

```solidity
// EthMultiVault
function createAtom(bytes atomUri) payable returns (uint256)
function batchCreateAtom(bytes[] atomUris) payable returns (uint256[])

// MultiVault
function createAtoms(bytes[] data, uint256[] assets) payable returns (bytes32[])
```

##### Triple Creation

```solidity
// EthMultiVault
function createTriple(uint256 subjectId, uint256 predicateId, uint256 objectId) payable returns (uint256)
function batchCreateTriple(uint256[] subjectIds, uint256[] predicateIds, uint256[] objectIds) payable returns (uint256[])

// MultiVault
function createTriples(bytes32[] subjectIds, bytes32[] predicateIds, bytes32[] objectIds, uint256[] assets) payable returns (bytes32[])
```

#### Deposit Functions

##### EthMultiVault

```solidity
function depositAtom(address receiver, uint256 id) payable returns (uint256)
function depositTriple(address receiver, uint256 id) payable returns (uint256)
function batchDeposit(address receiver, uint256[] termIds, uint256[] amounts) payable returns (uint256[])
```

##### MultiVault

```solidity
function deposit(address receiver, bytes32 termId, uint256 curveId, uint256 minShares) payable returns (uint256)
function depositBatch(address receiver, bytes32[] termIds, uint256[] curveIds, uint256[] assets, uint256[] minShares) payable returns (uint256[])
```

#### Redeem Functions

##### EthMultiVault

```solidity
function redeemAtom(uint256 shares, address receiver, uint256 id) returns (uint256)
function redeemTriple(uint256 shares, address receiver, uint256 id) returns (uint256)
function batchRedeem(uint256 percentage, address receiver, uint256[] ids) returns (uint256[])
```

##### MultiVault

```solidity
function redeem(address receiver, bytes32 termId, uint256 curveId, uint256 shares, uint256 minAssets) returns (uint256)
function redeemBatch(address receiver, bytes32[] termIds, uint256[] curveIds, uint256[] shares, uint256[] minAssets) returns (uint256[])
```

### Contract Address Changes: `EthMultiVault` → `MultiVault`

**Before:**

```typescript
import { EthMultiVaultAbi } from '@0xintuition/protocol'
import { getEthMultiVaultAddress } from '@0xintuition/sdk'

const address = getEthMultiVaultAddress(chainId)
```

**After:**

```typescript
import { intuitionTestnet, MultiVaultAbi } from '@0xintuition/protocol'
import { getMultiVaultAddressFromChainId } from '@0xintuition/sdk'

const address = getMultiVaultAddressFromChainId(intuitionTestnet.id)
```

### Contract Event Changes

#### EthMultiVault Events

```solidity
event AtomCreated(address indexed creator, address indexed atomWallet, bytes atomData, uint256 vaultId)
event TripleCreated(address indexed creator, uint256 subjectId, uint256 predicateId, uint256 objectId, uint256 vaultId)
```

#### MultiVault Events

```solidity
event AtomCreated(address indexed creator, bytes32 indexed termId, bytes atomData, address atomWallet)
event TripleCreated(address indexed creator, bytes32 indexed termId, bytes32 subjectId, bytes32 predicateId, bytes32 objectId)
```

### Data Structure Migration

#### ID Handling Update

```typescript
// Before (EthMultiVault)
const atomId: bigint = 123n;
const tripleId: bigint = 456n;

// After (MultiVault)
const atomId: `0x${string}` = "0x1234..."; // 32-byte hash
const tripleId: `0x${string}` = "0x5678..."; // 32-byte hash
```

#### Query Functions

```solidity
// EthMultiVault
function atoms(uint256 atomId) view returns (bytes)
function getTripleAtoms(uint256 id) view returns (uint256, uint256, uint256)

// MultiVault
function atom(bytes32 atomId) view returns (bytes)
function getAtom(bytes32 atomId) view returns (bytes)
function triple(bytes32 tripleId) view returns (bytes32, bytes32, bytes32)
function getTriple(bytes32 tripleId) view returns (bytes32, bytes32, bytes32)
```

#### Share and Asset Conversions

```solidity
// EthMultiVault
function convertToShares(uint256 assets, uint256 id) view returns (uint256)
function convertToAssets(uint256 shares, uint256 id) view returns (uint256)

// MultiVault
function convertToShares(bytes32 termId, uint256 curveId, uint256 assets) view returns (uint256)
function convertToAssets(bytes32 termId, uint256 curveId, uint256 shares) view returns (uint256)
```

### New MultiVault Features

#### 1. **Utilization Tracking**

```typescript
const userUtilization = await multiVault.getUserUtilizationForEpoch(
  userAddress,
  epoch,
)
const totalUtilization = await multiVault.getTotalUtilizationForEpoch(epoch)
```

#### 2. **Epoch System**

```typescript
const currentEpoch = await multiVault.currentEpoch()
const lastActiveEpoch = await multiVault.lastActiveEpoch(userAddress)
```

#### 3. **Enhanced Fee Management**

```typescript
// Atom wallet deposit fees
const accumulatedFees =
  await multiVault.accumulatedAtomWalletDepositFees(atomWallet)
await multiVault.claimAtomWalletDepositFees(termId)

// Protocol fees by epoch
const protocolFees = await multiVault.accumulatedProtocolFees(epoch)
```

#### 4. **Improved Preview Functions**

```typescript
// Preview with different scenarios
const [shares, assetsAfterFees] = await multiVault.previewDeposit(termId, curveId, assets);
const [shares, assetsAfterFixedFees, assetsAfterFees] = await multiVault.previewAtomCreate(termId, curveId, assets);
```

## 2. TypeScript Library Changes

### Protocol Package (`@0xintuition/protocol`)

#### Atom Creation: Singular → Plural

**Before:**

```typescript
import {
  createAtom,
  createAtomCalculateBaseCost,
  createAtomEncode,
} from '@0xintuition/protocol'

// Single atom creation
await createAtom(config, { args: [atomUri], value })

// Encoding
const encodedData = createAtomEncode(atomUri)

// Cost calculation
const cost = await createAtomCalculateBaseCost(config)
```

**After:**

```typescript
import {
  createAtoms,
  createAtomsEncode,
  getAtomCost,
} from '@0xintuition/protocol'

// Atoms creation (supports single or multiple)
await createAtoms(config, {
  args: [
    [atomUri1, atomUri2],
    [assets1, assets2],
  ],
  value,
})

// Encoding
const encodedData = createAtomsEncode([atomUri1, atomUri2], [assets1, assets2])

// Cost calculation
const cost = await getAtomCost(config)
```

#### Triple Creation: Singular → Plural

**Before:**

```typescript
import {
  createTriple,
  createTripleCalculateBaseCost,
  createTripleEncode,
} from '@0xintuition/protocol'

await createTriple(config, {
  args: [subjectId, predicateId, objectId],
  value,
})

const encodedData = createTripleEncode(subjectId, predicateId, objectId)
const cost = await createTripleCalculateBaseCost(config)
```

**After:**

```typescript
import {
  createTriples,
  createTriplesEncode,
  getTripleCost,
} from '@0xintuition/protocol'

await createTriples(config, {
  args: [
    [subjectId1, subjectId2],
    [predicateId1, predicateId2],
    [objectId1, objectId2],
    [assets1, assets2],
  ],
  value,
})

const encodedData = createTriplesEncode(
  [subjectId1, subjectId2],
  [predicateId1, predicateId2],
  [objectId1, objectId2],
  [assets1, assets2],
)

const cost = await getTripleCost(config)
```

#### Deposit and Redeem Simplification

**Before:**

```typescript
import {
  depositAtom,
  depositAtomEncode,
  depositTriple,
  depositTripleEncode,
  redeemAtom,
  redeemAtomEncode,
  redeemTriple,
  redeemTripleEncode,
} from '@0xintuition/protocol'

// Separate functions for atoms and triples
await depositAtom(config, { args: [receiver, atomId], value })
await depositTriple(config, { args: [receiver, tripleId], value })
await redeemAtom(config, { args: [shares, receiver, atomId] })
await redeemTriple(config, { args: [shares, receiver, tripleId] })
```

**After:**

```typescript
import {
  deposit,
  depositEncode,
  redeem,
  redeemEncode,
} from '@0xintuition/protocol'

// Unified functions for any vault (atom or triple)
await deposit(config, {
  args: [receiver, termId, curveId, assets, minShares],
  value,
})
await redeem(config, { args: [receiver, termId, cirveId, shares, minAssets] })

// Unified encoding
const depositData = depositEncode(receiver, vaultId)
const redeemData = redeemEncode(shares, receiver, vaultId)
```

#### Batch Operations Renamed

**Before:**

```typescript
import {
  batchCreateAtom,
  batchCreateTriple,
  batchDepositCurve,
  batchRedeemCurve,
} from '@0xintuition/protocol'
```

**After:**

```typescript
import {
  createAtoms, // Replaces batchCreateAtom
  createTriples, // Replaces batchCreateTriple
  depositBatch, // Replaces batchDepositCurve
  redeemBatch, // Replaces batchRedeemCurve
} from '@0xintuition/protocol'
```

#### Multicall Function Name

**Before:**

```typescript
import { multiCallIntuitionConfigs } from '@0xintuition/protocol'

const config = await multiCallIntuitionConfigs({ address, publicClient })
```

**After:**

```typescript
import { multicallIntuitionConfig } from '@0xintuition/protocol'

const config = await multicallIntuitionConfig({ address, publicClient })
```

#### Removed EthMultiVault API

**Before:**

```typescript
import { EthMultiVault } from '@0xintuition/protocol'

const ethMultiVault = new EthMultiVault({ publicClient, walletClient })
const result = await ethMultiVault.createAtom('hello')
```

**After:**

```typescript
import {
  getMultiVaultAddressFromChainId,
  intuitionTestnet,
  MultiVaultAbi,
} from '@0xintuition/protocol'

import { getContract } from 'viem'

const multiVault = getContract({
  abi: MultiVaultAbi,
  address: getMultiVaultAddressFromChainId(intuitionTestnet.id),
  client: {
    public: publicClient,
    wallet: walletClient,
  },
})

const atomCost = await multiVault.read.getAtomCost()
const result = await multiVault.createAtoms([['hello'], [atomCost]], {
  value: atomCost,
})
```

### Bonding Curve Integration

The new `MultiVault` contract requires curve IDs for all operations:

```typescript
// MultiVault requires curve ID for all operations
const defaultCurveId = await multiVault.getBondingCurveConfig().defaultCurveId

// Use in all deposit/redeem operations
await multiVault.deposit(receiver, termId, defaultCurveId, minShares, {
  value: assets,
})
```

### Migration Steps

#### Step 1: Update Function Calls

##### Creating Atoms

```typescript
// Before
const atomId = await ethMultiVault.createAtom(atomData, { value: fee });

// After
const atomIds = await multiVault.createAtoms([atomData], [assets], { value: totalValue });
const atomId = atomIds[0];
```

##### Depositing

```typescript
// Before
const shares = await ethMultiVault.depositAtom(receiver, atomId, { value: assets });

// After
const shares = await multiVault.deposit(receiver, termId, curveId, minShares, { value: assets });
```

##### Redeeming

```typescript
// Before
const assets = await ethMultiVault.redeemAtom(shares, receiver, atomId);

// After
const assets = await multiVault.redeem(receiver, termId, curveId, shares, minAssets);
```

## 3. SDK Package Changes (`@0xintuition/sdk`)

### API Function Renaming

**Before:**

```typescript
import { getAtom, getTriple } from '@0xintuition/sdk'

const atomData = await getAtom('124862')
const tripleData = await getTriple('54670')
```

**After:**

```typescript
import { getAtomDetails, getTripleDetails } from '@0xintuition/sdk'

const atomData = await getAtomDetails(
  '0x57d94c116a33bb460428eced262b7ae2ec6f865e7aceef6357cec3d034e8ea21',
)
const tripleData = await getTripleDetails(
  '0x4957d3f442acc301ad71e73f26efd6af78647f57dacf2b3a686d91fa773fe0b6',
)
```

### Triple Creation Parameter Changes

**Before:**

```typescript
import { createTripleStatement } from '@0xintuition/sdk'

const triple = await createTripleStatement(config, {
  args: [subjectVaultId, predicateVaultId, objectVaultId],
  depositAmount: 1000000000000000000n, // Optional
})
```

**After:**

```typescript
import { createTripleStatement } from '@0xintuition/sdk'

const triple = await createTripleStatement(config, {
  args: [
    [subjectVaultId],
    [predicateVaultId],
    [objectVaultId],
    [1000000000000000000n],
  ],
  value: 1000000000000000000n, // Required
})
```

## 4. Configuration Changes

### EthMultiVault Config

```solidity
struct GeneralConfig {
    address admin;
    address protocolMultisig;
    uint256 feeDenominator;
    uint256 minDeposit;
    uint256 minShare;
    uint256 atomUriMaxLength;
    uint256 decimalPrecision;
    uint256 minDelay;
}
```

### MultiVault Config

```solidity
struct GeneralConfig {
    address admin;
    address protocolMultisig;
    uint256 feeDenominator;
    address trustBonding;      // New
    uint256 minDeposit;
    uint256 minShare;
    uint256 atomDataMaxLength; // Renamed
    uint256 decimalPrecision;
    // minDelay removed
}
```

## 5. Removed Functions

The following functions have been removed and replaced:

### Protocol Package

- `createAtom` → `createAtoms`
- `createTriple` → `createTriples`
- `batchCreateAtom` → `createAtoms`
- `batchCreateTriple` → `createTriples`
- `depositAtom` / `depositTriple` → `deposit`
- `redeemAtom` / `redeemTriple` → `redeem`
- `createAtomCalculateBaseCost` → `getAtomCost`
- `createTripleCalculateBaseCost` → `getTripleCost`
- All curve-specific functions → `depositBatch` / `redeemBatch`
- `atoms-by-hash.ts` file completely removed

### SDK Package

- `createThing` → `createAtomFromThing`
- `createEthereumAccount` → `createAtomFromEthereumAccount`
- `getEthMultiVaultAddress` → `getMultiVaultAddressFromChainId`
- `getAtom` → `getAtomDetails`
- `getTriple` → `getTripleDetails`

## 6. Breaking Changes Summary

1. **All IDs changed from `uint256` to `bytes32`**
2. **Curve ID parameter required for most operations**
3. **Batch functions have different signatures**
4. **Event structures updated**
5. **Some functions renamed or merged**
6. **New slippage protection with `minShares`/`minAssets` parameters**

## 7. Best Practices

1. **Always use the default curve ID** unless you have specific bonding curve requirements
2. **Implement proper slippage protection** with min/max parameters
3. **Handle the new epoch system** for utilization tracking
4. **Update your event listeners** to match new event structures
5. **Use preview functions** to estimate outcomes before transactions

## 📝 Summary

This major version update consolidates and simplifies the API while adding new functionality. The main changes are:

- **Contract Migration**: `EthMultiVault` → `MultiVault` with architectural improvements
- **ID System**: Changed from `uint256` to `bytes32` for all term identifiers
- **Bonding Curves**: Full integration requiring curve IDs for all operations
- **Singular → Plural**: Functions now support batch operations by default
- **Unified APIs**: Simplified deposit/redeem functions for all vault types
- **Enhanced Features**: New utilization tracking, epoch system, and preview functions
- **Event Updates**: Improved event parsing with new event structures

Take your time with the migration and test thoroughly. The new API is more powerful and consistent, providing a better developer experience.

# GraphQL Schema Migration Guide

## Overview

## ⚠️ Breaking Changes

### 1. ID Field Type Changes: Numeric → String

**CRITICAL IMPACT** - All existing queries and mutations using these fields will break.

#### Core Entity ID Changes

| Entity        | Field             | Old Type   | New Type  |
| ------------- | ----------------- | ---------- | --------- |
| `accounts`    | `atom_id`         | `numeric`  | `String`  |
| `atoms`       | `term_id`         | `numeric!` | `String!` |
| `atoms`       | `value_id`        | `numeric`  | `String`  |
| `atom_values` | `id`              | `numeric!` | `String!` |
| `atom_values` | `book_id`         | `numeric`  | `String`  |
| `atom_values` | `byte_object_id`  | `numeric`  | `String`  |
| `atom_values` | `json_object_id`  | `numeric`  | `String`  |
| `atom_values` | `organization_id` | `numeric`  | `String`  |
| `atom_values` | `person_id`       | `numeric`  | `String`  |
| `atom_values` | `text_object_id`  | `numeric`  | `String`  |
| `atom_values` | `thing_id`        | `numeric`  | `String`  |
| `vaults`      | `term_id`         | `numeric!` | `String!` |

#### Entity Primary ID Changes

All primary `id` fields changed from `numeric!` to `String!`:

- `books`
- `byte_object`
- `caip10`
- `json_objects`
- `organizations`
- `persons`
- `text_objects`
- `things`
- `terms`

### 2. Removed Aggregate Fields

**MEDIUM IMPACT** - Statistical queries will break for entities with String IDs.

Removed aggregate field types (no longer available for statistical operations):

- `*_avg_fields` for: accounts, atom_values, books, byte_object, json_objects, organizations, persons, text_objects, things
- `*_stddev_fields`, `*_stddev_pop_fields`, `*_stddev_samp_fields`
- `*_sum_fields`, `*_var_pop_fields`, `*_var_samp_fields`, `*_variance_fields`

## 🆕 New Features

### 1. New Optional Fields

#### atom_values

- `caip10_id: String` - Link to CAIP-10 identifiers

### 2. New Entity Types

Statistics and analytics entities:

- `statHours` - Hourly statistics aggregation
- `term_total_state_changes` - Term state change tracking
- `term_total_state_change_stats_daily` - Daily aggregated statistics
- `term_total_state_change_stats_hourly` - Hourly aggregated statistics
- `term_total_state_change_stats_monthly` - Monthly aggregated statistics
- `term_total_state_change_stats_weekly` - Weekly aggregated statistics

### 3. New Scalar Types

- `atom_resolving_status` - Custom scalar for atom resolution states
- `vault_type` - Custom scalar for vault type definitions

## 🔧 Migration Checklist

### Client Application Updates

#### 1. Query/Mutation Updates

- [ ] Update all numeric ID field references to String
- [ ] Remove or update queries using deprecated aggregate fields
- [ ] Test all existing GraphQL operations

#### 2. Code Generation Updates

- [ ] Regenerate TypeScript types
- [ ] Update GraphQL codegen configuration
- [ ] Verify generated types match new schema

#### 3. Variable Updates

```graphql
# OLD
query GetAtom($termId: numeric!) {
  atoms(where: { term_id: { _eq: $termId } }) {
    term_id
    value_id
  }
}

# NEW
query GetAtom($termId: String!) {
  atoms(where: { term_id: { _eq: $termId } }) {
    term_id
    value_id
    raw_data
    resolving_status
  }
}
```
