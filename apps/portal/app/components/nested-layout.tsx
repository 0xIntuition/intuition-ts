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
    <div className="flex">
      <div className="flex px-10 py-10 w-[400px] flex-shrink-0 min-h-screen">
        <div className="flex flex-col items-center w-full">{children}</div>
      </div>
      <div className="flex flex-col flex-grow h-screen min-h-screen gap-6 pr-10 py-10">
        {options && (
          <div className="flex flex-row justify-end">
            <SegmentedNav options={options} />
          </div>
        )}
        <div className="pb-10">
          <OutletComponent />
        </div>
      </div>
    </div>
  )
}
