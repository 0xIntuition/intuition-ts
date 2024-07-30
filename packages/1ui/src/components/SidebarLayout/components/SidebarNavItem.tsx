import { ReactNode, useEffect, useState } from 'react'

import { type VariantProps } from 'class-variance-authority'

import {
  Button,
  ButtonVariant,
  buttonVariants,
  Icon,
  IconNameType,
  Skeleton,
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
  const { isCollapsed } = useSidebarLayoutContext()
  const [showLoader, setShowLoader] = useState(true)
  const buttonProps = {
    variant: ButtonVariant.navigation,
    className: 'w-full justify-start truncate',
    onClick,
    ...props,
  }

  const ImageComponent =
    typeof iconName === 'string' ? (
      <Icon name={iconName as IconNameType} />
    ) : (
      iconName
    )

  useEffect(() => {
    setShowLoader(true)
    setTimeout(() => setShowLoader(false), 300)
  }, [isCollapsed])

  return showLoader ? (
    <Skeleton className="w-full h-10" />
  ) : isCollapsed ? (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild className="m-auto">
          <Button size="iconLg" {...buttonProps} className="justify-center">
            {ImageComponent}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant={TextVariant.body}>{label}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button size="lg" {...buttonProps}>
      {ImageComponent}
      {label}
    </Button>
  )
}
