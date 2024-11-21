import { useCallback, useEffect, useState } from 'react'

import LoadingLogo from '@components/loading-logo'
import logger from '@lib/utils/logger'
import { usePrivy } from '@privy-io/react-auth'

export default function PrivyRefresh({
  refreshPath,
  redirectTo,
}: {
  refreshPath: string
  redirectTo: string
}) {
  const { ready, getAccessToken } = usePrivy()
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      if (!ready) {
        return
      }

      logger('Getting access token...')
      const idToken = await getAccessToken()
      logger('Access token:', idToken)
      setAccessToken(idToken)
    } catch (error) {
      console.error('Failed to refresh session:', error)
    }
  }, [ready])

  useEffect(() => {
    refresh()
  }, [refresh])
  useEffect(() => {
    if (accessToken) {
      // instead of revalidating, redirect to same route and replace true
      logger('Redirecting to', `${refreshPath}?redirectTo=${redirectTo}`)
      window.location.replace(`${refreshPath}?redirectTo=${redirectTo}`)
    }
  }, [accessToken])

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        role="status"
        className="flex flex-col items-center gap-4"
        aria-label="Refreshing session"
      >
        <LoadingLogo size={50} />
        <div className="flex flex-col items-center gap-1">
          <p className="text-base text-foreground/70 font-medium">
            Reconnecting your session...
          </p>
          <p className="text-sm text-muted-foreground">
            This will only take a moment.
          </p>
        </div>
      </div>
    </div>
  )
}
