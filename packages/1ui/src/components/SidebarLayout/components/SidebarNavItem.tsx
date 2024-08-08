import { ReactNode } from 'react'

import { type VariantProps } from 'class-variance-authority'

import {
  Button,
  ButtonSize,
  ButtonVariant,
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
  iconName: IconNameType | ReactNode
  label: string
  onClick?: () => void
}

export const SidebarNavItem = ({
  iconName,
  label,
  onClick,
  ...props
}: SidebarNavItemProps) => {
  const { isMobileView, isCollapsed, setIsCollapsed } =
    useSidebarLayoutContext()

  const buttonProps = {
    variant: ButtonVariant.navigation,
    className: 'w-full justify-start truncate',
    onClick: () => {
      onClick && onClick()
      isMobileView && setIsCollapsed(true)
    },
    ...props,
  }

  const ImageComponent =
    typeof iconName === 'string' ? (
      <Icon name={iconName as IconNameType} />
    ) : (
      iconName
    )

  return isCollapsed && !isMobileView ? (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild className="m-auto">
          <Button
            size={isMobileView ? ButtonSize.iconXl : ButtonSize.iconLg}
            {...buttonProps}
            className="justify-center"
          >
            {ImageComponent}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant={TextVariant.body}>{label}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button
      size={isMobileView ? ButtonSize.xl : ButtonSize.lg}
      {...buttonProps}
    >
      {ImageComponent}
      {label}
    </Button>
  )
}
