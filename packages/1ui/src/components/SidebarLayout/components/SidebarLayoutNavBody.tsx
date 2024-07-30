import { cn } from 'styles'

import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export const SidebarLayoutNavBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isMobileView, isCollapsed } = useSidebarLayoutContext()
  return (
    <div
      className={cn(
        'h-full w-full p-2',
        isMobileView &&
          'fixed top-[4.25rem] left-0 bg-background overflow-auto',
        isMobileView && isCollapsed && 'collapse',
        className,
      )}
      {...props}
    />
  )
}
