# Intuition protocol

## Usage

```typescript
import { MultiVault } from '0xIntuition/protocol'
import { base } from 'viem/chains'
import { createPublicClient, http } from 'viem'

const public = createPublicClient({
  chain: base,
  transport: http(),
})

const wallet = createWalletClient({
  chain: base,
  transport: custom(window.ethereum!),
})

const multiVault = new Multivault({ public, wallet })

const { vaultId, events } = await multiVault.createAtom('hello')

console.log(events)
```

## Building

Run `nx build @0xintuition/protocol` to build the library.

## Running unit tests

Run `nx test @0xintuition/protocol` to execute the unit tests
