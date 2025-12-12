# @0xintuition/protocol

**TypeScript SDK for the Intuition Protocol**

A comprehensive TypeScript/JavaScript SDK for interacting with the Intuition onchain knowledge graph. Build, query, and manage atoms (entities), triples (statements), vaults, and bonding rewards on the Intuition blockchain.

[![Version](https://img.shields.io/npm/v/@0xintuition/protocol.svg)](https://www.npmjs.com/package/@0xintuition/protocol)
[![Downloads/week](https://img.shields.io/npm/dw/@0xintuition/protocol.svg)](https://npmjs.org/package/@0xintuition/protocol)

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Configuration](#configuration)
- [API Reference](#api-reference)
  - [MultiVault Operations](#multivault-operations)
  - [TrustBonding System](#trustbonding-system)
  - [WrappedTrust](#wrappedtrust)
  - [Event Parsing](#event-parsing)
- [Code Examples](#code-examples)
- [TypeScript Types](#typescript-types)
- [Contract ABIs](#contract-abis)
- [Networks & Deployments](#networks--deployments)
- [Development](#development)
- [License](#license)

---

## Installation

```bash
# npm
npm install viem @0xintuition/protocol

# pnpm
pnpm install viem @0xintuition/protocol

# bun
bun install viem @0xintuition/protocol
```

**Peer Dependencies:** `viem ^2.0.0`

---

## Quick Start

```typescript
import {
  intuitionTestnet,
  getMultiVaultAddressFromChainId,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  eventParseAtomCreated,
} from '@0xintuition/protocol'
import { createPublicClient, createWalletClient, http, toHex } from 'viem'

// Setup clients
const publicClient = createPublicClient({
  chain: intuitionTestnet,
  transport: http(),
})

const walletClient = createWalletClient({
  chain: intuitionTestnet,
  transport: http(),
  account, // your account (metamask, private key, etc)
})

// Get contract address
const address = getMultiVaultAddressFromChainId(intuitionTestnet.id)

// Create an atom
const atomCost = await multiVaultGetAtomCost({ address, publicClient })
const atomUri = toHex('Hello, Intuition!')

const txHash = await multiVaultCreateAtoms(
  { address, walletClient, publicClient },
  {
    args: [[atomUri], [atomCost]],
    value: atomCost,
  }
)

// Parse the created atom
const events = await eventParseAtomCreated(publicClient, txHash)
console.log('Atom ID:', events[0].args.termId)
```

---

## Core Concepts

### Atoms
**Atoms** are the fundamental building blocks of the Intuition knowledge graph. Each atom represents an entity, identity, or concept (e.g., a person, organization, or idea). Atoms are stored on-chain with a unique URI and term ID.

### Triples
**Triples** are statements that connect atoms in subject-predicate-object relationships:
- **Subject**: The atom being described
- **Predicate**: The relationship type
- **Object**: The value or target atom

Example: `(Alice, knows, Bob)` or `(Document, hasTag, TypeScript)`

### Vaults & Shares
Each atom and triple has an associated **vault** that holds deposited assets. When users deposit into a vault, they receive **shares** representing their ownership. Share prices are determined by bonding curves.

### Bonding Curves
**Bonding curves** determine the relationship between assets deposited and shares minted. The protocol supports:
- **LinearCurve**: Linear price progression
- **OffsetProgressiveCurve**: Progressive/exponential pricing

### Epochs & Utilization
The protocol operates on an **epoch-based system** for tracking bonding rewards and utilization:
- Epochs are fixed time periods
- **Utilization** measures vault activity and influences rewards
- Users earn rewards based on their bonding participation and utilization

---

## Configuration

### Client Configuration

The SDK uses two configuration types:

```typescript
import type { ReadConfig, WriteConfig } from '@0xintuition/protocol'

// For read-only operations
const readConfig: ReadConfig = {
  address: contractAddress, // MultiVault contract address
  publicClient: publicClient,
}

// For write operations (transactions)
const writeConfig: WriteConfig = {
  address: contractAddress,
  publicClient: publicClient,
  walletClient: walletClient,
}
```

### Networks

```typescript
import { intuitionMainnet, intuitionTestnet } from '@0xintuition/protocol'

// Mainnet (Chain ID: 1155)
const mainnetClient = createPublicClient({
  chain: intuitionMainnet,
  transport: http(),
})

// Testnet (Chain ID: 13579)
const testnetClient = createPublicClient({
  chain: intuitionTestnet,
  transport: http(),
})
```

### Contract Addresses

```typescript
import {
  getMultiVaultAddressFromChainId,
  getContractAddressFromChainId,
  intuitionDeployments,
} from '@0xintuition/protocol'

// Get MultiVault address for a chain
const address = getMultiVaultAddressFromChainId(chainId)

// Get any contract address by name
const trustBondingAddress = getContractAddressFromChainId('TrustBonding', chainId)

// Or access all deployments directly
const multiVaultAddress = intuitionDeployments.MultiVault?.[chainId]
const wrappedTrustAddress = intuitionDeployments.WrappedTrust?.[chainId]
```

#### Available Contract Deployments

The `intuitionDeployments` object contains addresses for:

- **Trust** - Native token (deployed on Base: Chain ID 8453)
- **WrappedTrust** - Wrapped version of Trust token
- **MultiVault** - Main protocol contract for atoms, triples, and vaults
- **TrustBonding** - Bonding rewards and epoch management
- **BondingCurveRegistry** - Registry for bonding curves
- **LinearCurve** - Linear bonding curve implementation
- **OffsetProgressiveCurve** - Progressive/exponential bonding curve

**Example: Complete deployment structure**

```typescript
const allDeployments = {
  Trust: {
    8453: '0x6cd905dF2Ed214b22e0d48FF17CD4200C1C6d8A3', // Base
  },
  WrappedTrust: {
    13579: '0xDE80b6EE63f7D809427CA350e30093F436A0fe35', // Testnet
    1155: '0x81cFb09cb44f7184Ad934C09F82000701A4bF672',  // Mainnet
  },
  MultiVault: {
    13579: '0x2Ece8D4dEdcB9918A398528f3fa4688b1d2CAB91', // Testnet
    1155: '0x6E35cF57A41fA15eA0EaE9C33e751b01A784Fe7e',  // Mainnet
  },
  TrustBonding: {
    13579: '0x75dD32b522c89566265eA32ecb50b4Fc4d00ADc7', // Testnet
    1155: '0x635bBD1367B66E7B16a21D6E5A63C812fFC00617',  // Mainnet
  },
  BondingCurveRegistry: {
    13579: '0x2AFC4949Dd3664219AA2c20133771658E93892A1', // Testnet
    1155: '0xd0E488Fb32130232527eedEB72f8cE2BFC0F9930',  // Mainnet
  },
  LinearCurve: {
    13579: '0x6df5eecd9B14E31C98A027b8634876E4805F71B0', // Testnet
    1155: '0xc3eFD5471dc63d74639725f381f9686e3F264366',  // Mainnet
  },
  OffsetProgressiveCurve: {
    13579: '0xE65EcaAF5964aC0d94459A66A59A8B9eBCE42CbB', // Testnet
    1155: '0x23afF95153aa88D28B9B97Ba97629E05D5fD335d',  // Mainnet
  },
}
```

---

## API Reference

### MultiVault Operations

The MultiVault contract manages atoms, triples, vaults, deposits, and redemptions.

#### Atom Management

##### `multiVaultCreateAtoms`
Create one or more atoms with initial deposits.

```typescript
import { multiVaultCreateAtoms } from '@0xintuition/protocol'

const txHash = await multiVaultCreateAtoms(
  { address, walletClient, publicClient },
  {
    args: [
      [atomUri1, atomUri2], // atom URIs (as hex)
      [assets1, assets2],   // deposit amounts
    ],
    value: assets1 + assets2, // total ETH to send
  }
)
```

##### `multiVaultGetAtom`
Query atom details by ID.

```typescript
import { multiVaultGetAtom } from '@0xintuition/protocol'

const atom = await multiVaultGetAtom(
  { address, publicClient },
  { args: [atomId] }
)
// Returns: [id, termData, creatorAtomId]
```

##### `multiVaultGetAtomCost`
Get the base cost to create an atom.

```typescript
import { multiVaultGetAtomCost } from '@0xintuition/protocol'

const cost = await multiVaultGetAtomCost({ address, publicClient })
```

##### `multiVaultPreviewAtomCreate`
Preview atom creation results before executing.

```typescript
import { multiVaultPreviewAtomCreate } from '@0xintuition/protocol'

const [shares, assetsAfterFixedFees, assetsAfterFees] =
  await multiVaultPreviewAtomCreate(
    { address, publicClient, walletClient },
    { args: [atomUri, depositAmount] }
  )
```

##### `multiVaultCreateAtomsEncode`
Encode atom creation call data (for building transactions).

```typescript
import { multiVaultCreateAtomsEncode } from '@0xintuition/protocol'

const data = multiVaultCreateAtomsEncode(
  [atomUri1, atomUri2],
  [assets1, assets2]
)
```

#### Triple Management

##### `multiVaultCreateTriples`
Create one or more triples (statements).

```typescript
import { multiVaultCreateTriples } from '@0xintuition/protocol'

const txHash = await multiVaultCreateTriples(
  { address, walletClient, publicClient },
  {
    args: [
      [subjectId1, subjectId2],   // subject atom IDs
      [predicateId1, predicateId2], // predicate atom IDs
      [objectId1, objectId2],     // object atom IDs
      [assets1, assets2],         // deposit amounts
    ],
    value: assets1 + assets2,
  }
)
```

##### `multiVaultGetTriple`
Query triple details by ID.

```typescript
import { multiVaultGetTriple } from '@0xintuition/protocol'

const triple = await multiVaultGetTriple(
  { address, publicClient },
  { args: [tripleId] }
)
// Returns: [id, subjectId, predicateId, objectId, counterVaultId, creatorAtomId]
```

##### `multiVaultGetTripleCost`
Get the base cost to create a triple.

```typescript
import { multiVaultGetTripleCost } from '@0xintuition/protocol'

const cost = await multiVaultGetTripleCost({ address, publicClient })
```

##### `multiVaultIsTriple`
Check if a vault ID is a triple.

```typescript
import { multiVaultIsTriple } from '@0xintuition/protocol'

const isTriple = await multiVaultIsTriple(
  { address, publicClient },
  { args: [vaultId] }
)
```

##### `multiVaultIsCounterTriple`
Check if two triples are counter-triples (opposing positions).

```typescript
import { multiVaultIsCounterTriple } from '@0xintuition/protocol'

const isCounter = await multiVaultIsCounterTriple(
  { address, publicClient },
  { args: [tripleId1, tripleId2] }
)
```

##### `multiVaultGetInverseTripleId`
Get the counter-triple ID for a given triple.

```typescript
import { multiVaultGetInverseTripleId } from '@0xintuition/protocol'

const inverseId = await multiVaultGetInverseTripleId(
  { address, publicClient },
  { args: [tripleId] }
)
```

##### `multiVaultCreateTriplesEncode`
Encode triple creation call data.

```typescript
import { multiVaultCreateTriplesEncode } from '@0xintuition/protocol'

const data = multiVaultCreateTriplesEncode(
  [subjectId1, subjectId2],
  [predicateId1, predicateId2],
  [objectId1, objectId2],
  [assets1, assets2]
)
```

#### Vault Operations

##### `multiVaultDeposit`
Deposit assets into a vault and receive shares.

```typescript
import { multiVaultDeposit } from '@0xintuition/protocol'

const txHash = await multiVaultDeposit(
  { address, walletClient, publicClient },
  {
    args: [
      receiverAddress, // address to receive shares
      vaultId,         // vault (atom or triple) ID
      curveId,         // bonding curve ID
      minShares,       // minimum shares to receive
    ],
    value: depositAmount, // ETH to deposit
  }
)
```

##### `multiVaultDepositBatch`
Deposit into multiple vaults in a single transaction.

```typescript
import { multiVaultDepositBatch } from '@0xintuition/protocol'

const txHash = await multiVaultDepositBatch(
  { address, walletClient, publicClient },
  {
    args: [
      receiverAddress,
      [vaultId1, vaultId2],     // vault IDs
      [curveId1, curveId2],     // curve IDs
      [assets1, assets2],       // deposit amounts
      [minShares1, minShares2], // min shares per vault
    ],
    value: assets1 + assets2,
  }
)
```

##### `multiVaultRedeem`
Redeem shares from a vault to get assets back.

```typescript
import { multiVaultRedeem } from '@0xintuition/protocol'

const txHash = await multiVaultRedeem(
  { address, walletClient, publicClient },
  {
    args: [
      receiverAddress, // address to receive assets
      vaultId,
      curveId,
      shares,          // shares to redeem
      minAssets,       // minimum assets to receive
    ],
  }
)
```

##### `multiVaultRedeemBatch`
Redeem shares from multiple vaults in a single transaction.

```typescript
import { multiVaultRedeemBatch } from '@0xintuition/protocol'

const txHash = await multiVaultRedeemBatch(
  { address, walletClient, publicClient },
  {
    args: [
      [shares1, shares2],       // shares per vault
      receiverAddress,
      [vaultId1, vaultId2],
      [curveId1, curveId2],
      [minAssets1, minAssets2],
    ],
  }
)
```

##### `multiVaultPreviewDeposit`
Preview deposit results before executing.

```typescript
import { multiVaultPreviewDeposit } from '@0xintuition/protocol'

const shares = await multiVaultPreviewDeposit(
  { address, publicClient },
  { args: [vaultId, curveId, assets] }
)
```

##### `multiVaultPreviewRedeem`
Preview redemption results before executing.

```typescript
import { multiVaultPreviewRedeem } from '@0xintuition/protocol'

const assets = await multiVaultPreviewRedeem(
  { address, publicClient },
  { args: [vaultId, curveId, shares] }
)
```

##### `multiVaultDepositEncode` / `multiVaultRedeemEncode`
Encode deposit/redeem call data.

```typescript
import {
  multiVaultDepositEncode,
  multiVaultRedeemEncode,
} from '@0xintuition/protocol'

const depositData = multiVaultDepositEncode(
  receiver, termId, curveId, minShares
)

const redeemData = multiVaultRedeemEncode(
  receiver, termId, curveId, shares, minAssets
)
```

##### `multiVaultDepositBatchEncode` / `multiVaultRedeemBatchEncode`
Encode batch deposit/redeem call data.

```typescript
import {
  multiVaultDepositBatchEncode,
  multiVaultRedeemBatchEncode,
} from '@0xintuition/protocol'

const depositBatchData = multiVaultDepositBatchEncode(
  receiver,
  [termId1, termId2],
  [curveId1, curveId2],
  [assets1, assets2],
  [minShares1, minShares2]
)

const redeemBatchData = multiVaultRedeemBatchEncode(
  receiver,
  [termId1, termId2],
  [curveId1, curveId2],
  [shares1, shares2],
  [minAssets1, minAssets2]
)
```

#### Share & Asset Conversions

##### `multiVaultConvertToShares`
Convert asset amount to shares.

```typescript
import { multiVaultConvertToShares } from '@0xintuition/protocol'

const shares = await multiVaultConvertToShares(
  { address, publicClient },
  { args: [vaultId, curveId, assets] }
)
```

##### `multiVaultConvertToAssets`
Convert shares to asset amount.

```typescript
import { multiVaultConvertToAssets } from '@0xintuition/protocol'

const assets = await multiVaultConvertToAssets(
  { address, publicClient },
  { args: [vaultId, curveId, shares] }
)
```

##### `multiVaultGetShares`
Get user's share balance in a vault.

```typescript
import { multiVaultGetShares } from '@0xintuition/protocol'

const shares = await multiVaultGetShares(
  { address, publicClient },
  { args: [userAddress, vaultId] }
)
```

##### `multiVaultCurrentSharePrice`
Get current share price for a vault.

```typescript
import { multiVaultCurrentSharePrice } from '@0xintuition/protocol'

const price = await multiVaultCurrentSharePrice(
  { address, publicClient },
  { args: [vaultId, curveId] }
)
```

##### `multiVaultMaxRedeem`
Get maximum redeemable shares for a user.

```typescript
import { multiVaultMaxRedeem } from '@0xintuition/protocol'

const maxShares = await multiVaultMaxRedeem(
  { address, publicClient },
  { args: [userAddress, vaultId] }
)
```

#### Configuration Queries

##### `multiVaultGetGeneralConfig`
Get general protocol configuration.

```typescript
import { multiVaultGetGeneralConfig } from '@0xintuition/protocol'

const config = await multiVaultGetGeneralConfig({ address, publicClient })
// Returns: { admin, protocolVault, feeDenominator, minDeposit, minShare }
```

##### `multiVaultGetAtomConfig`
Get atom-specific configuration.

```typescript
import { multiVaultGetAtomConfig } from '@0xintuition/protocol'

const atomConfig = await multiVaultGetAtomConfig({ address, publicClient })
// Returns: { atomUriMaxLength, atomCreationProtocolFee, atomCost, atomWalletInitialDepositAmount }
```

##### `multiVaultGetTripleConfig`
Get triple-specific configuration.

```typescript
import { multiVaultGetTripleConfig } from '@0xintuition/protocol'

const tripleConfig = await multiVaultGetTripleConfig({ address, publicClient })
// Returns: { tripleCreationProtocolFee, atomDepositFractionOnTripleCreation, atomDepositFractionForTriple }
```

##### `multiVaultGetBondingCurveConfig`
Get bonding curve configuration.

```typescript
import { multiVaultGetBondingCurveConfig } from '@0xintuition/protocol'

const curveConfig = await multiVaultGetBondingCurveConfig({ address, publicClient })
// Returns: { registry }
```

##### `multiVaultGetWalletConfig`
Get wallet configuration.

```typescript
import { multiVaultGetWalletConfig } from '@0xintuition/protocol'

const walletConfig = await multiVaultGetWalletConfig({ address, publicClient })
// Returns: { atomWarden, atomWalletFactory }
```

##### `multiVaultMultiCallIntuitionConfigs`
Get all configurations in a single multicall.

```typescript
import { multiVaultMultiCallIntuitionConfigs } from '@0xintuition/protocol'

const allConfigs = await multiVaultMultiCallIntuitionConfigs({ address, publicClient })
// Returns all general, atom, triple, vault fee, bonding curve, and wallet configs
```

#### Fee Calculations

##### `multiVaultEntryFeeAmount`
Calculate entry fee for a deposit.

```typescript
import { multiVaultEntryFeeAmount } from '@0xintuition/protocol'

const entryFee = await multiVaultEntryFeeAmount(
  { address, publicClient },
  { args: [vaultId, assets] }
)
```

##### `multiVaultExitFeeAmount`
Calculate exit fee for a redemption.

```typescript
import { multiVaultExitFeeAmount } from '@0xintuition/protocol'

const exitFee = await multiVaultExitFeeAmount(
  { address, publicClient },
  { args: [vaultId, assets] }
)
```

##### `multiVaultProtocolFeeAmount`
Calculate protocol fee.

```typescript
import { multiVaultProtocolFeeAmount } from '@0xintuition/protocol'

const protocolFee = await multiVaultProtocolFeeAmount(
  { address, publicClient },
  { args: [vaultId, assets] }
)
```

##### `multiVaultAtomDepositFractionAmount`
Calculate atom deposit fraction for triple creation.

```typescript
import { multiVaultAtomDepositFractionAmount } from '@0xintuition/protocol'

const fraction = await multiVaultAtomDepositFractionAmount(
  { address, publicClient },
  { args: [assets] }
)
```

#### Epoch & Utilization

##### `multiVaultCurrentEpoch`
Get the current epoch number.

```typescript
import { multiVaultCurrentEpoch } from '@0xintuition/protocol'

const epoch = await multiVaultCurrentEpoch({ address, publicClient })
```

##### `multiVaultGetTotalUtilizationForEpoch`
Get total protocol utilization for an epoch.

```typescript
import { multiVaultGetTotalUtilizationForEpoch } from '@0xintuition/protocol'

const totalUtil = await multiVaultGetTotalUtilizationForEpoch(
  { address, publicClient },
  { args: [epochNumber] }
)
```

##### `multiVaultGetUserUtilizationForEpoch`
Get user's utilization for an epoch.

```typescript
import { multiVaultGetUserUtilizationForEpoch } from '@0xintuition/protocol'

const userUtil = await multiVaultGetUserUtilizationForEpoch(
  { address, publicClient },
  { args: [userAddress, epochNumber] }
)
```

##### `multiVaultGetUserUtilizationInEpoch`
Get user's utilization in a specific epoch.

```typescript
import { multiVaultGetUserUtilizationInEpoch } from '@0xintuition/protocol'

const util = await multiVaultGetUserUtilizationInEpoch(
  { address, publicClient },
  { args: [userAddress, vaultId, epochNumber] }
)
```

##### `multiVaultGetUserLastActiveEpoch`
Get user's last active epoch.

```typescript
import { multiVaultGetUserLastActiveEpoch } from '@0xintuition/protocol'

const lastEpoch = await multiVaultGetUserLastActiveEpoch(
  { address, publicClient },
  { args: [userAddress] }
)
```

#### Vault Queries

##### `multiVaultGetVault`
Get vault details.

```typescript
import { multiVaultGetVault } from '@0xintuition/protocol'

const vault = await multiVaultGetVault(
  { address, publicClient },
  { args: [vaultId] }
)
```

##### `multiVaultGetVaultType`
Get vault type (atom or triple).

```typescript
import { multiVaultGetVaultType } from '@0xintuition/protocol'

const vaultType = await multiVaultGetVaultType(
  { address, publicClient },
  { args: [vaultId] }
)
```

##### `multiVaultIsTermCreated`
Check if a term (atom/triple) has been created.

```typescript
import { multiVaultIsTermCreated } from '@0xintuition/protocol'

const isCreated = await multiVaultIsTermCreated(
  { address, publicClient },
  { args: [termData] }
)
```

---

### TrustBonding System

The TrustBonding contract manages epoch-based rewards and bonding mechanics.

#### Epoch Management

##### `trustBondingCurrentEpoch`
Get the current epoch number.

```typescript
import { trustBondingCurrentEpoch } from '@0xintuition/protocol'

const epoch = await trustBondingCurrentEpoch({ address, publicClient })
```

##### `trustBondingPreviousEpoch`
Get the previous epoch number.

```typescript
import { trustBondingPreviousEpoch } from '@0xintuition/protocol'

const prevEpoch = await trustBondingPreviousEpoch({ address, publicClient })
```

##### `trustBondingEpochAtTimestamp`
Get the epoch number for a specific timestamp.

```typescript
import { trustBondingEpochAtTimestamp } from '@0xintuition/protocol'

const epoch = await trustBondingEpochAtTimestamp(
  { address, publicClient },
  { args: [timestamp] }
)
```

##### `trustBondingEpochTimestampEnd`
Get the end timestamp for an epoch.

```typescript
import { trustBondingEpochTimestampEnd } from '@0xintuition/protocol'

const endTime = await trustBondingEpochTimestampEnd(
  { address, publicClient },
  { args: [epochNumber] }
)
```

##### `trustBondingEpochLength`
Get the length of an epoch in seconds.

```typescript
import { trustBondingEpochLength } from '@0xintuition/protocol'

const length = await trustBondingEpochLength({ address, publicClient })
```

##### `trustBondingEpochsPerYear`
Get the number of epochs per year.

```typescript
import { trustBondingEpochsPerYear } from '@0xintuition/protocol'

const epochsPerYear = await trustBondingEpochsPerYear({ address, publicClient })
```

#### Balance Queries

##### `trustBondingTotalBondedBalance`
Get the total bonded balance across all users.

```typescript
import { trustBondingTotalBondedBalance } from '@0xintuition/protocol'

const totalBonded = await trustBondingTotalBondedBalance({ address, publicClient })
```

##### `trustBondingTotalBondedBalanceAtEpochEnd`
Get total bonded balance at the end of an epoch.

```typescript
import { trustBondingTotalBondedBalanceAtEpochEnd } from '@0xintuition/protocol'

const balance = await trustBondingTotalBondedBalanceAtEpochEnd(
  { address, publicClient },
  { args: [epochNumber] }
)
```

##### `trustBondingUserBondedBalanceAtEpochEnd`
Get user's bonded balance at the end of an epoch.

```typescript
import { trustBondingUserBondedBalanceAtEpochEnd } from '@0xintuition/protocol'

const userBalance = await trustBondingUserBondedBalanceAtEpochEnd(
  { address, publicClient },
  { args: [userAddress, epochNumber] }
)
```

##### `trustBondingTotalLocked`
Get total locked amount.

```typescript
import { trustBondingTotalLocked } from '@0xintuition/protocol'

const locked = await trustBondingTotalLocked({ address, publicClient })
```

#### Reward Calculations

##### `trustBondingGetUserApy`
Get user's annual percentage yield (APY).

```typescript
import { trustBondingGetUserApy } from '@0xintuition/protocol'

const userApy = await trustBondingGetUserApy(
  { address, publicClient },
  { args: [userAddress] }
)
```

##### `trustBondingGetSystemApy`
Get system-wide APY.

```typescript
import { trustBondingGetSystemApy } from '@0xintuition/protocol'

const systemApy = await trustBondingGetSystemApy({ address, publicClient })
```

##### `trustBondingGetUserCurrentClaimableRewards`
Get user's currently claimable rewards.

```typescript
import { trustBondingGetUserCurrentClaimableRewards } from '@0xintuition/protocol'

const rewards = await trustBondingGetUserCurrentClaimableRewards(
  { address, publicClient },
  { args: [userAddress] }
)
```

##### `trustBondingGetUserRewardsForEpoch`
Get user's rewards for a specific epoch.

```typescript
import { trustBondingGetUserRewardsForEpoch } from '@0xintuition/protocol'

const epochRewards = await trustBondingGetUserRewardsForEpoch(
  { address, publicClient },
  { args: [userAddress, epochNumber] }
)
```

##### `trustBondingGetUnclaimedRewardsForEpoch`
Get unclaimed system rewards for an epoch.

```typescript
import { trustBondingGetUnclaimedRewardsForEpoch } from '@0xintuition/protocol'

const unclaimed = await trustBondingGetUnclaimedRewardsForEpoch(
  { address, publicClient },
  { args: [epochNumber] }
)
```

##### `trustBondingUserEligibleRewardsForEpoch`
Get eligible rewards for a user in an epoch.

```typescript
import { trustBondingUserEligibleRewardsForEpoch } from '@0xintuition/protocol'

const eligible = await trustBondingUserEligibleRewardsForEpoch(
  { address, publicClient },
  { args: [userAddress, epochNumber] }
)
```

##### `trustBondingHasClaimedRewardsForEpoch`
Check if user has claimed rewards for an epoch.

```typescript
import { trustBondingHasClaimedRewardsForEpoch } from '@0xintuition/protocol'

const hasClaimed = await trustBondingHasClaimedRewardsForEpoch(
  { address, publicClient },
  { args: [userAddress, epochNumber] }
)
```

#### Utilization Metrics

##### `trustBondingGetSystemUtilizationRatio`
Get system-wide utilization ratio.

```typescript
import { trustBondingGetSystemUtilizationRatio } from '@0xintuition/protocol'

const ratio = await trustBondingGetSystemUtilizationRatio({ address, publicClient })
```

##### `trustBondingGetPersonalUtilizationRatio`
Get user's personal utilization ratio.

```typescript
import { trustBondingGetPersonalUtilizationRatio } from '@0xintuition/protocol'

const personalRatio = await trustBondingGetPersonalUtilizationRatio(
  { address, publicClient },
  { args: [userAddress] }
)
```

#### User Info

##### `trustBondingGetUserInfo`
Get comprehensive user bonding information.

```typescript
import { trustBondingGetUserInfo } from '@0xintuition/protocol'

const userInfo = await trustBondingGetUserInfo(
  { address, publicClient },
  { args: [userAddress] }
)
// Returns: { bondedBalance, lastActiveEpoch, claimedEpochs, ... }
```

##### `trustBondingEmissionsForEpoch`
Get total emissions for an epoch.

```typescript
import { trustBondingEmissionsForEpoch } from '@0xintuition/protocol'

const emissions = await trustBondingEmissionsForEpoch(
  { address, publicClient },
  { args: [epochNumber] }
)
```

---

### WrappedTrust

Wrap and unwrap native TRUST tokens.

##### `wrappedTrustDeposit`
Deposit native TRUST to receive wrapped TRUST.

```typescript
import { wrappedTrustDeposit } from '@0xintuition/protocol'

const txHash = await wrappedTrustDeposit(
  { address: wrappedTrustAddress, walletClient, publicClient },
  { args: [], value: trustAmount }
)
```

##### `wrappedTrustWithdraw`
Withdraw wrapped TRUST to receive native TRUST.

```typescript
import { wrappedTrustWithdraw } from '@0xintuition/protocol'

const txHash = await wrappedTrustWithdraw(
  { address: wrappedTrustAddress, walletClient, publicClient },
  { args: [amount] }
)
```

---

### Event Parsing

Parse transaction events to extract emitted data.

#### Core Events

##### `eventParseAtomCreated`
Parse AtomCreated events from a transaction.

```typescript
import { eventParseAtomCreated } from '@0xintuition/protocol'

const events = await eventParseAtomCreated(publicClient, txHash)
// Returns array of { args: { termId, termData, creatorAtomId, ... }, ... }
```

##### `eventParseTripleCreated`
Parse TripleCreated events.

```typescript
import { eventParseTripleCreated } from '@0xintuition/protocol'

const events = await eventParseTripleCreated(publicClient, txHash)
// Returns: { args: { tripleId, subjectId, predicateId, objectId, ... }, ... }
```

##### `eventParseDeposited`
Parse Deposited events.

```typescript
import { eventParseDeposited } from '@0xintuition/protocol'

const events = await eventParseDeposited(publicClient, txHash)
// Returns: { args: { sender, receiver, vaultId, assets, shares, ... }, ... }
```

##### `eventParseRedeemed`
Parse Redeemed events.

```typescript
import { eventParseRedeemed } from '@0xintuition/protocol'

const events = await eventParseRedeemed(publicClient, txHash)
// Returns: { args: { sender, receiver, vaultId, assets, shares, ... }, ... }
```

#### Configuration Events

```typescript
import {
  eventParseAtomConfigUpdate,
  eventParseGeneralConfigUpdated,
  eventParseBondingCurveConfigUpdated,
  eventParseWalletConfigUpdated,
} from '@0xintuition/protocol'
```

#### Fee Events

```typescript
import {
  eventParseVaultFeesUpdated,
  eventParseProtocolFeeAccrued,
  eventParseAtomWalletDepositFeeCollected,
  eventParseAtomWalletDepositFeesClaimed,
} from '@0xintuition/protocol'
```

#### Utilization Events

```typescript
import {
  eventParseTotalUtilizationAdded,
  eventParseTotalUtilizationRemoved,
  eventParsePersonalUtilizationAdded,
  eventParsePersonalUtilizationRemoved,
} from '@0xintuition/protocol'
```

#### Market Events

```typescript
import { eventParseSharePriceChanged } from '@0xintuition/protocol'
```

#### Generic Event Parser

```typescript
import { eventParse, MultiVaultAbi } from '@0xintuition/protocol'

// Parse any MultiVault event by name
const events = await eventParse(
  publicClient,
  txHash,
  MultiVaultAbi,
  'EventName'
)
```

---

## Code Examples

### Example 1: Complete Atom Creation Flow

```typescript
import {
  intuitionTestnet,
  getMultiVaultAddressFromChainId,
  multiVaultCreateAtoms,
  multiVaultGetAtomCost,
  multiVaultGetAtom,
  eventParseAtomCreated,
} from '@0xintuition/protocol'
import { createPublicClient, createWalletClient, http, toHex, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// 1. Setup
const account = privateKeyToAccount('0x...')
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

// 2. Get atom creation cost
const atomCost = await multiVaultGetAtomCost({ address, publicClient })
console.log('Atom cost:', atomCost)

// 3. Add optional initial deposit
const initialDeposit = parseEther('0.1')
const totalAssets = atomCost + initialDeposit

// 4. Create atom
const atomUri = toHex('ethereum:0x1234567890123456789012345678901234567890')
const txHash = await multiVaultCreateAtoms(
  { address, walletClient, publicClient },
  {
    args: [[atomUri], [totalAssets]],
    value: totalAssets,
  }
)

console.log('Transaction:', txHash)

// 5. Parse events to get atom ID
const events = await eventParseAtomCreated(publicClient, txHash)
const atomId = events[0].args.termId
console.log('Atom ID:', atomId)

// 6. Query atom details
const atom = await multiVaultGetAtom(
  { address, publicClient },
  { args: [atomId] }
)
console.log('Atom details:', atom)
```

### Example 2: Creating a Statement (Triple)

```typescript
import {
  multiVaultCreateTriples,
  multiVaultGetTripleCost,
  eventParseTripleCreated,
  multiVaultGetTriple,
} from '@0xintuition/protocol'
import { parseEther } from 'viem'

// Assume we have atoms: Alice, knows, Bob with their term IDs
const subjectId = '0x1234567890123456789012345678901234567890123456789012345678901234' // Alice
const predicateId = '0x2345678901234567890123456789012345678901234567890123456789012345' // knows
const objectId = '0x3456789012345678901234567890123456789012345678901234567890123456' // Bob

// 1. Get triple cost
const tripleCost = await multiVaultGetTripleCost({ address, publicClient })

// 2. Add initial deposit
const deposit = parseEther('0.05')
const totalAssets = tripleCost + deposit

// 3. Create triple
const txHash = await multiVaultCreateTriples(
  { address, walletClient, publicClient },
  {
    args: [
      [subjectId],
      [predicateId],
      [objectId],
      [totalAssets],
    ],
    value: totalAssets,
  }
)

// 4. Parse triple created event
const events = await eventParseTripleCreated(publicClient, txHash)
const tripleId = events[0].args.tripleId
console.log('Created triple ID:', tripleId)

// 5. Query triple details
const triple = await multiVaultGetTriple(
  { address, publicClient },
  { args: [tripleId] }
)
console.log('Triple:', {
  id: triple[0],
  subject: triple[1],
  predicate: triple[2],
  object: triple[3],
  counterVault: triple[4],
})
```

### Example 3: Depositing to a Vault

```typescript
import {
  multiVaultDeposit,
  multiVaultPreviewDeposit,
  multiVaultGetShares,
  eventParseDeposited,
} from '@0xintuition/protocol'
import { parseEther } from 'viem'

const vaultId = '0x1234567890123456789012345678901234567890123456789012345678901234' // Atom or triple ID
const curveId = 1 // Curve ID (1 = LinearCurve, 2 = OffsetProgressiveCurve)
const depositAmount = parseEther('1')

// 1. Preview deposit to see expected shares
const expectedShares = await multiVaultPreviewDeposit(
  { address, publicClient },
  { args: [vaultId, curveId, depositAmount] }
)
console.log('Expected shares:', expectedShares)

// 2. Execute deposit (with 1% slippage tolerance)
const minShares = (expectedShares * 99n) / 100n
const txHash = await multiVaultDeposit(
  { address, walletClient, publicClient },
  {
    args: [account.address, vaultId, curveId, minShares],
    value: depositAmount,
  }
)

// 3. Parse deposit event
const events = await eventParseDeposited(publicClient, txHash)
const actualShares = events[0].args.shares
console.log('Actual shares received:', actualShares)

// 4. Check share balance
const balance = await multiVaultGetShares(
  { address, publicClient },
  { args: [account.address, vaultId] }
)
console.log('Total shares:', balance)
```

### Example 4: Batch Operations

```typescript
import {
  multiVaultDepositBatch,
  multiVaultGetGeneralConfig,
  eventParseDeposited,
} from '@0xintuition/protocol'
import { parseEther } from 'viem'

// 1. Get min deposit requirement
const { minDeposit } = await multiVaultGetGeneralConfig({ address, publicClient })

// 2. Prepare batch deposit
const vaults = [
  '0x1234567890123456789012345678901234567890123456789012345678901234',
  '0x2345678901234567890123456789012345678901234567890123456789012345',
  '0x3456789012345678901234567890123456789012345678901234567890123456'
]
const curves = [1, 1, 2] // Mix of LinearCurve (1) and OffsetProgressiveCurve (2)
const deposits = [parseEther('0.5'), parseEther('1'), parseEther('0.25')]
const minShares = [0n, 0n, 0n] // Accept any amount (for simplicity)

const totalValue = deposits.reduce((a, b) => a + b, 0n)

// 3. Execute batch deposit
const txHash = await multiVaultDepositBatch(
  { address, walletClient, publicClient },
  {
    args: [account.address, vaults, curves, deposits, minShares],
    value: totalValue,
  }
)

// 4. Parse all deposit events
const events = await eventParseDeposited(publicClient, txHash)
events.forEach((event, i) => {
  console.log(`Vault ${event.args.vaultId}: ${event.args.shares} shares`)
})
```

### Example 5: Checking Bonding Rewards

```typescript
import {
  trustBondingCurrentEpoch,
  trustBondingGetUserApy,
  trustBondingGetUserCurrentClaimableRewards,
  trustBondingGetUserInfo,
  getContractAddressFromChainId,
} from '@0xintuition/protocol'

// Get TrustBonding contract address
const bondingAddress = getContractAddressFromChainId(
  'TrustBonding',
  intuitionTestnet.id
)

// 1. Get current epoch
const currentEpoch = await trustBondingCurrentEpoch({
  address: bondingAddress,
  publicClient,
})
console.log('Current epoch:', currentEpoch)

// 2. Get user APY
const userApy = await trustBondingGetUserApy(
  { address: bondingAddress, publicClient },
  { args: [account.address] }
)
console.log('User APY:', userApy)

// 3. Check claimable rewards
const claimable = await trustBondingGetUserCurrentClaimableRewards(
  { address: bondingAddress, publicClient },
  { args: [account.address] }
)
console.log('Claimable rewards:', claimable)

// 4. Get detailed user info
const userInfo = await trustBondingGetUserInfo(
  { address: bondingAddress, publicClient },
  { args: [account.address] }
)
console.log('User bonding info:', userInfo)
```

### Example 6: Event Parsing from Transaction

```typescript
import {
  multiVaultCreateAtoms,
  eventParseAtomCreated,
  eventParseDeposited,
  eventParseSharePriceChanged,
} from '@0xintuition/protocol'
import { toHex, parseEther } from 'viem'

// Execute a transaction
const txHash = await multiVaultCreateAtoms(
  { address, walletClient, publicClient },
  {
    args: [[toHex('example')], [parseEther('1')]],
    value: parseEther('1'),
  }
)

// Parse multiple event types from the same transaction
const atomEvents = await eventParseAtomCreated(publicClient, txHash)
const depositEvents = await eventParseDeposited(publicClient, txHash)
const priceEvents = await eventParseSharePriceChanged(publicClient, txHash)

console.log('Atom created:', atomEvents[0]?.args.termId)
console.log('Initial deposit shares:', depositEvents[0]?.args.shares)
console.log('Share price:', priceEvents[0]?.args.newPrice)
```

---

## TypeScript Types

### Configuration Types

```typescript
import type { ReadConfig, WriteConfig } from '@0xintuition/protocol'

// Read-only operations
type ReadConfig = {
  address: Address
  publicClient: PublicClient
}

// Write operations (transactions)
type WriteConfig = {
  address: Address
  publicClient: PublicClient
  walletClient: WalletClient
}
```

### Protocol Configuration

```typescript
import type { MultivaultConfig } from '@0xintuition/protocol'

type MultivaultConfig = {
  atom_cost: string
  formatted_atom_cost: string
  triple_cost: string
  formatted_triple_cost: string
  atom_wallet_initial_deposit_amount: string
  formatted_atom_wallet_initial_deposit_amount: string
  atom_creation_protocol_fee: string
  formatted_atom_creation_protocol_fee: string
  triple_creation_protocol_fee: string
  formatted_triple_creation_protocol_fee: string
  atom_deposit_fraction_on_triple_creation: string
  formatted_atom_deposit_fraction_on_triple_creation: string
  atom_deposit_fraction_for_triple: string
  formatted_atom_deposit_fraction_for_triple: string
  entry_fee: string
  formatted_entry_fee: string
  exit_fee: string
  formatted_exit_fee: string
  protocol_fee: string
  formatted_protocol_fee: string
  fee_denominator: string
  formatted_fee_denominator: string
  min_deposit: string
  formatted_min_deposit: string
}
```

### Vault Types

```typescript
import type { VaultDetailsType, IdentityVaultDetailsType, Vault } from '@0xintuition/protocol'

type VaultDetailsType = {
  assets_sum: string
  formatted_assets_sum: string
  conviction_sum: string
  formatted_conviction_sum: string
  conviction_price: string
  formatted_conviction_price: string
  user_conviction?: string
  formatted_user_conviction?: string
  user_assets?: string
  formatted_user_assets?: string
  // For triples: against/counter vault data
  against_assets_sum?: string
  formatted_against_assets_sum?: string
  against_conviction_sum?: string
  formatted_against_conviction_sum?: string
  against_conviction_price?: string
  formatted_against_conviction_price?: string
  user_conviction_against?: string
  formatted_user_conviction_against?: string
  user_assets_against?: string
  formatted_user_assets_against?: string
  // Fee configuration
  entry_fee: string
  formatted_entry_fee: string
  exit_fee: string
  formatted_exit_fee: string
  protocol_fee: string
  formatted_protocol_fee: string
  admin: string
  protocol_vault: string
  fee_denominator: string
  min_deposit: string
  formatted_min_deposit: string
  min_share: string
  formatted_min_share: string
  // Atom/Triple specific fields
  atom_cost?: string
  formatted_atom_cost?: string
  triple_cost?: string
  formatted_triple_cost?: string
  atom_creation_fee?: string
  formatted_atom_creation_fee?: string
  isTriple?: boolean
  triple_creation_fee?: string
  formatted_triple_creation_fee?: string
  atom_deposit_fraction_on_triple_creation?: string
  formatted_atom_deposit_fraction_on_triple_creation?: string
  atom_deposit_fraction_for_triple?: string
  formatted_atom_deposit_fraction_for_triple?: string
}

type IdentityVaultDetailsType = {
  vault_id: string
  assets_sum: string
  formatted_assets_sum: string
  conviction_sum: string
  formatted_conviction_sum: string
  conviction_price: string
  formatted_conviction_price: string
  entry_fee: string
  formatted_entry_fee: string
  exit_fee: string
  formatted_exit_fee: string
  protocol_fee: string
  formatted_protocol_fee: string
  admin: string
  protocol_vault: string
  fee_denominator: string
  formatted_fee_denominator: string
  min_deposit: string
  formatted_min_deposit: string
  min_share: string
  formatted_min_share: string
  atom_cost: string
  formatted_atom_cost: string
  atom_creation_fee: string
  formatted_atom_creation_fee: string
  user_conviction?: string
  formatted_user_conviction?: string
  user_assets?: string
  formatted_user_assets?: string
}

type Vault = {
  __typename?: 'vaults'
  total_shares: string | number
  current_share_price: string | number
  min_deposit?: string | number
  position_count?: number
  allPositions?: {
    aggregate?: {
      count: number
      sum?: {
        shares: string | number
      }
    }
  }
}
```

### Curve Types

```typescript
import type { CurveDetailsType } from '@0xintuition/protocol'

type CurveDetailsType = {
  curve_id: string
  assets_sum: string
  formatted_assets_sum: string
  shares_sum: string
  formatted_shares_sum: string
  share_price: string
  formatted_share_price: string
  market_cap: string
  formatted_market_cap: string
  // ... user-specific and fee fields
}
```

---

## Contract ABIs

The package exports ABIs and bytecodes for all protocol contracts:

```typescript
import {
  AtomWalletAbi,
  AtomWalletFactoryAbi,
  BaseEmissionsControllerAbi,
  BondingCurveRegistryAbi,
  LinearCurveAbi,
  MultiVaultAbi,
  OffsetProgressiveCurveAbi,
  SatelliteEmissionsControllerAbi,
  TransparentUpgradeableProxyAbi,
  TrustAbi,
  TrustBondingAbi,
  WrappedTrustAbi,
} from '@0xintuition/protocol'
```

### Using ABIs with Viem

```typescript
import { MultiVaultAbi, getMultiVaultAddressFromChainId } from '@0xintuition/protocol'
import { getContract } from 'viem'

// Create contract instance
const multiVault = getContract({
  address: getMultiVaultAddressFromChainId(intuitionTestnet.id),
  abi: MultiVaultAbi,
  client: { public: publicClient, wallet: walletClient },
})

// Use contract directly
const atomCost = await multiVault.read.getAtomCost()
const txHash = await multiVault.write.createAtoms(
  [[toHex('example')], [atomCost]],
  { value: atomCost }
)
```

---

## Networks & Deployments

### Supported Networks

#### Intuition Mainnet

```typescript
import { intuitionMainnet } from '@0xintuition/protocol'

// Chain ID: 1155
// Name: Intuition
// Native Currency: TRUST (18 decimals)
// RPC: https://rpc.intuition.systems/http
// WebSocket: wss://rpc.intuition.systems/ws
// Explorer: https://explorer.intuition.systems
```

#### Intuition Testnet

```typescript
import { intuitionTestnet } from '@0xintuition/protocol'

// Chain ID: 13579
// Name: Intuition Testnet
// Native Currency: tTRUST (18 decimals)
// RPC: https://testnet.rpc.intuition.systems/http
// WebSocket: wss://testnet.rpc.intuition.systems/ws
// Explorer: https://testnet.explorer.intuition.systems
```

### Contract Addresses

```typescript
import {
  intuitionDeployments,
  getMultiVaultAddressFromChainId,
  getContractAddressFromChainId,
} from '@0xintuition/protocol'

// Get MultiVault address
const multiVaultAddress = getMultiVaultAddressFromChainId(1155) // mainnet
const testnetMultiVault = getMultiVaultAddressFromChainId(13579) // testnet

// Get other contract addresses
const trustBonding = getContractAddressFromChainId('TrustBonding', 1155)
const wrappedTrust = getContractAddressFromChainId('WrappedTrust', 1155)

// Access all deployments
const allDeployments = intuitionDeployments
/*
{
  MultiVault: { 1155: '0x...', 13579: '0x...' },
  TrustBonding: { 1155: '0x...', 13579: '0x...' },
  WrappedTrust: { 1155: '0x...', 13579: '0x...' },
  BondingCurveRegistry: { ... },
  LinearCurve: { ... },
  OffsetProgressiveCurve: { ... },
  // ... etc
}
*/
```

### Utility Functions

The SDK provides helper functions to simplify contract address lookups across different chains.

#### `getMultiVaultAddressFromChainId`

Get the MultiVault contract address for a specific chain. This is the most commonly used utility since MultiVault is the main protocol contract.

```typescript
import { getMultiVaultAddressFromChainId, intuitionMainnet, intuitionTestnet } from '@0xintuition/protocol'

// Get mainnet MultiVault address
const mainnetAddress = getMultiVaultAddressFromChainId(intuitionMainnet.id) // 1155
// Returns: '0x6E35cF57A41fA15eA0EaE9C33e751b01A784Fe7e'

// Get testnet MultiVault address
const testnetAddress = getMultiVaultAddressFromChainId(intuitionTestnet.id) // 13579
// Returns: '0x2Ece8D4dEdcB9918A398528f3fa4688b1d2CAB91'
```

#### `getContractAddressFromChainId`

Get any protocol contract address by name and chain ID. This is a more generic utility for accessing other contract addresses.

```typescript
import { getContractAddressFromChainId } from '@0xintuition/protocol'

// Get TrustBonding contract address
const trustBonding = getContractAddressFromChainId('TrustBonding', 1155)

// Get WrappedTrust contract address
const wrappedTrust = getContractAddressFromChainId('WrappedTrust', 13579)

// Get bonding curve contracts
const linearCurve = getContractAddressFromChainId('LinearCurve', 1155)
const progressiveCurve = getContractAddressFromChainId('OffsetProgressiveCurve', 1155)
```

**Supported contract names:**
- `'Trust'` - Native TRUST token (only on Base: 8453)
- `'WrappedTrust'` - Wrapped TRUST token
- `'MultiVault'` - Main protocol contract
- `'TrustBonding'` - Bonding and rewards contract
- `'BondingCurveRegistry'` - Curve registry
- `'LinearCurve'` - Linear bonding curve
- `'OffsetProgressiveCurve'` - Progressive bonding curve

**When to use each utility:**
- Use `getMultiVaultAddressFromChainId` for most protocol operations (atoms, triples, deposits, redeems)
- Use `getContractAddressFromChainId` when interacting with TrustBonding, WrappedTrust, or bonding curves
- For direct access without helper functions, use `intuitionDeployments` object

---

## Development

### Building

```bash
pnpm build
```

### Testing

```bash
# Run tests
pnpm test

# Run tests with environment variables
pnpm with-env vitest
```

### Linting & Formatting

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:fix
```

### Project Structure

```
packages/protocol/
├── src/
│   ├── contracts/        # Contract ABIs and bytecodes
│   ├── core/
│   │   ├── multivault/   # MultiVault functions
│   │   ├── trustbonding/ # TrustBonding functions
│   │   └── wrapped-trust/ # WrappedTrust functions
│   ├── events/           # Event parsing utilities
│   │   └── multivault/
│   ├── utils/            # Helper utilities
│   ├── deployments.ts    # Contract addresses
│   ├── networks.ts       # Network definitions
│   ├── types.ts          # TypeScript types
│   └── index.ts          # Main exports
├── tests/                # Test files
└── package.json
```

### Contributing

Contributions are welcome! Please see the [main repository](https://github.com/0xIntuition/intuition-ts) for contribution guidelines.

---

## License

MIT License - see the [main repository](https://github.com/0xIntuition/intuition-ts) for details.

---

## Resources

- **Repository**: [github.com/0xIntuition/intuition-ts](https://github.com/0xIntuition/intuition-ts)
- **NPM Package**: [@0xintuition/protocol](https://www.npmjs.com/package/@0xintuition/protocol)
- **Documentation**: [docs.intuition.systems](https://docs.intuition.systems)
- **Explorer (Mainnet)**: [explorer.intuition.systems](https://explorer.intuition.systems)
- **Explorer (Testnet)**: [testnet.explorer.intuition.systems](https://testnet.explorer.intuition.systems)
