import { useEffect } from 'react'

import { usePrivy } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'

export default function PrivyRevalidate() {
  const { ready, authenticated, user: privyUser } = usePrivy()
  const { revalidate } = useRevalidator()

  useEffect(() => {
    // if privyUser has changed, revalidate the page
    if (ready && authenticated && privyUser) {
      revalidate()
    }
    // omits authenticate from the exhaustive deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, privyUser, revalidate])

  return <div></div>
}
