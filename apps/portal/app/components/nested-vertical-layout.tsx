import { useEffect } from 'react'

import { Outlet, useLocation } from '@remix-run/react'

import { OptionType, SegmentedNav } from './segmented-nav'

interface NestedVerticalLayoutProps {
  outlet: typeof Outlet
  options: OptionType[]
}

export function NestedVerticalLayout({
  outlet: OutletComponent,
  options,
}: NestedVerticalLayoutProps) {
  const location = useLocation()

  useEffect(() => {
    const container = document.querySelector('.scroll-container')
    if (container) {
      container.scrollTo(0, 0)
    }
  }, [location.pathname])

  return (
    <div className="flex flex-col flex-grow h-screen min-h-screen gap-8 overflow-y-scroll px-72 py-10 items-center scroll-container">
      <SegmentedNav options={options} />
      <div className="w-full">
        <OutletComponent />
      </div>
    </div>
  )
}
