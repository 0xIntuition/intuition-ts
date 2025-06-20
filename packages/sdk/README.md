# Intuition sdk

This library consists of high level logic that combines both on-chain and off-chain

## Building

Run `nx build @0xintuition/sdk` to build the library.

## Running unit tests

Run `nx test @0xintuition/sdk` to execute the unit tests

## Examples

### Create a Thing
This example shows how to create a thing using the `createThing` function.

The `thing` is pinned on IPFS and the transaction is sent to the Ethereum network.
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
This example shows how to create a thing using the `createEthereumAccount` function from the SDK.

```ts
import { createEthereumAccount } from '@0xintuition/sdk';

const data = await createEthereumAccount(
    { walletClient, publicClient, address: multivaultAddress },
    {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
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