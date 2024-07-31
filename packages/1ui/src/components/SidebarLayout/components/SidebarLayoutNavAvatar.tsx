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
  const containerBaseClass = 'w-full'
  const { isMobileView, isCollapsed, setIsCollapsed } =
    useSidebarLayoutContext()
  const AvatarComponent = () => (
    <Avatar
      className="h-6 w-6"
      src={imageSrc}
      name={name}
      onClick={() => setIsCollapsed(true)}
    />
  )
  return isCollapsed && !isMobileView ? (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              buttonVariants({
                variant: ButtonVariant.navigation,
                size: isMobileView ? ButtonSize.iconXl : ButtonSize.iconLg,
              }),
              containerBaseClass,
              'justify-center w-fit m-auto',
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
          size: isMobileView ? ButtonSize.xl : ButtonSize.lg,
        }),
        containerBaseClass,
        'justify-start',
      )}
    >
      <AvatarComponent />
      {name}
    </div>
  )
}
