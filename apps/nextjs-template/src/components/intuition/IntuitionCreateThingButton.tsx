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
    // ⚠️ SECURITY WARNING: DO NOT USE IN PRODUCTION ⚠️
    // NEXT_PUBLIC_* environment variables are exposed to the browser.
    // This is INSECURE for production use as users can extract your API key.
    //
    // For production, use a backend API route to proxy Pinata uploads securely:
    // 1. Create an API route: app/api/upload-to-pinata/route.ts
    // 2. Store JWT in server-side env (not NEXT_PUBLIC_*)
    // 3. Call it from client: const response = await fetch('/api/upload-to-pinata', {
    //      method: 'POST',
    //      headers: { 'Content-Type': 'application/json' },
    //      body: JSON.stringify(data)
    //    })
    //
    // THIS EXAMPLE IS FOR DEVELOPMENT/TESTING ONLY
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
