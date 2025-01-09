# Intuition protocol

## Usage

```typescript
import { MultiVault } from '0xIntuition/protocol'
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

const multiVault = new Multivault({
  publicClient,
  walletClient,
})

const { vaultId, events } = await multiVault.createAtom('hello')

console.log(events)
```

## Building

Run `nx build @0xintuition/protocol` to build the library.

## Running unit tests

Run `nx test @0xintuition/protocol` to execute the unit tests
