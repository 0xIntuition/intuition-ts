import { cn } from 'styles'

import { useSidebarLayoutContext } from './SidebarLayoutProvider'
import { TimedLoaderComponent } from './TimedLoaderComponent'

export interface SidebarLayoutNavHeaderButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  imgLogo: React.ReactElement
  textLogo: React.ReactElement
}

export const SidebarLayoutNavHeaderButton = ({
  imgLogo,
  textLogo,
  ...props
}: SidebarLayoutNavHeaderButtonProps) => {
  const { isMobileView, isCollapsed } = useSidebarLayoutContext()
  return (
    <TimedLoaderComponent
      disableLoader={isMobileView}
      componentToRender={
        <button
          className={cn(
            isCollapsed && !isMobileView ? 'm-auto p-2' : 'w-full px-4 py-2',
            'flex gap-3 items-center',
          )}
          {...props}
        >
          {imgLogo}
          {(!isCollapsed || (isCollapsed && isMobileView)) && textLogo}
        </button>
      }
    />
  )
}
