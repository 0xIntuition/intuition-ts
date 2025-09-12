# Migration Guide: Intuition TypeScript SDK v2.0.0

This guide helps you migrate your code from v1.x to v2.0.0-alpha.0 of the Intuition TypeScript packages. This is a **major version update** with significant breaking changes.

## Breaking Changes Overview

### Package Version Updates

| Package                 | Previous Version | New Version     |
| ----------------------- | ---------------- | --------------- |
| `@0xintuition/protocol` | `1.0.0-alpha.1`  | `2.0.0-alpha.0` |
| `@0xintuition/sdk`      | `1.0.0-alpha.3`  | `2.0.0-alpha.0` |
| `@0xintuition/graphql`  | `1.0.0-alpha.3`  | `2.0.0-alpha.0` |
| `@0xintuition/cli`      | `0.0.2`          | `1.0.0-alpha.1` |

## 1. Contract and Address Changes

### Contract Renaming: `EthMultiVault` → `MultiVault`

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

## 2. Core Function Changes

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

## 4. Removed Functions

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

## 📝 Summary

This major version update consolidates and simplifies the API while adding new functionality. The main changes are:

- **Singular → Plural**: Functions now support batch operations by default
- **Contract Renaming**: `EthMultiVault` → `MultiVault`
- **Simplified APIs**: Unified deposit/redeem functions
- **New Contracts**: Additional protocol contracts available
- **Event Updates**: Improved event parsing with new events

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
