import { cn } from 'styles'

import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarLayoutNavHeaderButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  imgLogo: React.ReactElement
  textLogo: React.ReactElement
  productLogo: React.ReactElement
}

export const SidebarLayoutNavHeaderButton = ({
  imgLogo,
  textLogo,
  productLogo,
  ...props
}: SidebarLayoutNavHeaderButtonProps) => {
  const { isMobileView, isCollapsed } = useSidebarLayoutContext()
  return (
    <button
      className={cn(
        isCollapsed && !isMobileView ? 'm-auto p-2' : 'w-full px-4 py-2',
        'flex gap-3 items-center',
      )}
      {...props}
    >
      {imgLogo}
      {(!isCollapsed || (isCollapsed && isMobileView)) && textLogo}
      {productLogo}
    </button>
  )
}
