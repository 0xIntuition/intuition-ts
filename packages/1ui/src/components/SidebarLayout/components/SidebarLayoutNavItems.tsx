import { cn } from 'styles'

import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export const SidebarLayoutNavItems = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isMobileView, isCollapsed } = useSidebarLayoutContext()
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 p-2 flex-1',
        isCollapsed && !isMobileView && 'justify-center w-fit',
        isCollapsed && isMobileView && 'display-none',
        className,
      )}
      {...props}
    ></div>
  )
}
