# Intuition Protocol

Intuition Protocol is a TypeScript/JavaScript SDK and smart contract interface for interacting with the Intuition onchain knowledge graph. It provides utilities for creating, managing, and querying atoms and triples, as well as encoding and parsing contract calls and events.

[![Version](https://img.shields.io/npm/v/@0xintuition/protocol.svg)](https://www.npmjs.com/package/@0xintuition/protocol)
[![Downloads/week](https://img.shields.io/npm/dw/@0xintuition/protocol.svg)](https://npmjs.org/package/@0xintuition/protocol)

## Install

```sh-session
npm install viem 0xintuition/protocol
```

```sh-session
pnpm install viem 0xintuition/protocol
```

```sh-session
bun install viem 0xintuition/protocol
```

# Usage

The protocol SDK provides both core/functional and class based functions for interacting with the Intuition protocol.

## Setup

```typescript
import {
  getMultiVaultAddressFromChainId,
  intuitionTestnet,
  multiVaultGetAtomCost,
} from '@0xintuition/protocol'

import { createPublicClient, createWalletClient, http } from 'viem'

const walletClient = createWalletClient({
  chain: intuitionTestnet,
  transport: http(),
  account: account, // metamask, private key, etc
})

const publicClient = createPublicClient({
  chain: intuitionTestnet,
  transport: http(),
})

const address = getMultiVaultAddressFromChainId(intuitionTestnet.id)
```

### Cost Calculation and Multicall

```typescript
import {
  multicallIntuitionConfig,
  multiVaultGetAtomCost,
  multiVaultGetTripleCost,
} from '@0xintuition/protocol/core'

// Get atom creation cost
const atomCost = await multiVaultGetAtomCost({ address, publicClient })

// Get triple creation cost
const tripleCost = await multiVaultGetTripleCost({ address, publicClient })

// Get multiple config values in one call
const config = await multicallIntuitionConfig({ address, publicClient })
```

## Core Functions

### Atom and Triple Creation

```typescript
import {
  multiVaultCreateAtoms,
  multiVaultCreateTriples,
} from '@0xintuition/protocol'

// Create atoms (supports single or multiple)
await multiVaultCreateAtoms(
  { address, walletClient, publicClient },
  {
    args: [
      [atomUri1, atomUri2],
      [atomCost, atomCost],
    ],
    value: atomCost + atomCost,
  },
)

// Create triples (supports single or multiple)
await multiVaultCreateTriples(
  { address, walletClient, publicClient },
  {
    args: [
      [subjectId1, subjectId2],
      [predicateId1, predicateId2],
      [objectId1, objectId2],
      [tripleCost, tripleCost],
    ],
    value: tripleCost + tripleCost,
  },
)
```

### Deposits and Redemptions

```typescript
import { multiVaultDeposit, multiVaultRedeem } from '@0xintuition/protocol'

// Deposit into a vault (atom or triple)
await multiVaultDeposit(
  { address, walletClient, publicClient },
  { args: [receiver, vaultId, curveId, minShares], value },
)

// Redeem shares from a vault
await multiVaultRedeem(
  { address, walletClient, publicClient },
  { args: [receiver, vaultId, curveId, shares, minAssets] },
)
```

### Batch Deposits and Redemptions

```typescript
import {
  multiVaultDepositBatch,
  multiVaultRedeemBatch,
} from '@0xintuition/protocol/core'

// Batch deposit into multiple vaults
await multiVaultDepositBatch(
  { address, walletClient, publicClient },
  { args: [receiver, termIds, curveIds, assets, minShares], value },
)

// Batch redeem shares from multiple vaults
await multiVaultRedeemBatch(
  { address, walletClient, publicClient },
  { args: [shares, receiver, termIds, curveIds, minAssets] },
)
```

### ABI Encoding Helpers

```typescript
import {
  multiVaultCreateAtomsEncode,
  multiVaultCreateTriplesEncode,
  multiVaultDepositEncode,
  multiVaultRedeemEncode,
} from '@0xintuition/protocol/core'

// Encode a multiVaultCreateAtoms call
const data = multiVaultCreateAtomsEncode([atomUri1, atomUri2], [assets1, assets2])

// Encode a multiVaultCreateTriples call
const data = multiVaultCreateTriplesEncode(
  [subjectId1, subjectId2],
  [predicateId1, predicateId2],
  [objectId1, objectId2],
  [assets1, assets2]
)

// Encode deposit and redeem calls
const depositData = multiVaultDepositEncode(receiver, termId, curveId, assets, minShares)
const redeemData = multiVaultRedeemEncode(receiver, termId, curveId, shares, minAssets)
```

## Event Parsing Utilities

```typescript
import {
  eventParseAtomCreated,
  eventParseDeposited,
  eventParseRedeemed,
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

## Using MultiVault contract directly

```typescript
import {
  getMultiVaultAddressFromChainId,
  intuitionTestnet,
  MultiVaultAbi,
} from '@0xintuition/protocol'

import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  parseEventLogs,
  toHex,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// This should be the logged in account (Metamask, etc)
export const account = privateKeyToAccount(
  '0x6c25488133b8ca4ba754ea64886b1bfa4c4b05e7fea057c61f9951fe76f1d657',
)
console.log('Using account: ', account.address)

const walletClient = createWalletClient({
  chain: intuitionTestnet,
  transport: http(),
  account: account,
})

const publicClient = createPublicClient({
  chain: intuitionTestnet,
  transport: http(),
})

const multiVault = getContract({
  abi: MultiVaultAbi,
  address: getMultiVaultAddressFromChainId(intuitionTestnet.id),
  client: {
    public: publicClient,
    wallet: walletClient,
  },
})

async function main() {
  const atomCost = await multiVault.read.multiVaultGetAtomCost()
  const { minDeposit } = await multiVault.read.getGeneralConfig()
  const hash = await multiVault.write.multiVaultCreateAtoms(
    [[toHex('hello world')], [atomCost + minDeposit]],
    {
      value: atomCost + minDeposit,
    },
  )

  const { logs, status } = await publicClient.waitForTransactionReceipt({
    hash,
  })

  if (status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const events = parseEventLogs({
    abi: MultiVaultAbi,
    logs,
    eventName: 'AtomCreated',
  })

  console.log('Atom created', events[0].args.termId)
}

main().catch(console.error)
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
