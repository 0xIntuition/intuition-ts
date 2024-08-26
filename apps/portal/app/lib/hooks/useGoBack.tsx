import { useLocation, useNavigate } from '@remix-run/react'

function useGoBack({ fallbackRoute }: { fallbackRoute: string }) {
  const navigate = useNavigate()
  const location = useLocation()

  return () => {
    if (location.key === 'default') {
      navigate(fallbackRoute)
    } else {
      navigate(-1)
    }
  }
}

export { useGoBack }
