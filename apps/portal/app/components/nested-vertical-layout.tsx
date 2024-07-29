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
    <div className="flex flex-col flex-grow gap-2 py-10 items-center">
      <SegmentedNav options={options} />
      <div className="w-2/3">
        <OutletComponent />
      </div>
    </div>
  )
}
