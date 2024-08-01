import { Outlet } from '@remix-run/react'

import { OptionType, SegmentedNav } from './segmented-nav'

interface NestedTabsProps {
  outlet: typeof Outlet
  options: OptionType[]
}

export function NestedTabs({
  outlet: OutletComponent,
  options,
}: NestedTabsProps) {
  return (
    <div className="w-full flex flex-col items-center flex-grow gap-6">
      <SegmentedNav options={options} />
      <OutletComponent />
    </div>
  )
}
