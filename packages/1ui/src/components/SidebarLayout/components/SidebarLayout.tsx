import { cn } from 'styles'

import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export const SidebarLayout = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isMobileView, isCollapsed } = useSidebarLayoutContext()
  return (
    <div
      className={cn(
        'flex h-full w-full overflow-x-hidden',
        isMobileView && 'flex-col',
        isMobileView && !isCollapsed && 'overflow-hidden',
      )}
      {...props}
    ></div>
  )
}
