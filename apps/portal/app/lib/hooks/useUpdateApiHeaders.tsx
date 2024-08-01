import { useEffect, useRef } from 'react'

import { OpenAPI } from '@0xintuition/api'

import { getAuthHeaders } from '@lib/utils/misc'
import { useLocation, useMatches } from '@remix-run/react'

export function useUpdateApiHeaders() {
  const matches = useMatches()
  const location = useLocation()
  const tokenRef = useRef<string | null>(null)

  useEffect(() => {
    const updateHeaders = () => {
      const accessToken = localStorage.getItem('privy:token')
      if (accessToken !== tokenRef.current) {
        tokenRef.current = accessToken
        const headers = getAuthHeaders(accessToken || '')
        OpenAPI.HEADERS = headers as Record<string, string>
        console.log('Updated API headers', OpenAPI.HEADERS)
      }
    }

    updateHeaders()
  }, [matches, location.search])

  return tokenRef
}
