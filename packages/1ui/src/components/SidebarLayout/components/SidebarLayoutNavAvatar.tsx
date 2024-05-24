import { Avatar, AvatarFallback, AvatarImage } from '@components/Avatar'
import { Button, buttonVariants } from '@components/Button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/Tooltip'
import { Text } from '@components/Text'
import { type VariantProps } from 'class-variance-authority'
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
    className: 'w-full',
    onClick,
  }
  const AvatarComponent = () => (
    <Avatar className="h-6 w-6">
      <AvatarImage src={imageSrc} alt={`${name} avatar`} />
      <AvatarFallback className="text-xs">
        {name.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="text" size="iconMd" {...buttonProps}>
            <AvatarComponent />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant="body">{name}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button variant="text" size="md" {...buttonProps}>
      <AvatarComponent />
      {name}
    </Button>
  )
}
