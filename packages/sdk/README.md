# Intuition SDK

This Intuition SDK simplifies development with the Intuition backend systems.

[![Version](https://img.shields.io/npm/v/@0xintuition/sdk.svg)](https://www.npmjs.com/package/@0xintuition/sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@0xintuition/sdk.svg)](https://npmjs.org/package/@0xintuition/sdk)

## Install

```sh-session
npm install 0xintuition/sdk
```

```sh-session
pnpm install 0xintuition/sdk
```

```sh-session
bun install 0xintuition/sdk
```

# Usage

The Intuition SDK simplifies reads and writes to the Intuition backend systems, allowing developers to create and manage `Atoms` and `Triples` with ease.

The SDK requires `viem@2.x.x` to execute reads and writes.

```ts
import {
  getMultiVaultAddressFromChainId,
  intuitionTestnet,
} from '@0xintuition/protocol'

import {
  createPublicClient,
  createWalletClient,
  http,
  privateKeyToAccount,
} from 'viem'

export const address = getMultiVaultAddressFromChainId(intuitionTestnet.id)

export const publicClient = createPublicClient({
  chain: intuitionTestnet,
  transport: http(),
})

const account = privateKeyToAccount(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
)
export const walletClient = createWalletClient({
  chain: intuitionTestnet,
  transport: http(),
  account: account,
})
```

## Reads

```ts
import { getAtomDetails, getTripleDetails } from '@0xintuition/sdk'

const atomData = await getAtomDetails(
  '0x57d94c116a33bb460428eced262b7ae2ec6f865e7aceef6357cec3d034e8ea21',
)

const tripleData = await getTripleDetails(
  '0x4957d3f442acc301ad71e73f26efd6af78647f57dacf2b3a686d91fa773fe0b6',
)
```

## Atoms

### Calculate Atom ID

```ts
import { calculateAtomId } from '@0xintuition/sdk'

const atomId = calculateAtomId(
  'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
)
```

### Create Triple Statement

```ts
// Example of creating a triple statement with three atoms
const atom1 = await createAtomFromString(
  { walletClient, publicClient, address },
  'atom1',
)
const atom2 = await createAtomFromString(
  { walletClient, publicClient, address },
  'atom2',
)
const atom3 = await createAtomFromString(
  { walletClient, publicClient, address },
  'atom3',
)

const triple = await createTripleStatement(
  { walletClient, publicClient, address },
  {
    args: [atom1.state.termId, atom2.state.termId, atom3.state.termId],
    value: 1000000000000000000n, // 1 ETH in wei for deposit
  },
)
```

### Create Atom from String

```ts
import { createAtomFromString } from '@0xintuition/sdk'

const data = await createAtomFromString(
  { walletClient, publicClient, address },
  'is great',
)
```

### Create Atom from IPFS Upload

```ts
import { createAtomFromIpfsUpload } from '@0xintuition/sdk'

const data = await createAtomFromIpfsUpload(
  {
    walletClient,
    publicClient,
    address,
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
import { createAtomFromThing } from '@0xintuition/sdk'

const data = await createAtomFromThing(
  { walletClient, publicClient, address },
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
import { createAtomFromEthereumAccount } from '@0xintuition/sdk'

const data = await createAtomFromEthereumAccount(
  { walletClient, publicClient, address },
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
        creator: Address,
        termId: Hex,
        atomData: Hex,
        atomWallet: Address
    };
}
```

## Triples

### Calculate Triple ID

```ts
import { calculateTripleId } from '@0xintuition/sdk'

const tripleId = calculateTripleId('0x1234', '0x5678', '0x9abc')
```

### Calculate Counter Triple ID

```ts
import { calculateCounterTripleId, calculateTripleId } from '@0xintuition/sdk'

// First, calculate the original triple ID
const tripleId = calculateTripleId('0x1234', '0x5678', '0x9abc')

// Then, calculate the counter triple ID using the original triple ID
const counterTripleId = calculateCounterTripleId(tripleId)
```

### Create Triple Statement

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

## React Example

```tsx
import * as React from 'react'

import {
  createAtomFromThing,
  getMultiVaultAddressFromChainId,
} from '@0xintuition/sdk'

import { useChainId, usePublicClient, useWalletClient } from 'wagmi'

type IntuitionButton = React.HTMLAttributes<HTMLElement>

const IntuitionButton = ({ children, className }: IntuitionButton) => {
  const chainId = useChainId()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const handleClick = async () => {
    const multiVaultAddress = getMultiVaultAddressFromChainId(chainId)
    const data = await createAtomFromThing(
      { walletClient, publicClient, address: multiVaultAddress },
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

# Development

## Building

Run `pnpm build` to build the library.

## Running unit tests

Run `pnpm test` to execute the unit tests

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/0xintuition/intuition-ts) for more information on how to contribute.

## License

This project is licensed under the MIT License.
