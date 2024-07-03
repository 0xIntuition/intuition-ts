import { type VariantProps } from 'class-variance-authority'

import {
  Button,
  buttonVariants,
  Icon,
  IconNameType,
  Text,
  TextVariant,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../..'
import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarNavItemProps
  extends VariantProps<typeof buttonVariants> {
  iconName: IconNameType
  label: string
  onClick?: () => void
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
    className: 'w-full justify-start',
    onClick,
    ...props,
  }
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="iconLg" {...buttonProps}>
            <Icon name={iconName} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant={TextVariant.body}>{label}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button size="lg" {...buttonProps}>
      <Icon name={iconName} />
      {label}
    </Button>
  )
}
