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
  Trunctacular,
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
      <Trunctacular
        variant={ButtonVariant.navigation}
        value={name}
        className="bg-transparent text-secondary-foreground/70 border-transparent rounded-lg  hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 disabled:text-muted-foreground aria-disabled:text-muted-foreground"
      />
    </div>
  )
}
