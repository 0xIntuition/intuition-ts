import { Outlet } from '@remix-run/react'

import { OptionType, SegmentedNav } from './segmented-nav'

interface NestedVerticalLayoutProps {
  outlet: typeof Outlet
  options: OptionType[]
}

export function NestedVerticalLayout({
  outlet: OutletComponent,
  options,
}: NestedVerticalLayoutProps) {
  return (
    <div className="flex flex-col items-center px-8 py-10 h-screen overflow-y-scroll">
      <SegmentedNav options={options} />
      <div className="w-full">
        <OutletComponent />
      </div>
    </div>
  )
}
