# Intuition SDK

This Intuition SDK simplifies development with the Intuition backend systems.

[![Version](https://img.shields.io/npm/v/@0xintuition/sdk.svg)](https://www.npmjs.com/package/@0xintuition/sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@0xintuition/sdk.svg)](https://npmjs.org/package/@0xintuition/sdk)

## Building

Run `pnpm build` to build the library.

## Running unit tests

Run `pnpm test` to execute the unit tests

# Usage

The Intuition SDK simplifies reads and writes to the Intuition backend systems, allowing developers to create and manage `Atoms` and `Triples` with ease.

The SDK requires `viem@2.x.x` to execute reads and writes.

```ts
import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  http,
  privateKeyToAccount,
  type Chain,
} from 'viem'
import { base } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
})

const account = privateKeyToAccount(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
)
export const walletClient = createWalletClient({
  chain: base,
  transport: http(),
  account: account,
})
```

## Reads

```ts
import { getAtom, getTriple } from '@0xintuition/sdk'

const atomData = await getAtom('124862')

const tripleData = await getTriple('54670')
```

## Triples

```ts
import { createAtomFromString, createTripleStatement } from '@0xintuition/sdk'

// Example of creating a triple statement with three atoms
const atom1 = await createAtomFromString(
  { walletClient, publicClient, address: multivaultAddress },
  'atom1',
)
const atom2 = await createAtomFromString(
  { walletClient, publicClient, address: multivaultAddress },
  'atom2',
)
const atom3 = await createAtomFromString(
  { walletClient, publicClient, address: multivaultAddress },
  'atom3',
)

const triple = await createTripleStatement(
  { walletClient, publicClient, address: multivaultAddress },
  {
    args: [atom1.state.vaultId, atom2.state.vaultId, atom3.state.vaultId],
  },
)
```

## Atoms

### Create Atom from String

```ts
import { createAtomFromString, getEthMultiVaultAddress } from '@0xintuition/sdk'

const ethMultiVaultAddress = getEthMultiVaultAddress(walletClient.chain.id)
const data = await createAtomFromString(
  { walletClient, publicClient, address: ethMultiVaultAddress },
  'is great',
)
```

### Create Atom from IPFS URI

```ts
import {
  createAtomFromIpfsUri,
  getEthMultiVaultAddress,
} from '@0xintuition/sdk'

const ethMultiVaultAddress = getEthMultiVaultAddress(walletClient.chain.id)
const data = await createAtomFromIpfsUri(
  { walletClient, publicClient, address: ethMultiVaultAddress },
  'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
)
```

### Create Atom from IPFS Upload

```ts
import {
  createAtomFromIpfsUpload,
  getEthMultiVaultAddress,
} from '@0xintuition/sdk'

const ethMultiVaultAddress = getEthMultiVaultAddress(walletClient.chain.id)
const data = await createAtomFromIpfsUpload(
  {
    walletClient,
    publicClient,
    address: ethMultiVaultAddress,
    pinataApiKey: 'your-pinata-api-key',
  },
  {
    url: 'https://www.intuition.systems/',
    name: 'Intuition',
    description: 'A decentralized trust protocol',
    image: 'https://example.com/image.png',
    tags: ['decentralized', 'trust', 'protocol'],
    twitter: 'https://twitter.com/intuition_systems',
    github: 'github.com/intuition-systems',
  },
)
```

### Create a Thing

```ts
import { createThing, getEthMultiVaultAddress } from '@0xintuition/sdk'

const ethMultiVaultAddress = getEthMultiVaultAddress(walletClient.chain.id)
const data = await createThing(
  { walletClient, publicClient, address: ethMultiVaultAddress },
  {
    url: 'https://www.intuition.systems/',
    name: 'Intuition',
    description: 'A decentralized trust protocol',
    image: 'https://example.com/image.png',
  },
)
```

### Create an Ethereum Account

```ts
import {
  createEthereumAccount,
  getEthMultiVaultAddress,
} from '@0xintuition/sdk'

const ethMultiVaultAddress = getEthMultiVaultAddress(walletClient.chain.id)
const data = await createEthereumAccount(
  { walletClient, publicClient, address: ethMultivaultAddress },
  {
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    chainId: 1, // Mainnet
  },
)
```

After successfully creating a new `Atom` the SDK will return a `data` object containing the uri, transaction hash and other relevant state.

```ts
const data: {
    uri: string
    transactionHash: `0x${string}`;
    state: {
        sender: `0x${string}`;
        receiver: `0x${string}`;
        receiverTotalSharesInVault: bigint;
        senderAssetsAfterTotalFees: bigint;
        sharesForReceiver: bigint;
        entryFee: bigint;
        vaultId: bigint;
        isTriple: boolean;
        isAtomWallet: boolean;
    };
}
```

## Examples

```tsx
import * as React from 'react'

import { createThing, getEthMultiVaultAddress } from '@0xintuition/sdk'

import { useChainId, usePublicClient, useWalletClient } from 'wagmi'

type IntuitionButton = React.HTMLAttributes<HTMLElement>

const IntuitionButton = ({ children, className }: IntuitionButton) => {
  const chainId = useChainId()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const handleClick = async () => {
    const ethMultiVaultAddress = getEthMultiVaultAddress(chainId)
    const data = await createThing(
      { walletClient, publicClient, address: ethMultiVaultAddress },
      {
        url: 'https://www.intuition.systems/',
        name: 'Intuition',
        description: 'A decentralized trust protocol.',
        image: 'https://example.com/image.png',
      },
    )
  }

  return <button onClick={handleClick}>Create Thing</button>
}

export { IntuitionButton }
```

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/0xintuition/intuition-ts) for more information on how to contribute.

## License

This project is licensed under the MIT License.
