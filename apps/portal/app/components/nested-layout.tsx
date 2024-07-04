import { Outlet } from '@remix-run/react'

import { OptionType, SegmentedNav } from './segmented-nav'

interface NestedLayoutProps {
  children: React.ReactNode
  outlet: typeof Outlet
  options: OptionType[]
}

export function NestedLayout({
  children,
  outlet: OutletComponent,
  options,
}: NestedLayoutProps) {
  return (
    <div className="flex mx-8 my-10">
      <div className="flex-shrink-0 w-1/3 max-w-xs p-4 space-y-4 h-screen overflow-scroll">
        <div className="flex flex-col items-center space-y-4">{children}</div>
      </div>
      <div className="flex-grow p-4 ml-8 h-screen overflow-scroll">
        <div className="flex flex-row justify-end">
          <SegmentedNav options={options} />
        </div>
        <OutletComponent />
      </div>
    </div>
  )
}
