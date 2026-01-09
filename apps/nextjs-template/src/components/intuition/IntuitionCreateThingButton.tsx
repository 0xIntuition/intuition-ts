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
    // WARNING: NEXT_PUBLIC_* environment variables are exposed to the browser.
    // This is INSECURE for production use as users can extract your API key.
    // For production, use a backend API route to proxy Pinata uploads securely.
    // Example: POST /api/upload-to-pinata with server-side JWT handling.
    const pinataApiJWT = process.env.NEXT_PUBLIC_PINATA_API_JWT
    if (!pinataApiJWT) {
      alert('Pinata API JWT not configured')
      return
    }
    const multiVaultAddress = intuitionDeployments.MultiVault[chainId]
    const data = await createAtomFromThing(
      {
        walletClient,
        publicClient,
        address: multiVaultAddress,
        pinataApiJWT,
      },
      {
        url: 'https://www.intuition.systems/',
        name: 'Intuition',
        description: `A decentralized trust protocol: ${new Date().toLocaleDateString()}`,
        image: 'https://example.com/image.png',
      },
    )

    alert(`Created Thing with ID: ${data.state.termId}`)
  }

  return (
    <button className={className} type="button" onClick={handleClick}>
      Create Thing
    </button>
  )
}
