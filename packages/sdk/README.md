# Intuition sdk

This Intuition SDK simplifies development with the Intuition backend systems.

## Building

Run `nx build @0xintuition/sdk` to build the library.

## Running unit tests

Run `nx test @0xintuition/sdk` to execute the unit tests

## Usage

The Intuition SDK provides functions to easily upload data to the Intuition backend.

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

### Create Atom from String
```ts
import { createAtomFromString, ATOM_COST } from '@0xintuition/sdk';
const ethMultiVaultAddress = getEthMultiVaultAddress(walletClient.chain.id);
const data = await createAtomFromString(
    { walletClient, publicClient, address: ethMultiVaultAddress },
    'is great'
    ATOM_COST
)
```

### Create Atom from IPFS URI
```ts
import { createAtomFromIpfsUri, ATOM_COST } from '@0xintuition/sdk';

const data = await createAtomFromIpfsUri(
    { walletClient, publicClient, address: ethMultiVaultAddress },
    'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u'
    ATOM_COST
)
```

### Create Atom from IPFS Upload
```ts
import { createAtomFromIpfsUpload, ATOM_COST } from '@0xintuition/sdk';

const data = await createAtomFromIpfsUpload(
    { walletClient, publicClient, address: ethMultiVaultAddress, pinataApiKey: 'your-pinata-api-key'},
    {
        url: 'https://www.intuition.systems/',
        name: 'Intuition',
        description: 'A decentralized trust protocol',
        image: 'https://example.com/image.png',
        tags: ['decentralized', 'trust', 'protocol'],
        twitter: 'https://twitter.com/intuition_systems',
        github: 'github.com/intuition-systems',
    },
    ATOM_COST
)
```

### Create a Thing
```ts
import { createThing, ATOM_COST } from '@0xintuition/sdk';

const data = await createThing(
    { walletClient, publicClient, address: ethMultiVaultAddress },
    {
        url: 'https://www.intuition.systems/',
        name: 'Intuition',
        description: 'A decentralized trust protocol',
        image: 'https://example.com/image.png',
    },
    ATOM_COST
)
```

### Create an Ethereum Account

```ts
import { createEthereumAccount, ATOM_COST } from '@0xintuition/sdk';

const data = await createEthereumAccount(
    { walletClient, publicClient, address: ethMultivaultAddress },
    {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        chainId: 1, // Mainnet
    },
    ATOM_COST
)
```

## Examples

```tsx
import * as React from 'react';
import { createThing, deployments, ATOM_COST } from '@0xintuition/sdk';
import { useChainId } from 'wagmi'
import { usePublicClient } from 'wagmi'
import { useWalletClient } from 'wagmi'

type IntuitionButton = React.HTMLAttributes<HTMLElement>;

const IntuitionButton = ({ children, className }: IntuitionButton) => {
    const chainId = useChainId()
    const publicClient = usePublicClient()
    const walletClient = useWalletClient()
    
    const handleClick = async ()=> {
        const ethMultiVaultAddress = deployments[chainId].MultiVault
        const data = await createThing(
            { walletClient, publicClient, address: ethMultiVaultAddress },
            {
                url: 'https://www.intuition.systems/',
                name: 'Intuition',
                description: 'A decentralized trust protocol.',
                image: 'https://example.com/image.png',
            },
            ATOM_COST
        )
    };

    return(
        <button onClick={handleClick}>
            Create Thing
        </button>
    )}

export { IntuitionButton };
```
