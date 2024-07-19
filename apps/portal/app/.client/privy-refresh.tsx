import { useEffect } from 'react'

import { usePrivy } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'

export default function PrivyRefresh() {
  const { ready, getAccessToken } = usePrivy()
  const { revalidate } = useRevalidator()

  useEffect(() => {
    async function refresh() {
      if (ready) {
        await getAccessToken()
        revalidate()
      }
    }

    refresh()
  }, [ready, revalidate])

  return <div />
}
