# Intuition TypeScript Monorepo Documentation

## Overview

This monorepo contains the Intuition ecosystem, a decentralized knowledge graph protocol. It uses [pnpm](https://pnpm.io/) and is organized into `apps` and `packages`.

## Project Structure

- **`apps/`**: Core applications.
- **`packages/`**: Shared libraries and SDKs.
  - **`protocol`** (`@0xintuition/protocol`): Low-level interactions with the Intuition smart contracts (ABIs, bytecode, encoding).
  - **`sdk`** (`@0xintuition/sdk`): High-level abstractions for interacting with the protocol (Atoms, Triples).
  - **`graphql`** (`@0xintuition/graphql`): GraphQL interaction layer.

## Protocol Package (`@0xintuition/protocol`)

Provides direct access to smart contract interfaces and utilities.

### Key Components

- **`MultiVault`**: The core contract managing Atoms and Triples.
- **`TrustBonding`**: Handles bonding curves and signaling.

### Usage Examples

#### Setup

```typescript
import {
  getMultiVaultAddressFromChainId,
  intuitionTestnet,
} from '@0xintuition/protocol'

import { createPublicClient, createWalletClient, http } from 'viem'

const publicClient = createPublicClient({
  chain: intuitionTestnet,
  transport: http(),
})
const walletClient = createWalletClient({
  chain: intuitionTestnet,
  transport: http(),
  account,
})
const address = getMultiVaultAddressFromChainId(intuitionTestnet.id)
```

#### Create Atoms (Low-Level)

```typescript
import { createAtoms, getAtomCost } from '@0xintuition/protocol'

const atomCost = await getAtomCost({ address, publicClient })
await createAtoms(
  { address, walletClient, publicClient },
  {
    args: [[atomUri], [atomCost]],
    value: atomCost,
  },
)
```

#### Create Triples (Low-Level)

```typescript
import { createTriples, getTripleCost } from '@0xintuition/protocol'

const tripleCost = await getTripleCost({ address, publicClient })
await createTriples(
  { address, walletClient, publicClient },
  {
    args: [[subjectId], [predicateId], [objectId], [tripleCost]],
    value: tripleCost,
  },
)
```

## SDK Package (`@0xintuition/sdk`)

Provides simplified, high-level functions for common workflows. **Preferred for most integrations.**

### Key Functions

- **`createAtomFromString`**: Creates an Atom from a simple string.
- **`createAtomFromIpfsUpload`**: Uploads metadata to IPFS and creates an Atom.
- **`createTripleStatement`**: Creates a Triple connecting three Atoms.
- **`deposit` / `redeem`**: Manage stake on Atoms/Triples.

### Usage Examples

#### Create Atom

```typescript
import { createAtomFromString } from '@0xintuition/sdk'

const atom = await createAtomFromString(
  { walletClient, publicClient, address },
  'My Atom Label',
)
// atom.state.termId is the Atom ID
```

#### Create Triple

```typescript
import { createTripleStatement } from '@0xintuition/sdk'

const triple = await createTripleStatement(
  { walletClient, publicClient, address },
  {
    args: [subjectAtomId, predicateAtomId, objectAtomId],
    value: depositAmount, // Optional initial deposit
  },
)
```

#### Deposit

```typescript
import { deposit } from '@0xintuition/protocol' // SDK re-exports or uses protocol functions

await deposit(
  { address, walletClient, publicClient },
  {
    args: [receiverAddress, vaultId, curveId, minShares],
    value: depositAmount,
  },
)
```
