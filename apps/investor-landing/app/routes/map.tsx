import { useEffect, useState } from 'react'

import Desktop from '@components/desktop'
import Mobile from '@components/mobile'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 1000px)').matches
    }
    return false
  })

  useEffect(() => {
    setIsLoading(false)

    if (!isMobile) {
      const html = document.querySelector('html')
      if (html) {
        html.style.overflow = 'hidden'
      }
    } else {
      const html = document.querySelector('html')
      if (html) {
        html.style.overflow = 'auto'
      }
    }
  }, [isMobile])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1000px)')

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (isLoading) {
    return null
  }

  return <div>{isMobile ? <Mobile /> : <Desktop />}</div>
}
