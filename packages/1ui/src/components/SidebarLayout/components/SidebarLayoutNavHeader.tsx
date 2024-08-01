import { Button, ButtonSize, ButtonVariant, Icon, IconName } from '../..'
import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export const SidebarLayoutNavHeader = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isMobileView, isCollapsed, setIsCollapsed } =
    useSidebarLayoutContext()
  return (
    <div
      className="border-border/20 flex w-full items-center border-0 border-b-[1px] p-2"
      {...props}
    >
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
