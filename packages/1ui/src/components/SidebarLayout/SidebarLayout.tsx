import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@components/Avatar'
import { Button, buttonVariants } from '@components/Button'
import { Icon, IconName } from '@components/Icon'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@components/Resizable'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/Tooltip'
import { Text } from '@components/Text'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@styles'

const sideBarLocalStorageVariable = 'isSideBarCollapsed'

//--------------------------------------------------------//
// PROVIDER
//--------------------------------------------------------//

interface ISidebarLayoutContext {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarLayoutContext = React.createContext<ISidebarLayoutContext>({
  isCollapsed: false,
  setIsCollapsed: () => {},
})

const useSidebarLayoutContext = () => {
  const context = React.useContext(SidebarLayoutContext)
  if (!context) {
    throw new Error('Must be used with a SidebarLayoutProvider')
  }
  return context
}

const SidebarLayoutProvider = ({ ...props }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(
    localStorage.getItem(sideBarLocalStorageVariable) === 'true',
  )

  return (
    <SidebarLayoutContext.Provider
      value={{ isCollapsed, setIsCollapsed }}
      {...props}
    ></SidebarLayoutContext.Provider>
  )
}

//--------------------------------------------------------//
// SIDEBAR LAYOUT
//--------------------------------------------------------//

const SidebarLayout = ({ ...props }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      {...props}
    ></ResizablePanelGroup>
  )
}

//--------------------------------------------------------//
// NAV
//--------------------------------------------------------//

const SidebarLayoutNav = ({ ...props }) => {
  const { isCollapsed, setIsCollapsed } = useSidebarLayoutContext()
  const updateIsCollapsedValues = (newValue: boolean) => {
    setIsCollapsed(newValue)
    localStorage.setItem(sideBarLocalStorageVariable, newValue.toString())
  }

  return (
    <>
      <ResizablePanel
        defaultSize={isCollapsed ? 7 : 30}
        minSize={20}
        maxSize={50}
        collapsible
        collapsedSize={7}
        onCollapse={() => updateIsCollapsedValues(true)}
        onExpand={() => updateIsCollapsedValues(false)}
        className={cn(
          isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out',
        )}
      >
        <div
          className="from-primary/10 to-primary/2 flex h-full flex-col items-center bg-gradient-to-b"
          {...props}
        ></div>
      </ResizablePanel>
      <ResizableHandle withHandle />
    </>
  )
}

//--------------------------------------------------------//
// HEADER
//--------------------------------------------------------//

const SidebarLayoutNavHeader = ({ ...props }) => {
  return (
    <div
      className="border-primary/30 flex w-full items-center gap-2 border-0 border-b-[1px] border-solid p-4"
      {...props}
    ></div>
  )
}

//--------------------------------------------------------//
// HEADER CONTENT
//--------------------------------------------------------//

export interface SidebarLayoutNavHeaderContentProps {
  imgLogo: React.ReactElement
  textLogo: React.ReactElement
}

const SidebarLayoutNavHeaderContent = ({
  imgLogo,
  textLogo,
}: SidebarLayoutNavHeaderContentProps) => {
  const { isCollapsed } = useSidebarLayoutContext()
  return (
    <>
      {imgLogo}
      {!isCollapsed && textLogo}
    </>
  )
}

//--------------------------------------------------------//
// NAV ITEMS
//--------------------------------------------------------//

const SidebarLayoutNavItems = ({ ...props }) => {
  return <div className="flex w-full flex-col gap-2 p-2" {...props}></div>
}

//--------------------------------------------------------//
// NAV ITEM
//--------------------------------------------------------//

const SidebarLayoutNavItem = ({
  iconName,
  label,
  onClick,
  ...props
}: SidebarNavItemProps) => {
  return (
    <SidebarNavItem
      {...props}
      variant="ghost"
      label={label}
      iconName={iconName}
      onClick={onClick}
    />
  )
}

//--------------------------------------------------------//
// FOOTER
//--------------------------------------------------------//

const SidebarLayoutNavFooter = ({ ...props }) => {
  return (
    <div
      className="flex h-full w-full flex-col justify-end gap-2 p-2"
      {...props}
    ></div>
  )
}

//--------------------------------------------------------//
// FOOTER ITEM
//--------------------------------------------------------//

const SidebarLayoutNavFooterItem = ({
  iconName,
  label,
  onClick,
  ...props
}: SidebarNavItemProps) => {
  return (
    <SidebarNavItem
      {...props}
      variant="text"
      label={label}
      iconName={iconName}
      onClick={onClick}
    />
  )
}

//--------------------------------------------------------//
// AVATAR
//--------------------------------------------------------//

export interface SidebarNavAvatarProps
  extends VariantProps<typeof buttonVariants> {
  imageSrc: string
  name: string
  onClick: () => void
}

const SidebarNavAvatar = ({
  imageSrc,
  name,
  onClick,
}: SidebarNavAvatarProps) => {
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

//--------------------------------------------------------//
// CONTENT
//--------------------------------------------------------//

const SidebarLayoutContent = ({ ...props }) => {
  return (
    <ResizablePanel defaultSize={70}>
      <div
        className="flex h-full items-center justify-center p-3"
        {...props}
      ></div>
    </ResizablePanel>
  )
}
//--------------------------------------------------------//
// NAV ITEM (INTERNAL COMPONENT USE ONLY - DON'T EXPORT)
//--------------------------------------------------------//

export interface SidebarNavItemProps
  extends VariantProps<typeof buttonVariants> {
  iconName: IconName
  label: string
  onClick: () => void
}

const SidebarNavItem = ({
  iconName,
  label,
  variant,
  onClick,
  ...props
}: SidebarNavItemProps) => {
  const { isCollapsed } = useSidebarLayoutContext()
  const buttonProps = {
    variant,
    className: 'w-full',
    onClick,
    ...props,
  }
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="iconMd" {...buttonProps}>
            <Icon name={iconName} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={16}>
          <Text variant="body">{label}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button size="md" {...buttonProps}>
      <Icon name={iconName} />
      {label}
    </Button>
  )
}

export {
  SidebarLayoutProvider,
  SidebarLayout,
  SidebarLayoutNav,
  SidebarLayoutNavHeader,
  SidebarLayoutNavHeaderContent,
  SidebarLayoutNavItems,
  SidebarLayoutNavItem,
  SidebarLayoutNavFooter,
  SidebarLayoutNavFooterItem,
  SidebarNavAvatar,
  SidebarLayoutContent,
}
