import { Button, buttonVariants } from '@components/Button'
import { Icon, IconName } from '@components/Icon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/Tooltip'
import { Text } from '@components/Text'
import { type VariantProps } from 'class-variance-authority'
import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarNavItemProps
  extends VariantProps<typeof buttonVariants> {
  iconName: IconName
  label: string
  onClick: () => void
}

export const SidebarNavItem = ({
  iconName,
  label,
  variant,
  onClick,
  ...props
}: SidebarNavItemProps) => {
  const { isCollapsed } = useSidebarLayoutContext()
  const buttonProps = {
    variant,
    className: 'w-full',
    onClick,
    ...props,
  }
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="iconMd" {...buttonProps}>
            <Icon name={iconName} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant="body">{label}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button size="md" {...buttonProps}>
      <Icon name={iconName} />
      {label}
    </Button>
  )
}
