# Intuition sdk

This Intuition SDK simplifies development with the Intuition backend systems.

## Building

Run `nx build @0xintuition/sdk` to build the library.

## Running unit tests

Run `nx test @0xintuition/sdk` to execute the unit tests

## Usage

### Create a Thing
```ts
import { createThing } from '@0xintuition/sdk';

const data = await createThing(
    { walletClient, publicClient, address: multiVaultAddress },
    {
        url: 'https://www.intuition.systems/',
        name: 'Intuition',
        description: 'A decentralized trust protocol',
        image: 'https://example.com/image.png',
    },
    BigInt(1e18),
)

/*
const data: {
    uri: string;
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
*/
```

### Create an Ethereum Account

```ts
import { createEthereumAccount } from '@0xintuition/sdk';

const data = await createEthereumAccount(
    { walletClient, publicClient, address: multivaultAddress },
    {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        chainId: 1, // Mainnet
    },
    BigInt(1e18),
)

/*
const data: {
    uri: `eip155:${number}:${string}`;
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
*/
```

## Examples

```tsx
import * as React from 'react';
import { createThing, deployments } from '@0xintuition/sdk';
import { useChainId } from 'wagmi'
import { usePublicClient } from 'wagmi'
import { useWalletClient } from 'wagmi'

type IntuitionButton = React.HTMLAttributes<HTMLElement>;

const IntuitionButton = ({ children, className }: IntuitionButton) => {
    const chainId = useChainId()
    const publicClient = usePublicClient()
    const walletClient = useWalletClient()
    
    const handleClick = async ()=> {
        const multiVaultAddress = deployments[chainId].MultiVault
        const data = await createThing(
            { walletClient, publicClient, address: multiVaultAddress },
            {
                url: 'https://www.intuition.systems/',
                name: 'Intuition',
                description: 'A decentralized trust protocol.',
                image: 'https://example.com/image.png',
            },
            BigInt(1e18),
        )
    };

    return(
        <button onClick={handleClick}>
            Create Thing
        </button>
    )}

export { IntuitionButton };
```
