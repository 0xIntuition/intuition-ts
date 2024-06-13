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
    <div className="flex mx-8">
      <div className="flex-shrink-0 w-1/3 max-w-xs p-4 space-y-4  h-screen">
        <div className="flex flex-col items-center space-y-4">{children}</div>
      </div>
      <div className="flex-grow p-4 ml-8 h-screen">
        <OutletComponent />
      </div>
    </div>
  )
}
