import { type VariantProps } from 'class-variance-authority'

import {
  Avatar,
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
}: SidebarLayoutNavAvatarProps) => {
  const { isCollapsed } = useSidebarLayoutContext()
  // const buttonProps = {
  //   className: 'w-full justify-start',
  //   onClick,
  // }
  const AvatarComponent = () => (
    <Avatar className="h-6 w-6" src={imageSrc} name={name} />
  )
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex justify-start items-center gap-2 text-sm font-medium border bg-transparent text-secondary-foreground/70 border-transparent rounded-lg  hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 p-2 w-full">
            {/* TODO: Had to remove the Button component here because it was causing an error, applied same styling to div. See ENG-2698 */}
            <AvatarComponent />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant={TextVariant.body}>{name}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <div className="flex items-center font-medium border disabled:bg-muted disabled:border-muted bg-transparent text-secondary-foreground/70 border-transparent rounded-lg hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 disabled:text-muted-foreground px-4 py-2 gap-3 text-base w-full justify-start">
      {/* TODO: See Above */}
      <AvatarComponent />
      {name}
    </div>
  )
}
