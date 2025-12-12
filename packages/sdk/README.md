# @0xintuition/sdk

**High-Level TypeScript SDK for the Intuition Protocol**

A comprehensive, developer-friendly SDK for building on the Intuition protocol. Create atoms, triples, manage vaults, and query the knowledge graph with intuitive TypeScript APIs that abstract away blockchain complexity.

[![Version](https://img.shields.io/npm/v/@0xintuition/sdk.svg)](https://www.npmjs.com/package/@0xintuition/sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@0xintuition/sdk.svg)](https://npmjs.org/package/@0xintuition/sdk)

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Configuration](#configuration)
- [API Reference](#api-reference)
  - [Atom Management](#atom-management)
  - [Triple Management](#triple-management)
  - [Vault Operations](#vault-operations)
  - [Search & Discovery](#search--discovery)
  - [External Integrations](#external-integrations)
  - [Experimental Features](#experimental-features)
  - [Protocol Functions](#protocol-functions)
- [Common Workflows](#common-workflows)
- [TypeScript Types](#typescript-types)
- [React Integration](#react-integration)
- [Networks & Configuration](#networks--configuration)
- [Development](#development)
- [License](#license)

---

## Installation

```bash
# npm
npm install @0xintuition/sdk viem

# pnpm
pnpm install @0xintuition/sdk viem

# bun
bun install @0xintuition/sdk viem
```

**Peer Dependencies:** `viem ^2.0.0`

**Optional Dependencies:**
- Pinata API JWT token for IPFS pinning (required for `createAtomFromIpfsUpload`)

---

## Quick Start

```typescript
import {
  intuitionTestnet,
  getMultiVaultAddressFromChainId,
  createAtomFromString,
  createTripleStatement,
  getAtomDetails,
} from '@0xintuition/sdk'
import { createPublicClient, createWalletClient, http, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// Setup clients
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

// Create an atom from a string
const atom = await createAtomFromString(
  { walletClient, publicClient, address },
  'Hello, Intuition!',
  parseEther('0.01') // optional deposit
)

console.log('Atom ID:', atom.state.termId)

// Query atom details
const details = await getAtomDetails(atom.state.termId)
console.log('Atom details:', details)
```

---

## Core Concepts

### Atoms
**Atoms** are the fundamental entities in the Intuition knowledge graph. The SDK supports creating atoms from multiple sources:

- **String**: Plain text data (e.g., `"developer"`)
- **IPFS URI**: Content-addressed IPFS references (e.g., `"ipfs://bafkreib..."`)
- **Ethereum Account**: Wallet addresses (e.g., `"ethereum:1:0x1234..."`)
- **Smart Contract**: Contract addresses (e.g., `"ethereum:1:0xabcd..."`)
- **Thing**: Structured JSON-LD objects pinned to IPFS

### Triples
**Triples** (statements) connect atoms in subject-predicate-object relationships:
- **Subject**: The atom being described
- **Predicate**: The relationship type
- **Object**: The target atom or value

Example: `(Alice, follows, Bob)` or `(Repository, hasLanguage, TypeScript)`

### Vaults & Shares
Each atom and triple has an associated **vault** for deposits. Users deposit assets to receive shares, with prices determined by bonding curves.

### Thing Objects
**Things** are rich, structured entities based on JSON-LD schema.org format:

```typescript
{
  url: 'https://example.com',
  name: 'Example Project',
  description: 'A great project',
  image: 'https://example.com/logo.png',
  tags: ['blockchain', 'defi'],
  twitter: 'https://twitter.com/example',
  github: 'github.com/example/repo'
}
```

---

## Configuration

### Client Setup

The SDK uses Viem clients for blockchain interactions:

```typescript
import type { WriteConfig } from '@0xintuition/sdk'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { intuitionTestnet } from '@0xintuition/sdk'

// For read-only operations
const publicClient = createPublicClient({
  chain: intuitionTestnet,
  transport: http(),
})

// For write operations (transactions)
const account = privateKeyToAccount('0x...')
const walletClient = createWalletClient({
  chain: intuitionTestnet,
  transport: http(),
  account,
})

// WriteConfig type for all transaction functions
const config: WriteConfig = {
  address: getMultiVaultAddressFromChainId(intuitionTestnet.id),
  publicClient,
  walletClient,
}
```

### Network Configuration

```typescript
import { intuitionMainnet, intuitionTestnet } from '@0xintuition/sdk'

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

### Optional: Pinata Configuration

For IPFS-related functions, you'll need a Pinata API JWT token:

```typescript
import { createAtomFromIpfsUpload } from '@0xintuition/sdk'

const atom = await createAtomFromIpfsUpload(
  {
    ...config,
    pinataApiJWT: 'your-pinata-jwt-token',
  },
  {
    name: 'Example',
    description: 'An example thing',
  }
)
```

---

## API Reference

### Atom Management

#### Single Atom Creation

##### `createAtomFromString`
Create an atom from a plain text string.

```typescript
import { createAtomFromString } from '@0xintuition/sdk'
import { parseEther } from 'viem'

const atom = await createAtomFromString(
  { walletClient, publicClient, address },
  'developer',
  parseEther('0.01') // optional initial deposit
)

// Returns:
// {
//   uri: string
//   transactionHash: `0x${string}`
//   state: {
//     creator: Address
//     termId: Hex
//     atomData: Hex
//     atomWallet: Address
//   }
// }
```

##### `createAtomFromThing`
Create an atom from a Thing object (automatically pins to IPFS).

```typescript
import { createAtomFromThing } from '@0xintuition/sdk'

const atom = await createAtomFromThing(
  { walletClient, publicClient, address },
  {
    url: 'https://www.example.com',
    name: 'Example',
    description: 'A great example',
    image: 'https://example.com/logo.png',
    tags: ['web3', 'defi'],
  },
  parseEther('0.05')
)
```

##### `createAtomFromEthereumAccount`
Create an atom from an Ethereum address.

```typescript
import { createAtomFromEthereumAccount } from '@0xintuition/sdk'

const atom = await createAtomFromEthereumAccount(
  { walletClient, publicClient, address },
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
)

// The function accepts a simple Ethereum address string
// Returns:
// {
//   uri: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
//   transactionHash: `0x${string}`
//   state: { creator, termId, atomData, atomWallet }
// }
```

##### `createAtomFromSmartContract`
Create an atom from a smart contract address.

```typescript
import { createAtomFromSmartContract } from '@0xintuition/sdk'

const atom = await createAtomFromSmartContract(
  { walletClient, publicClient, address },
  '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
)

// The function accepts a simple Ethereum address string
// Returns the same structure as createAtomFromEthereumAccount
```

##### `createAtomFromIpfsUri`
Create an atom from an existing IPFS URI.

```typescript
import { createAtomFromIpfsUri } from '@0xintuition/sdk'

const atom = await createAtomFromIpfsUri(
  { walletClient, publicClient, address },
  'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u'
)
```

##### `createAtomFromIpfsUpload`
Upload JSON to Pinata and create an atom.

```typescript
import { createAtomFromIpfsUpload } from '@0xintuition/sdk'

const atom = await createAtomFromIpfsUpload(
  {
    walletClient,
    publicClient,
    address,
    pinataApiJWT: 'your-pinata-jwt-token',
  },
  {
    name: 'My Project',
    description: 'A blockchain project',
    url: 'https://myproject.com',
  }
)
```

#### Batch Atom Creation

##### `batchCreateAtomsFromEthereumAccounts`
Create multiple atoms from Ethereum addresses in one transaction.

```typescript
import { batchCreateAtomsFromEthereumAccounts } from '@0xintuition/sdk'
import { parseEther } from 'viem'

const result = await batchCreateAtomsFromEthereumAccounts(
  { walletClient, publicClient, address },
  [
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    '0x1234567890123456789012345678901234567890',
  ],
  parseEther('0.01') // deposit per atom (optional)
)

// Returns:
// {
//   uris: Address[]  // array of Ethereum addresses
//   transactionHash: `0x${string}`
//   state: Array<{ creator, termId, atomData, atomWallet }>
// }
```

##### `batchCreateAtomsFromIpfsUris`
Create multiple atoms from IPFS URIs.

```typescript
import { batchCreateAtomsFromIpfsUris } from '@0xintuition/sdk'

const result = await batchCreateAtomsFromIpfsUris(
  { walletClient, publicClient, address },
  [
    'ipfs://bafkreib1...',
    'ipfs://bafkreib2...',
    'ipfs://bafkreib3...',
  ]
)
```

##### `batchCreateAtomsFromSmartContracts`
Create multiple atoms from smart contract addresses.

```typescript
import { batchCreateAtomsFromSmartContracts } from '@0xintuition/sdk'

const result = await batchCreateAtomsFromSmartContracts(
  { walletClient, publicClient, address },
  [
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // Uniswap
    '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', // Aave
    '0xc00e94Cb662C3520282E6f5717214004A7f26888', // Compound
  ]
)
```

##### `batchCreateAtomsFromThings`
Create multiple atoms from Thing objects (with IPFS pinning).

```typescript
import { batchCreateAtomsFromThings } from '@0xintuition/sdk'

const result = await batchCreateAtomsFromThings(
  { walletClient, publicClient, address },
  [
    { name: 'Project A', url: 'https://a.com', description: '...' },
    { name: 'Project B', url: 'https://b.com', description: '...' },
  ]
)
```

#### Atom Queries

##### `getAtomDetails`
Fetch atom details from the Intuition API.

```typescript
import { getAtomDetails } from '@0xintuition/sdk'

const details = await getAtomDetails(
  '0x57d94c116a33bb460428eced262b7ae2ec6f865e7aceef6357cec3d034e8ea21'
)

// Returns full atom metadata including:
// - id, data, creator
// - vault details (assets, shares, price)
// - timestamps
```

##### `calculateAtomId`
Calculate atom ID from atom data (off-chain).

```typescript
import { calculateAtomId } from '@0xintuition/sdk'

const atomId = calculateAtomId(
  'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u'
)
// Returns: keccak256 hash of the atom data
```

---

### Triple Management

##### `createTripleStatement`
Create a triple (subject-predicate-object statement).

```typescript
import { createTripleStatement } from '@0xintuition/sdk'
import { parseEther } from 'viem'

// Assume you have three atom IDs
const subjectId = '0x1234...'    // Alice
const predicateId = '0x5678...'  // follows
const objectId = '0x9abc...'     // Bob

const triple = await createTripleStatement(
  { walletClient, publicClient, address },
  {
    args: [
      [subjectId],              // subjects (array)
      [predicateId],            // predicates (array)
      [objectId],               // objects (array)
      [parseEther('0.1')],      // deposits per triple (array)
    ],
    value: parseEther('0.1'),   // total value
  }
)

// Returns:
// {
//   transactionHash: `0x${string}`
//   state: Array<{  // array of parsed event objects
//     args: {
//       tripleId: Hex
//       subjectId: Hex
//       predicateId: Hex
//       objectId: Hex
//       counterVaultId: Hex
//       ...
//     }
//     eventName: 'TripleCreated'
//     ...
//   }>
// }
```

##### `batchCreateTripleStatements`
Create multiple triples in one transaction.

```typescript
import { batchCreateTripleStatements } from '@0xintuition/sdk'
import { parseEther } from 'viem'

const result = await batchCreateTripleStatements(
  { walletClient, publicClient, address },
  [
    [subject1, subject2],             // subjects
    [predicate1, predicate2],         // predicates
    [object1, object2],               // objects
    [parseEther('0.1'), parseEther('0.1')], // deposits per triple
  ]
)
```

##### `getTripleDetails`
Fetch triple details from the Intuition API.

```typescript
import { getTripleDetails } from '@0xintuition/sdk'

const details = await getTripleDetails(
  '0x4957d3f442acc301ad71e73f26efd6af78647f57dacf2b3a686d91fa773fe0b6'
)

// Returns:
// - Triple components (subject, predicate, object)
// - Vault details (for and against positions)
// - Creator info
// - Timestamps
```

##### `calculateTripleId`
Calculate triple ID from atom IDs (off-chain).

```typescript
import { calculateTripleId } from '@0xintuition/sdk'

const tripleId = calculateTripleId(
  '0x1234...', // subject ID
  '0x5678...', // predicate ID
  '0x9abc...'  // object ID
)
// Returns: keccak256 hash of packed atom IDs
```

##### `calculateCounterTripleId`
Calculate the counter-triple ID (opposing position).

```typescript
import { calculateCounterTripleId } from '@0xintuition/sdk'

const tripleId = '0x4957d3f442acc301...'
const counterTripleId = calculateCounterTripleId(tripleId)

// Counter triples represent opposing positions
// e.g., if triple is "for", counter is "against"
```

---

### Vault Operations

##### `deposit`
Deposit assets into a vault to receive shares.

```typescript
import { deposit } from '@0xintuition/sdk'
import { parseEther } from 'viem'

const result = await deposit(
  { walletClient, publicClient, address },
  [
    walletClient.account.address, // receiver
    vaultId,                       // termId (atom or triple ID)
    1n,                            // curveId (use 1 for default curve)
    parseEther('1'),               // assets (amount to deposit)
    0n,                            // minShares (minimum shares to receive)
  ]
)

// Note: The SDK deposit function wraps multiVaultDeposit from @0xintuition/protocol
// The transaction value is handled by the underlying multiVaultDeposit function
```

##### `batchDeposit`
Deposit into multiple vaults in one transaction.

```typescript
import { batchDeposit } from '@0xintuition/sdk'
import { parseEther } from 'viem'

const result = await batchDeposit(
  { walletClient, publicClient, address },
  [
    walletClient.account.address,                          // receiver
    [vault1, vault2, vault3],                              // termIds
    [1n, 1n, 1n],                                          // curveIds (default curve for each)
    [parseEther('1'), parseEther('0.5'), parseEther('2')], // assets for each vault
    [0n, 0n, 0n],                                          // minShares for each
  ]
)
```

##### `redeem`
Redeem shares from a vault to get assets back.

```typescript
import { redeem } from '@0xintuition/sdk'

const result = await redeem(
  { walletClient, publicClient, address },
  [
    walletClient.account.address, // receiver
    vaultId,                       // termId
    1n,                            // curveId (use 1 for default curve)
    sharesToRedeem,                // shares amount
    0n,                            // minAssets (minimum assets to receive)
  ]
)
```

##### `batchRedeem`
Redeem shares from multiple vaults in one transaction.

```typescript
import { batchRedeem } from '@0xintuition/sdk'

const result = await batchRedeem(
  { walletClient, publicClient, address },
  [
    walletClient.account.address, // receiver
    [vault1, vault2],              // termIds
    [1n, 1n],                      // curveIds (default curve for each)
    [shares1, shares2],            // shares for each vault
    [0n, 0n],                      // minAssets for each
  ]
)
```

---

### Search & Discovery

##### `globalSearch`
Search across atoms, accounts, triples, and collections.

```typescript
import { globalSearch } from '@0xintuition/sdk'

const results = await globalSearch('ethereum', {
  atomsLimit: 10,      // optional, default: 5
  accountsLimit: 10,   // optional, default: 5
  triplesLimit: 10,    // optional, default: 5
  collectionsLimit: 5, // optional, default: 5
})

// Returns:
// {
//   atoms: [...],
//   accounts: [...],
//   triples: [...],
//   collections: [...]
// }
// Note: Returns null on error
```

##### `semanticSearch`
Semantic search using vector embeddings.

```typescript
import { semanticSearch } from '@0xintuition/sdk'

const results = await semanticSearch('decentralized knowledge graph', {
  limit: 20, // optional, default: 3
})

// Returns semantically similar atoms/triples, or null on error
```

##### `findAtomIds`
Find atom IDs for given atom data (batched queries).

```typescript
import { findAtomIds } from '@0xintuition/sdk'

const atomsWithIds = await findAtomIds([
  'developer',
  'blockchain',
  'ethereum',
])

// Returns:
// [
//   { data: 'developer', term_id: '0x1234...' },
//   { data: 'blockchain', term_id: '0x5678...' },
//   ...
// ]

// Automatically batches queries in groups of 100
```

##### `findTripleIds`
Find triple IDs for given atom ID combinations.

```typescript
import { findTripleIds } from '@0xintuition/sdk'

const triplesWithIds = await findTripleIds(
  walletClient.account.address,
  [
    ['0xsubject1', '0xpredicate1', '0xobject1'],
    ['0xsubject2', '0xpredicate2', '0xobject2'],
  ]
)

// Returns:
// [
//   {
//     term_id: '0xtriple1',
//     subject_id: '0xsubject1',
//     predicate_id: '0xpredicate1',
//     object_id: '0xobject1',
//     positions: [...]
//   },
//   ...
// ]
```

---

### External Integrations

##### `pinThing`
Pin a Thing object to IPFS via the Intuition API.

```typescript
import { pinThing, type PinThingMutationVariables } from '@0xintuition/sdk'

const uri = await pinThing({
  thing: {
    url: 'https://example.com',
    name: 'Example Project',
    description: 'A great project',
    image: 'https://example.com/logo.png',
    tags: ['blockchain', 'defi'],
  }
})

// Returns: 'ipfs://bafkreib...' or null on error
```

##### `uploadJsonToPinata`
Upload JSON data to IPFS via Pinata (used internally by `createAtomFromIpfsUpload`).

```typescript
import { uploadJsonToPinata } from '@0xintuition/sdk'

const result = await uploadJsonToPinata(
  'your-pinata-jwt-token',
  {
    name: 'My Data',
    description: 'Some JSON data',
    // ... any JSON-serializable data
  }
)

// Returns:
// {
//   IpfsHash: 'bafkreib...',
//   PinSize: 123,
//   Timestamp: '2024-01-01T00:00:00.000Z'
// }
```

---

### Experimental Features

These features are in active development and may change in future releases.

##### `sync`
Powerful bulk synchronization function for creating missing atoms and triples.

```typescript
import { sync } from '@0xintuition/sdk'

// Define your data structure
const data = {
  'Alice': {
    'follows': ['Bob', 'Charlie'],
    'likes': 'TypeScript'
  },
  'Bob': {
    'follows': 'Charlie',
    'worksOn': 'Web3'
  }
}

// Dry run to estimate costs
const estimation = await sync(
  {
    address,
    publicClient,
    walletClient,
    dryRun: true,
    logger: console.log,
  },
  data
)

console.log('Cost estimation:', estimation)
// {
//   totalCost: 1500000000000000000n,
//   atomCost: 800000000000000000n,
//   tripleCost: 600000000000000000n,
//   depositCost: 100000000000000000n,
//   atomCount: 6,
//   tripleCount: 4,
//   depositCount: 2,
//   userBalance: 2000000000000000000n,
//   hasSufficientBalance: true
// }

// Execute the sync
const finalResult = await sync(
  {
    address,
    publicClient,
    walletClient,
    logger: console.log,
    batchSize: 50,
  },
  data
)

// Returns final cost estimation even after execution
console.log('Final result:', finalResult)
```

**How `sync` works:**
1. Analyzes data structure to identify atoms and triples
2. Queries to find existing atoms and triples
3. Creates missing atoms in batches (unless dryRun)
4. Creates missing triples in batches (unless dryRun)
5. Deposits into triples that lack positions (unless dryRun)
6. Returns cost estimation (always, as CostEstimation type)

**Configuration:**
- `dryRun`: Estimate costs without executing transactions
- `batchSize`: Number of items per batch (default: 50)
- `logger`: Custom logging function

##### `wait`
Wait for transaction indexing with polling.

```typescript
import { wait } from '@0xintuition/sdk'

// Wait for transaction to be indexed
await wait(transactionHash, {
  pollingInterval: 1000,        // poll every 1 second (default: 1000)
  timeout: 60000,               // timeout after 60 seconds (default: 3600000ms)
  postTransactionDelay: 2000,   // wait 2s after found (default: 2000)
  onProgress: (attempt) => {
    console.log(`Polling attempt ${attempt}`)
  }
})

// Now safe to query the transaction data
// Note: Returns void (Promise<void>), can accept null hash (will return immediately)
```

##### `search`
Search positions with field matching.

```typescript
import { search } from '@0xintuition/sdk'

const results = await search(
  [
    { subject: 'Alice' },
    { predicate: 'follows' }
  ],
  [walletClient.account.address]
)

// Returns positions matching the search criteria
// Organized by subject with predicates as keys
```

---

### Protocol Functions

The SDK re-exports all functions from `@0xintuition/protocol`, giving you access to lower-level contract interactions:

```typescript
import {
  // MultiVault operations
  multiVaultGetAtom,
  multiVaultGetTriple,
  multiVaultDeposit,
  multiVaultRedeem,
  multiVaultPreviewDeposit,
  multiVaultConvertToShares,
  multiVaultGetShares,

  // TrustBonding operations
  trustBondingCurrentEpoch,
  trustBondingGetUserApy,
  trustBondingGetUserCurrentClaimableRewards,

  // Contract ABIs
  MultiVaultAbi,
  TrustBondingAbi,

  // Networks
  intuitionMainnet,
  intuitionTestnet,

  // Deployments
  intuitionDeployments,
  getMultiVaultAddressFromChainId,

  // Event parsers
  eventParseAtomCreated,
  eventParseTripleCreated,
  eventParseDeposited,

  // And 40+ more functions...
} from '@0xintuition/sdk'
```

For comprehensive documentation of protocol functions, see the [@0xintuition/protocol README](../protocol/README.md).

---

## Common Workflows

### Example 1: Create Atom from String

```typescript
import {
  createAtomFromString,
  getMultiVaultAddressFromChainId,
  intuitionTestnet,
} from '@0xintuition/sdk'
import { createPublicClient, createWalletClient, http, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// Setup
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

// Create atom
const atom = await createAtomFromString(
  { walletClient, publicClient, address },
  'TypeScript',
  parseEther('0.01')
)

console.log('Created atom:', atom.state.termId)
console.log('Transaction:', atom.transactionHash)
```

### Example 2: Create Triple Statement

```typescript
import { createAtomFromString, createTripleStatement } from '@0xintuition/sdk'
import { parseEther } from 'viem'

// Create three atoms
const alice = await createAtomFromString(
  { walletClient, publicClient, address },
  'Alice'
)
const follows = await createAtomFromString(
  { walletClient, publicClient, address },
  'follows'
)
const bob = await createAtomFromString(
  { walletClient, publicClient, address },
  'Bob'
)

// Create triple: Alice follows Bob
const triple = await createTripleStatement(
  { walletClient, publicClient, address },
  {
    args: [
      [alice.state.termId],       // subjects
      [follows.state.termId],     // predicates
      [bob.state.termId],         // objects
      [parseEther('0.1')],        // deposits
    ],
    value: parseEther('0.1'),
  }
)

console.log('Triple created:', triple.state[0].args.tripleId)
```

### Example 3: Batch Create Ethereum Account Atoms

```typescript
import { batchCreateAtomsFromEthereumAccounts } from '@0xintuition/sdk'
import { parseEther } from 'viem'

// Create atoms for multiple addresses
const addresses = [
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0x1234567890123456789012345678901234567890',
]

const result = await batchCreateAtomsFromEthereumAccounts(
  { walletClient, publicClient, address },
  addresses,
  parseEther('0.01')
)

console.log('Created atom IDs:', result.state.map(s => s.termId))
console.log('Single transaction:', result.transactionHash)
```

### Example 4: Deposit into Vault

```typescript
import {
  createAtomFromString,
  deposit,
  multiVaultPreviewDeposit,
  multiVaultGetShares,
} from '@0xintuition/sdk'
import { parseEther } from 'viem'

// Create an atom
const atom = await createAtomFromString(
  { walletClient, publicClient, address },
  'DeFi'
)

const vaultId = atom.state.termId
const depositAmount = parseEther('1')

// Preview deposit to see expected shares
const expectedShares = await multiVaultPreviewDeposit(
  { address, publicClient },
  { args: [vaultId, 1n, depositAmount] }
)

console.log('Expected shares:', expectedShares)

// Execute deposit
await deposit(
  { walletClient, publicClient, address },
  [
    walletClient.account.address, // receiver
    vaultId,                       // termId
    1n,                            // curveId (use 1 for default curve)
    depositAmount,                 // assets (amount to deposit)
    0n,                            // minShares (minimum shares to receive)
  ]
)

// Check balance
const shares = await multiVaultGetShares(
  { address, publicClient },
  { args: [walletClient.account.address, vaultId] }
)

console.log('Total shares:', shares)
```

### Example 5: Global Search

```typescript
import { globalSearch, getAtomDetails } from '@0xintuition/sdk'

// Search for atoms related to "ethereum"
const results = await globalSearch('ethereum', {
  atomsLimit: 10,
  accountsLimit: 5,
  triplesLimit: 5,
  collectionsLimit: 3,
})

console.log('Found atoms:', results.atoms.length)
console.log('Found accounts:', results.accounts.length)
console.log('Found triples:', results.triples.length)

// Get details for first atom
if (results.atoms[0]) {
  const details = await getAtomDetails(results.atoms[0].id)
  console.log('Atom details:', details)
}
```

### Example 6: Bulk Sync with Cost Estimation

```typescript
import { sync } from '@0xintuition/sdk'
import { formatEther } from 'viem'

// Define knowledge graph structure
const knowledgeGraph = {
  'Ethereum': {
    'isA': 'Blockchain',
    'hasLanguage': 'Solidity',
    'supports': ['Smart Contracts', 'DeFi', 'NFTs']
  },
  'Vitalik Buterin': {
    'created': 'Ethereum',
    'worksOn': 'Blockchain'
  },
  'Solidity': {
    'isA': 'Programming Language',
    'usedFor': 'Smart Contracts'
  }
}

// First, run a dry-run to estimate costs
console.log('Estimating costs...')
const estimation = await sync(
  {
    address,
    publicClient,
    walletClient,
    dryRun: true,
    logger: (msg) => console.log(`[DRY RUN] ${msg}`),
  },
  knowledgeGraph
)

console.log('\nCost Estimation:')
console.log('- Total cost:', formatEther(estimation.totalCost), 'ETH')
console.log('- Atom cost:', formatEther(estimation.atomCost), 'ETH')
console.log('- Triple cost:', formatEther(estimation.tripleCost), 'ETH')
console.log('- Atoms to create:', estimation.atomCount)
console.log('- Triples to create:', estimation.tripleCount)
console.log('- User balance:', formatEther(estimation.userBalance), 'ETH')
console.log('- Sufficient balance:', estimation.hasSufficientBalance)

// If costs are acceptable, execute the sync
if (estimation.hasSufficientBalance) {
  console.log('\nExecuting sync...')
  const result = await sync(
    {
      address,
      publicClient,
      walletClient,
      batchSize: 50,
      logger: console.log,
    },
    knowledgeGraph
  )
  console.log('Sync completed!')
  console.log('Final cost estimation:', result)
} else {
  console.log('Insufficient balance for sync operation')
}
```

### Example 7: Create Thing with IPFS Pinning

```typescript
import { createAtomFromThing, getAtomDetails } from '@0xintuition/sdk'
import { parseEther } from 'viem'

// Create a rich entity with metadata
const project = await createAtomFromThing(
  { walletClient, publicClient, address },
  {
    url: 'https://github.com/myorg/myproject',
    name: 'My Amazing Project',
    description: 'A groundbreaking Web3 application',
    image: 'https://myproject.com/logo.png',
    tags: ['web3', 'defi', 'blockchain', 'typescript'],
    twitter: 'https://twitter.com/myproject',
    github: 'github.com/myorg/myproject',
  },
  parseEther('0.05')
)

console.log('Thing created and pinned to IPFS')
console.log('IPFS URI:', project.uri)
console.log('Atom ID:', project.state.termId)
console.log('Transaction:', project.transactionHash)

// Fetch full details
const details = await getAtomDetails(project.state.termId)
console.log('Full atom details:', details)
```

### Example 8: Find Existing Atoms and Triples

```typescript
import { findAtomIds, findTripleIds } from '@0xintuition/sdk'

// Find atom IDs for known data
const atomData = [
  'TypeScript',
  'JavaScript',
  'Python',
  'Rust',
  'Solidity'
]

const atoms = await findAtomIds(atomData)

console.log('Found atoms:')
atoms.forEach(atom => {
  console.log(`- ${atom.data}: ${atom.term_id}`)
})

// Find triple IDs for specific combinations
if (atoms.length >= 3) {
  const triples = await findTripleIds(
    walletClient.account.address,
    [
      [atoms[0].term_id, atoms[1].term_id, atoms[2].term_id],
    ]
  )

  console.log('Found triples:', triples.length)
}
```

---

## TypeScript Types

### Configuration Types

```typescript
import type {
  WriteConfig,
  ReadConfig,
} from '@0xintuition/sdk'

// For write operations (transactions)
type WriteConfig = {
  address: Address
  publicClient: PublicClient
  walletClient: WalletClient
  pinataApiJWT?: string // optional, for IPFS operations (createAtomFromIpfsUpload only)
}

// For read-only operations (from protocol)
type ReadConfig = {
  address: Address
  publicClient: PublicClient
}
```

### Thing Type

```typescript
import type { PinThingMutationVariables } from '@0xintuition/sdk'

// Thing type is defined in @0xintuition/graphql (PinThingMutationVariables)
// Example structure:
type Thing = {
  url?: string
  name?: string
  description?: string
  image?: string
  tags?: string[]
  twitter?: string
  github?: string
  // ... additional schema.org Thing properties
}
```

### Ethereum Account & Smart Contract

```typescript
// The SDK functions accept simple Address strings, not objects
// Note: Address is imported from 'viem'

import type { Address } from 'viem'

// createAtomFromEthereumAccount accepts: Address
// createAtomFromSmartContract accepts: Address
// batchCreateAtomsFromEthereumAccounts accepts: Address[]
// batchCreateAtomsFromSmartContracts accepts: Address[]
```

### Return Types

```typescript
// Atom creation result
type AtomCreationResult = {
  uri: string
  transactionHash: `0x${string}`
  state: {
    creator: Address
    termId: Hex
    atomData: Hex
    atomWallet: Address
  }
}

// Batch atom creation result
type BatchAtomCreationResult = {
  uris: string[]
  transactionHash: `0x${string}`
  state: Array<{
    creator: Address
    termId: Hex
    atomData: Hex
    atomWallet: Address
  }>
}

// Triple creation result
type TripleCreationResult = {
  transactionHash: `0x${string}`
  state: Array<{  // array of parsed event objects
    args: {
      tripleId: Hex
      subjectId: Hex
      predicateId: Hex
      objectId: Hex
      counterVaultId: Hex
      // ... additional event args
    }
    eventName: 'TripleCreated'
    // ... other event properties
  }>
}
```

### Search Types

```typescript
import type { GlobalSearchOptions, SemanticSearchOptions } from '@0xintuition/sdk'

// Exported interface from api/search.ts
interface GlobalSearchOptions {
  atomsLimit?: number
  accountsLimit?: number
  triplesLimit?: number
  collectionsLimit?: number
}

// Exported interface from api/semantic-search.ts
interface SemanticSearchOptions {
  limit?: number  // optional, defaults to 3
}

// Note: AtomWithId and TripleWithIds are internal types used by
// findAtomIds and findTripleIds but are not exported
```

### Experimental Types

```typescript
// Note: These types are defined in experimental/utils.ts but are NOT exported
// They are shown here for reference when using the experimental functions

// Used by sync() function
interface SyncConfig {
  address: Address
  publicClient: PublicClient
  walletClient: WalletClient
  logger?: (message: string) => void
  batchSize?: number
  dryRun?: boolean
}

// Returned by sync() function
interface CostEstimation {
  totalCost: bigint
  atomCost: bigint
  tripleCost: bigint
  depositCost: bigint
  atomCount: number
  tripleCount: number
  depositCount: number
  userBalance: bigint
  hasSufficientBalance: boolean
}

// Used by wait() function
interface WaitOptions {
  pollingInterval?: number
  timeout?: number
  postTransactionDelay?: number
  onProgress?: (attempt: number) => void
}
```

---

## React Integration

### Using with Wagmi

```typescript
'use client'

import * as React from 'react'
import {
  createAtomFromString,
  getMultiVaultAddressFromChainId,
} from '@0xintuition/sdk'
import { useChainId, usePublicClient, useWalletClient } from 'wagmi'
import { parseEther } from 'viem'

export function CreateAtomButton() {
  const chainId = useChainId()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const [loading, setLoading] = React.useState(false)
  const [atomId, setAtomId] = React.useState<string | null>(null)

  const handleClick = async () => {
    if (!publicClient || !walletClient) return

    setLoading(true)
    try {
      const address = getMultiVaultAddressFromChainId(chainId)

      const atom = await createAtomFromString(
        { walletClient, publicClient, address },
        'My Atom',
        parseEther('0.01')
      )

      setAtomId(atom.state.termId)
      console.log('Created atom:', atom.state.termId)
    } catch (error) {
      console.error('Error creating atom:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Creating...' : 'Create Atom'}
      </button>
      {atomId && <p>Created atom: {atomId}</p>}
    </div>
  )
}
```

### Using with TanStack Query

```typescript
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createAtomFromString,
  getAtomDetails,
  getMultiVaultAddressFromChainId,
} from '@0xintuition/sdk'
import { usePublicClient, useWalletClient, useChainId } from 'wagmi'
import { parseEther } from 'viem'

export function useCreateAtom() {
  const chainId = useChainId()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  return useMutation({
    mutationFn: async (data: string) => {
      if (!publicClient || !walletClient) {
        throw new Error('Clients not ready')
      }

      const address = getMultiVaultAddressFromChainId(chainId)
      return createAtomFromString(
        { walletClient, publicClient, address },
        data,
        parseEther('0.01')
      )
    },
  })
}

export function useAtomDetails(atomId: string | undefined) {
  return useQuery({
    queryKey: ['atom', atomId],
    queryFn: () => atomId ? getAtomDetails(atomId) : null,
    enabled: !!atomId,
  })
}
```

---

## Networks & Configuration

### Supported Networks

#### Intuition Mainnet

```typescript
import { intuitionMainnet } from '@0xintuition/sdk'

// Chain ID: 1155
// Name: Intuition
// Native Currency: TRUST (18 decimals)
// RPC: https://rpc.intuition.systems/http
// Explorer: https://explorer.intuition.systems
```

#### Intuition Testnet

```typescript
import { intuitionTestnet } from '@0xintuition/sdk'

// Chain ID: 13579
// Name: Intuition Testnet
// Native Currency: tTRUST (18 decimals)
// RPC: https://testnet.rpc.intuition.systems/http
// Explorer: https://testnet.explorer.intuition.systems
```

### Contract Addresses

```typescript
import {
  getMultiVaultAddressFromChainId,
  getContractAddressFromChainId,
  intuitionDeployments,
} from '@0xintuition/sdk'

// Get MultiVault address for current network
const multiVaultAddress = getMultiVaultAddressFromChainId(chainId)

// Get other contract addresses
const trustBonding = getContractAddressFromChainId('TrustBonding', chainId)
const wrappedTrust = getContractAddressFromChainId('WrappedTrust', chainId)

// Access all deployments
console.log(intuitionDeployments)
```

---

## Development

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test

# With environment variables
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
packages/sdk/
├── src/
│   ├── api/              # API queries and data fetching
│   │   ├── get-atom-details.ts
│   │   ├── get-triple-details.ts
│   │   ├── search.ts
│   │   ├── semantic-search.ts
│   │   ├── pin-thing.ts
│   │   └── index.ts
│   ├── core/             # Blockchain transaction functions
│   │   ├── create-atom-from-string.ts
│   │   ├── create-atom-from-thing.ts
│   │   ├── create-atom-from-ethereum-account.ts
│   │   ├── create-atom-from-smart-contract.ts
│   │   ├── create-atom-from-ipfs-uri.ts
│   │   ├── create-atom-from-ipfs-upload.ts
│   │   ├── create-triple-statement.ts
│   │   ├── batch-create-atoms-from-ethereum-accounts.ts
│   │   ├── batch-create-atoms-from-smart-contracts.ts
│   │   ├── batch-create-atoms-from-ipfs-uris.ts
│   │   ├── batch-create-atoms-from-things.ts
│   │   ├── batch-create-triple-statements.ts
│   │   ├── deposit.ts
│   │   ├── redeem.ts
│   │   ├── batch-deposit.ts
│   │   ├── batch-redeem.ts
│   │   └── index.ts
│   ├── experimental/     # Experimental utilities
│   │   └── utils.ts      # sync, wait, findAtomIds, findTripleIds, search
│   ├── external/         # External integrations
│   │   ├── upload-json-to-pinata.ts
│   │   └── index.ts
│   ├── utils/            # Calculation utilities
│   │   ├── calculate-atom-id.ts
│   │   ├── calculate-triple-id.ts
│   │   ├── calculate-counter-triple-id.ts
│   │   └── index.ts
│   └── index.ts          # Main exports (re-exports all + @0xintuition/protocol)
├── tests/
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
- **NPM Package**: [@0xintuition/sdk](https://www.npmjs.com/package/@0xintuition/sdk)
- **Protocol Package**: [@0xintuition/protocol](../protocol/README.md)
- **Documentation**: [docs.intuition.systems](https://docs.intuition.systems)
- **Explorer (Mainnet)**: [explorer.intuition.systems](https://explorer.intuition.systems)
- **Explorer (Testnet)**: [testnet.explorer.intuition.systems](https://testnet.explorer.intuition.systems)
- **Discord**: [Join our community](https://discord.gg/intuition)
