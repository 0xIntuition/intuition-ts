import { Outlet } from '@remix-run/react'

import { OptionType, SegmentedNav } from './segmented-nav'

interface NestedLayoutProps {
  children: React.ReactNode
  outlet: typeof Outlet
  options?: OptionType[]
}

export function NestedLayout({
  children,
  outlet: OutletComponent,
  options,
}: NestedLayoutProps) {
  return (
    <div className="flex gap-6">
      <div className="flex pl-6 pr-10 py-10 w-1/3 max-w-xs flex-shrink-0 min-h-screen">
        <div className="flex flex-col items-center">{children}</div>
      </div>
      <div className="flex flex-col flex-grow h-screen min-h-screen gap-8 pr-10 py-10">
        {options && (
          <div className="flex flex-row justify-end">
            <SegmentedNav options={options} />
          </div>
        )}
        <OutletComponent />
      </div>
    </div>
  )
}
