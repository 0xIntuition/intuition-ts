import { useEffect, useRef } from 'react'

import { useLocation, useNavigate } from '@remix-run/react'

function useGoBack({ fallbackRoute }: { fallbackRoute: string }) {
  const navigate = useNavigate()
  const location = useLocation()
  const hasNavigated = useRef(false)

  useEffect(() => {
    hasNavigated.current = true
  }, [location])

  return () => {
    if (hasNavigated.current && window.history.length > 2) {
      navigate(-1)
    } else {
      window.location.href = fallbackRoute
    }
  }
}

export { useGoBack }
