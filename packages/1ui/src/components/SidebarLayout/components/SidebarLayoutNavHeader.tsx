import { cn } from 'styles'

import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export const SidebarLayoutNavHeader = ({ ...props }) => {
  const { isCollapsed } = useSidebarLayoutContext()
  return (
    <div
      className={cn(
        'border-border/20 flex w-full items-center border-0 border-b-[1px] py-4',
        isCollapsed ? 'px-5' : 'px-6',
      )}
      {...props}
    ></div>
  )
}
