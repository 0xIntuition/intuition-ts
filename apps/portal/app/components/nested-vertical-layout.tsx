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
    <div className="w-full flex flex-col items-center flex-grow gap-4">
      <SegmentedNav options={options} />
      <OutletComponent />
    </div>
  )
}
