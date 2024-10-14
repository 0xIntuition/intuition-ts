import React from 'react'

import { Button } from '@0xintuition/1ui'

import { useSmartWallets } from '@privy-io/react-auth/smart-wallets'

export default function PrivySmartTest() {
  const { client } = useSmartWallets()

  const signMessage = async () => {
    if (!client) {
      console.error('No smart account client found')
      return
    }

    const signature = await client.signMessage({
      message: 'Hello world',
    })
  }

  return <Button onClick={signMessage}>Sign Message</Button>
}
