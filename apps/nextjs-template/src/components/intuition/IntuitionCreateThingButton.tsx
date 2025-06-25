import { createThing, deployments } from '@0xintuition/sdk';
import type * as React from 'react';
import { useChainId, usePublicClient, useWalletClient } from 'wagmi';

type IntuitionCreateThingButton = React.HTMLAttributes<HTMLElement>;

const IntuitionCreateThingButton = ({ className }: IntuitionCreateThingButton) => {
    const chainId = useChainId()
    const publicClient = usePublicClient()
    const {data: walletClient} = useWalletClient()

    const handleClick = async ()=> {
        if(!walletClient || !publicClient) return;
        const multiVaultAddress = deployments[chainId]
        const data = await createThing(
            { walletClient, publicClient, address: multiVaultAddress },
            {
                url: 'https://www.intuition.systems/',
                name: 'Intuition',
                description: `'A decentralized trust protocol: ${new Date().toLocaleDateString()}`,
                image: 'https://example.com/image.png',
            },
            BigInt(420000000000000),
        )

        alert(`Created Thing with ID: ${data.state.vaultId}`);
    };

    return(
        <button className={className} onClick={handleClick}>
            Create Thing
        </button>
    )}

export type { IntuitionCreateThingButton };
