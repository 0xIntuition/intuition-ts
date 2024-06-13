import { Outlet } from '@remix-run/react'

interface NestedLayoutProps {
  children: React.ReactNode
  outlet: typeof Outlet
}

export function NestedLayout({
  children,
  outlet: OutletComponent,
}: NestedLayoutProps) {
  return (
    <div className="m-8 grid grid-cols-3 gap-4">
      <div className="col-span-1 border border-solid border-purple-100 h-full">
        <div className="col-span-1 flex flex-col items-center m-8">
          {children}
        </div>
      </div>
      <div className="col-span-2 border border-solid border-cyan-100">
        <OutletComponent />
      </div>
    </div>
  )
}
