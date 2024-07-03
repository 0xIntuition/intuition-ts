import { type VariantProps } from 'class-variance-authority'

import {
  Avatar,
  Button,
  buttonVariants,
  Text,
  TextVariant,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../'
import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarLayoutNavAvatarProps
  extends VariantProps<typeof buttonVariants> {
  imageSrc: string
  name: string
  onClick?: () => void
}

export const SidebarLayoutNavAvatar = ({
  imageSrc,
  name,
  onClick,
}: SidebarLayoutNavAvatarProps) => {
  const { isCollapsed } = useSidebarLayoutContext()
  const buttonProps = {
    className: 'w-full justify-start',
    onClick,
  }
  const AvatarComponent = () => (
    <Avatar className="h-6 w-6" src={imageSrc} name={name} />
  )
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="navigation" size="iconLg" {...buttonProps}>
            <AvatarComponent />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant={TextVariant.body}>{name}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button variant="navigation" size="lg" {...buttonProps}>
      <AvatarComponent />
      {name}
    </Button>
  )
}
