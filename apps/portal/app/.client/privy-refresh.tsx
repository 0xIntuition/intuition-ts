import { useEffect } from 'react'

import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'

export default function PrivyRefresh() {
  const { ready, authenticated, user: privyUser } = usePrivy()
  const { revalidate } = useRevalidator()

  useEffect(() => {
    // if privyUser has changed, revalidate the page
    if (ready && authenticated && privyUser) {
      logger('Detected privy user change')
      revalidate()
    }
  }, [ready, privyUser, revalidate])

  return <div />
}
