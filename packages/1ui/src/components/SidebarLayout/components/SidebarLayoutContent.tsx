import { useEffect, useRef } from 'react'

import { cn } from 'styles'

interface SidebarLayoutContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  currentPathname: string
}

export const SidebarLayoutContent = ({
  currentPathname,
  className,
  ...props
}: SidebarLayoutContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => containerRef.current?.scrollTo(0, 0), [currentPathname])
  return (
    <div
      ref={containerRef}
      className={cn(
        'h-full w-full overflow-y-auto overflow-x-hidden',
        className,
      )}
      {...props}
    />
  )
}
