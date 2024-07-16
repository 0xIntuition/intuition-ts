import React, { useEffect } from 'react'

import { usePrivy } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'

export interface PrivyRevalidateProps {}

export default function PrivyRevalidate({}: PrivyRevalidateProps) {
  const { ready, authenticated, user: privyUser } = usePrivy()
  const { revalidate } = useRevalidator()

  useEffect(() => {
    // if privyUser has changed, revalidate the page
    if (ready && authenticated && privyUser) {
      console.log('DETECTED PRIVY USER CHANGE', privyUser)
      revalidate()
    }
  }, [ready, privyUser, revalidate])

  return <div></div>
}
