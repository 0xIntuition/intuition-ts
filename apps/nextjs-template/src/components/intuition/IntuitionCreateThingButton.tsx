import type * as React from 'react'

import { createAtomFromThing, intuitionDeployments } from '@0xintuition/sdk'

import { useChainId, usePublicClient, useWalletClient } from 'wagmi'

export type IntuitionCreateThingButton = React.HTMLAttributes<HTMLElement>

export const IntuitionCreateThingButton = ({
  className,
}: IntuitionCreateThingButton) => {
  const chainId = useChainId()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const handleClick = async () => {
    if (!walletClient || !publicClient) {
      return
    }
    const multiVaultAddress = intuitionDeployments.EthMultiVault[chainId]
    const data = await createAtomFromThing(
      { walletClient, publicClient, address: multiVaultAddress },
      {
        url: 'https://www.intuition.systems/',
        name: 'Intuition',
        description: `'A decentralized trust protocol: ${new Date().toLocaleDateString()}`,
        image: 'https://example.com/image.png',
      },
    )

    alert(`Created Thing with ID: ${data.state.vaultId}`)
  }

  return (
    <button className={className} type="button" onClick={handleClick}>
      Create Thing
    </button>
  )
}
