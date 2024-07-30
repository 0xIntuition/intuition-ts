import { Button, ButtonSize, ButtonVariant, Icon, IconName } from '../../../'
import { cn } from '../../../styles'
import { SIDEBAR_LOCAL_STORAGE_VARIABLE } from '../constants'
import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarLayoutNavProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarLayoutNav = ({
  className,
  ...props
}: SidebarLayoutNavProps) => {
  const { isCollapsed, setIsCollapsed } = useSidebarLayoutContext()

  const toggleIsCollapsedValues = () => {
    setIsCollapsed(!isCollapsed)
    localStorage.setItem(
      SIDEBAR_LOCAL_STORAGE_VARIABLE,
      !isCollapsed ? 'true' : 'false',
    )
  }
  return (
    <div
      className={cn(
        'theme-border border-0 border-r-px transition-all duration-300 ease-in-out',
        className,
      )}
      style={{ width: isCollapsed ? '5rem' : '24rem' }}
    >
      <div
        className="from-primary/10 to-primary/2 bg-gradient-to-b flex flex-col h-full w-full relative top-0"
        {...props}
      />
      <Button
        className="relative right-[-0.75rem] float-right w-6 h-6 top-[-50%] bg-background theme-border"
        variant={ButtonVariant.ghost}
        size={ButtonSize.icon}
        onClick={toggleIsCollapsedValues}
      >
        <Icon
          name={isCollapsed ? IconName.chevronRight : IconName.chevronLeft}
          className="w-6 h-6"
        />
      </Button>
    </div>
  )
}
