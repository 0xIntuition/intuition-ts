# Intuition Protocol

Intuition Protocol is a TypeScript/JavaScript SDK and smart contract interface for interacting with the Intuition onchain knowledge graph. It provides utilities for creating, managing, and querying atoms and triples, as well as encoding and parsing contract calls and events.

[![Version](https://img.shields.io/npm/v/@0xintuition/protocol.svg)](https://www.npmjs.com/package/@0xintuition/protocol)
[![Downloads/week](https://img.shields.io/npm/dw/@0xintuition/protocol.svg)](https://npmjs.org/package/@0xintuition/protocol)

## Install

```sh-session
npm install 0xintuition/protocol
```

```sh-session
pnpm install 0xintuition/protocol
```

```sh-session
bun install 0xintuition/protocol
```

# Usage

The protocol SDK provides both core/functional and class based functions for interacting with the Intuition protocol.

## Core Functions

### Atom and Triple Creation

```typescript
import {
  batchCreateAtom,
  batchCreateTriple,
  createAtom,
  createTriple,
} from '@0xintuition/protocol/core'

// Create a single atom
await createAtom(
  { address, walletClient, publicClient },
  { args: [atomUri], value },
)

// Create a triple
await createTriple(
  { address, walletClient, publicClient },
  { args: [subjectId, predicateId, objectId], value },
)

// Batch create atoms
await batchCreateAtom(
  { address, walletClient, publicClient },
  { args: [[atomUri1, atomUri2]], value },
)

// Batch create triples
await batchCreateTriple(
  { address, walletClient, publicClient },
  { args: [[subjectIds], [predicateIds], [objectIds]], value },
)
```

### Deposits and Redemptions

```typescript
import {
  depositAtom,
  depositTriple,
  redeemAtom,
  redeemTriple,
} from '@0xintuition/protocol/core'

// Deposit into an atom
await depositAtom(
  { address, walletClient, publicClient },
  { args: [receiver, atomId], value },
)

// Deposit into a triple
await depositTriple(
  { address, walletClient, publicClient },
  { args: [receiver, tripleId], value },
)

// Redeem atom shares
await redeemAtom(
  { address, walletClient, publicClient },
  { args: [shares, receiver, atomId] },
)

// Redeem triple shares
await redeemTriple(
  { address, walletClient, publicClient },
  { args: [shares, receiver, tripleId] },
)
```

### Curve Deposits and Redemptions

```typescript
import {
  batchDepositCurve,
  batchRedeemCurve,
  depositAtomCurve,
  depositTripleCurve,
  redeemAtomCurve,
  redeemTripleCurve,
} from '@0xintuition/protocol/core'

// Deposit into an atom using the curve
await depositAtomCurve(
  { address, walletClient, publicClient },
  { args: [receiver, atomId, curveId], value },
)

// Deposit into a triple using the curve
await depositTripleCurve(
  { address, walletClient, publicClient },
  { args: [receiver, tripleId, curveId], value },
)

// Batch deposit into atoms/triples using the curve
await batchDepositCurve(
  { address, walletClient, publicClient },
  { args: [receiver, ids, curveIds, amounts], value },
)

// Redeem atom shares using the curve
await redeemAtomCurve(
  { address, walletClient, publicClient },
  { args: [shares, receiver, atomId, curveId] },
)

// Redeem triple shares using the curve
await redeemTripleCurve(
  { address, walletClient, publicClient },
  { args: [shares, receiver, tripleId, curveId] },
)

// Batch redeem shares from atoms/triples using the curve
await batchRedeemCurve(
  { address, walletClient, publicClient },
  { args: [shares, receiver, ids, curveIds] },
)
```

### Cost Calculation and Multicall

```typescript
import {
  createAtomCalculateBaseCost,
  createTripleCalculateBaseCost,
  multiCallIntuitionConfigs,
} from '@0xintuition/protocol/core'

// Get atom creation cost
const atomCost = await createAtomCalculateBaseCost({ address, publicClient })

// Get triple creation cost
const tripleCost = await createTripleCalculateBaseCost({
  address,
  publicClient,
})

// Get multiple config values in one call
const config = await multiCallIntuitionConfigs({ address, publicClient })
```

### ABI Encoding Helpers

```typescript
import {
  createAtomEncode,
  createTripleEncode,
  batchCreateAtomEncode,
  batchCreateTripleEncode,
  depositAtomEncode,
  depositTripleEncode,
  redeemAtomEncode,
  redeemTripleEncode,
  initEncode,
} from '@0xintuition/protocol/core'

// Encode a createAtom call
const data = createAtomEncode(atomUri)

// Encode a createTriple call
const data = createTripleEncode(subjectId, predicateId, objectId)

// Encode batch and other calls similarly
```

## Event Parsing Utilities

```typescript
import {
  eventParseAtomCreated,
  eventParseDepositAtomTransaction,
  eventParseRedeemAtomTransaction,
  eventParseTripleCreated,
} from '@0xintuition/protocol/events'

// Parse AtomCreated event logs from a transaction
const atomEvents = await eventParseAtomCreated(publicClient, txHash)

// Parse Deposited event logs
const depositEvents = await eventParseDeposited(publicClient, txHash)

// Parse Redeemed event logs
const redeemEvents = await eventParseRedeemed(publicClient, txHash)

// Parse TripleCreated event logs
const tripleEvents = await eventParseTripleCreated(publicClient, txHash)
```

## EthMultiVault

```typescript
import { EthMultiVault } from '@0xintuition/protocol'

import { Chain, createPublicClient, http, PublicClient, Transport } from 'viem'
import { base } from 'viem/chains'

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
}) as PublicClient<Transport, Chain>

const walletClient = createWalletClient({
  chain: base,
  transport: custom(window.ethereum!),
})

const ethMultiVault = new EthMultiVault({
  publicClient,
  walletClient,
})

const { vaultId, events } = await ethMultiVault.createAtom('hello')

console.log(events)
```

# Development

## Building

Run `pnpm build` to build the library.

## Running unit tests

Run `pnpm test` to execute the unit tests

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/0xintuition/intuition-ts) for more information on how to contribute.

## License

This project is licensed under the MIT License.
