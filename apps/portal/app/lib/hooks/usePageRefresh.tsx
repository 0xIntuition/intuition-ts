import { useLocation, useNavigate } from '@remix-run/react'

export function usePageRefresh() {
  const navigate = useNavigate()
  const location = useLocation()

  const refreshPage = () => {
    navigate(location.pathname + location.search + location.hash, {
      replace: true,
    })
  }

  return refreshPage
}
