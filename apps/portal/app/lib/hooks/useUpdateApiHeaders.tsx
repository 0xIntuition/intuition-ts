import { useEffect } from 'react'

import { OpenAPI } from '@0xintuition/api'

import { getAuthHeaders } from '@lib/utils/misc'
import { useLocation, useMatches } from '@remix-run/react'

export function useUpdateApiHeaders() {
  const matches = useMatches()
  const location = useLocation()

  useEffect(() => {
    const updateHeaders = async () => {
      const accessToken = localStorage.getItem('privy:token')
      console.log('[useUpdateApiHeaders] Current accessToken:', accessToken)

      if (accessToken) {
        const headers = getAuthHeaders(accessToken)
        OpenAPI.HEADERS = headers as Record<string, string>
        console.log(
          '[useUpdateApiHeaders] Updated OpenAPI.HEADERS:',
          OpenAPI.HEADERS,
        )
      } else {
        console.log('[useUpdateApiHeaders] No accessToken found')
      }
    }

    updateHeaders()
  }, [matches, location.search])
}
