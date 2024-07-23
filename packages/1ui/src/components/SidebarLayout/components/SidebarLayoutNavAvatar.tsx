import {
  Avatar,
  ButtonSize,
  ButtonVariant,
  buttonVariants,
  cn,
  Text,
  TextVariant,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../'
import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarLayoutNavAvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
  name: string
}

export const SidebarLayoutNavAvatar = ({
  imageSrc,
  name,
}: SidebarLayoutNavAvatarProps) => {
  const containerBaseClass = 'w-full justify-start'
  const { isCollapsed } = useSidebarLayoutContext()
  const AvatarComponent = () => (
    <Avatar className="h-6 w-6" src={imageSrc} name={name} />
  )
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              buttonVariants({
                variant: ButtonVariant.navigation,
                size: ButtonSize.iconLg,
              }),
              containerBaseClass,
            )}
          >
            <AvatarComponent />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant={TextVariant.body}>{name}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <div
      className={cn(
        buttonVariants({
          variant: ButtonVariant.navigation,
          size: ButtonSize.lg,
        }),
        containerBaseClass,
      )}
    >
      <AvatarComponent />
      {name}
    </div>
  )
}
