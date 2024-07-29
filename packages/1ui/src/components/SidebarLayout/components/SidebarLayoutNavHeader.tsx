import { Button, ButtonSize, ButtonVariant } from 'components/Button'
import { Icon, IconName } from 'components/Icon'
import { cn } from 'styles'

import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export const SidebarLayoutNavHeader = ({ ...props }) => {
  const { isMobileView, isCollapsed } = useSidebarLayoutContext()
  return (
    <div
      className={cn(
        'border-border/20 flex w-full items-center border-0 border-b-[1px] py-4',
        isCollapsed && !isMobileView ? 'justify-center' : 'px-6',
        isMobileView && 'justify-between',
      )}
      {...props}
    >
      {props.children}
      {isMobileView && (
        <Button
          variant={ButtonVariant.text}
          size={ButtonSize.icon}
          className="p-0"
        >
          <Icon name={IconName.settingsGear} />
        </Button>
      )}
    </div>
  )
}
