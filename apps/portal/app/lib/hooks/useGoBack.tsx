import { useLocation, useNavigate } from '@remix-run/react'

function useGoBack({ fallbackRoute }: { fallbackRoute: string }) {
  const navigate = useNavigate()
  const location = useLocation()

  return () => {
    if (window.history.length > 2 && location.key !== 'default') {
      navigate(-1)
    } else {
      navigate(fallbackRoute)
    }
  }
}

export { useGoBack }
