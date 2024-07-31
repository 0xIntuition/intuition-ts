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
          'fixed top-[3.45rem] left-0 right-0 bottom-0 bg-background overflow-none z-50 h-auto',
        isMobileView && isCollapsed && 'collapse',
        className,
      )}
      {...props}
    />
  )
}
