# Intuition protocol

## Usage

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

## Building

Run `pnpm build` to build the library.

## Running unit tests

Run `pnpm test` to execute the unit tests
