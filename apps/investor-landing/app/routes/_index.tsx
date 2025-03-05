import { useEffect } from 'react'

import intuitionLogo from '@assets/intuition-logo.svg'
import investorLandingBg from '@assets/investor-landing-bg.png'
import InvestorsWelcome from '@components/investors-welcome/investors-welcome'
import { useLocation } from '@remix-run/react'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="h-screen w-screen m-0 p-0 flex relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <img
          src={investorLandingBg}
          alt="Investor landing background"
          className="h-[120vh] w-auto object-contain"
          aria-hidden="true"
        />
      </div>
      <div className="absolute top-8 left-8 flex flex-col items-start">
        <img src={intuitionLogo} alt="Intuition Logo" className="h-8 w-auto" />
      </div>

      <div className="w-full flex items-center justify-center">
        <InvestorsWelcome />
      </div>
    </div>
  )
}
