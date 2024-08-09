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
  disabled?: boolean
  onClick?: () => void
}

export const SidebarNavItem = ({
  iconName,
  label,
  disabled = false,
  onClick,
  ...props
}: SidebarNavItemProps) => {
  const { isMobileView, isCollapsed, setIsCollapsed } =
    useSidebarLayoutContext()

  const buttonProps = {
    variant: disabled ? ButtonVariant.text : ButtonVariant.navigation,
    className: 'w-full justify-start truncate disabled:text-muted',
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
            disabled={disabled}
          >
            {ImageComponent}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant={TextVariant.body}>{label}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : disabled ? (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild className="m-auto">
          <Button
            size={isMobileView ? ButtonSize.xl : ButtonSize.lg}
            {...buttonProps}
            disabled={disabled}
          >
            {ImageComponent}
            {label}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={-140}>
          <Text variant={TextVariant.body} className="text-muted-foreground">
            Coming Soon
          </Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button
      size={isMobileView ? ButtonSize.xl : ButtonSize.lg}
      {...buttonProps}
      disabled={disabled}
    >
      {ImageComponent}
      {label}
    </Button>
  )
}
