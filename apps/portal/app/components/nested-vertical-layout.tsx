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
    <div className="flex flex-col pl-6 pr-10 py-10 gap-6 items-center justify-center">
      <SegmentedNav options={options} />
      <div className="w-full">
        <OutletComponent />
      </div>
    </div>
  )
}
