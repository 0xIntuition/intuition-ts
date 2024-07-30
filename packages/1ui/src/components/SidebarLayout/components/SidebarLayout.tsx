import { cn } from 'styles'

import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export const SidebarLayout = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isMobileView } = useSidebarLayoutContext()
  return (
    <div
      className={cn('flex h-full w-full', isMobileView && 'flex-col')}
      {...props}
    ></div>
  )
}
