import type * as React from 'react'

import { createAtomFromIpfsUri, intuitionDeployments } from '@0xintuition/sdk'

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

    try {
      const multiVaultAddress = intuitionDeployments.MultiVault[chainId]
      const thing = {
        url: 'https://www.intuition.systems/',
        name: 'Intuition',
        description: `'A decentralized trust protocol: ${new Date().toLocaleDateString()}`,
        image: 'https://example.com/image.png',
      }
      const pinResponse = await fetch('/api/intuition/pin-thing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(thing),
      })
      const pinData = (await pinResponse.json()) as {
        error?: string
        uri?: `ipfs://${string}`
      }

      if (!pinResponse.ok || !pinData.uri) {
        throw new Error(pinData.error ?? 'Failed to pin Thing data.')
      }

      const data = await createAtomFromIpfsUri(
        { walletClient, publicClient, address: multiVaultAddress },
        pinData.uri,
      )

      alert(`Created Thing with ID: ${data.state.termId}`)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create Thing.')
    }
  }

  return (
    <button className={className} type="button" onClick={handleClick}>
      Create Thing
    </button>
  )
}
