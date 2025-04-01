import { Button, ButtonSize, ButtonVariant, Icon, IconName } from '../..'
import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export const SidebarLayoutNavHeader = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isMobileView, isCollapsed, setIsCollapsed } =
    useSidebarLayoutContext()
  return (
    <div className="flex w-full items-center p-2" {...props}>
      {children}
      {isMobileView && (
        <Button
          variant={ButtonVariant.text}
          size={ButtonSize.icon}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Icon name={isCollapsed ? IconName.hamburger : IconName.crossLarge} />
        </Button>
      )}
    </div>
  )
}
