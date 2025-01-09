import * as React from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  Skeleton,
  useIsMobile,
} from '@0xintuition/1ui'

import { useLocation } from '@remix-run/react'
import {
  Activity,
  Circle,
  FileText,
  Gem,
  Github,
  Globe,
  Home,
  LayoutGrid,
  Medal,
  MoreVertical,
  Upload,
} from 'lucide-react'

export const SidebarVariant = {
  default: 'default',
  minimal: 'minimal',
} as const

export type SidebarVariantType =
  (typeof SidebarVariant)[keyof typeof SidebarVariant]

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SidebarVariantType
}

export interface NavItem {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  isAccent?: boolean
}

interface AppSidebarProps extends SidebarProps {
  activeItem?: string
  user?: {
    name: string
    avatar: string
  }
}

export function AppSidebar({
  variant = SidebarVariant.default,
  activeItem,
  user,
  ...props
}: AppSidebarProps) {
  const isMinimal = variant === SidebarVariant.minimal
  const isMobile = useIsMobile()
  const location = useLocation()

  const mainNavItems: NavItem[] = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
      isAccent: location.pathname === '/',
    },
    {
      icon: LayoutGrid,
      label: 'Dashboard',
      href: '/dashboard',
      isAccent: location.pathname === '/dashboard',
    },
    {
      icon: Globe,
      label: 'Discover',
      href: '/discover',
      isAccent: location.pathname === '/discover',
    },
    {
      icon: Activity,
      label: 'Network',
      href: '/network',
      isAccent: location.pathname === '/network',
    },
    {
      icon: Gem,
      label: 'Rewards',
      href: '/rewards',
      isAccent: location.pathname === '/rewards',
    },
    {
      icon: Medal,
      label: 'Leaderboard',
      href: '/leaderboard',
      isAccent: location.pathname === '/leaderboard',
    },
  ]

  const footerNavItems: NavItem[] = [
    { icon: FileText, label: 'Developer Docs', href: '#' },
    { icon: Github, label: 'Github', href: '#' },
    { icon: Upload, label: 'Bulk Uploader', href: '#' },
    { icon: Circle, label: 'Ecosystem', href: '#' },
  ]

  const sidebarContent = (
    <>
      <SidebarHeader className="px-5 py-3">
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row gap-3 px-4 py-3">
            <div className="h-6 w-6 rounded-full">
              <Skeleton className="h-6 w-6 rounded-full animate-none" />
            </div>
            <Skeleton className="h-6 w-full rounded-full animate-none" />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="w-full gap-3 theme-border"
                >
                  <Avatar
                    name={user?.name || 'Unknown'}
                    className="h-6 w-6 border border-border/10"
                  >
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  {!isMinimal && (
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm font-medium">
                        {user?.name || 'Unknown'}
                      </span>
                      <MoreVertical className="h-4 w-4 text-muted-foreground/70" />
                    </div>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[--radix-dropdown-menu-trigger-width]"
              >
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-6 px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    size="lg"
                    asChild
                    isActive={activeItem === item.label}
                    className={cn(
                      'w-full gap-3 py-3',
                      item.isAccent ? 'text-accent' : undefined,
                    )}
                  >
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!isMinimal && <span>{item.label}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {footerNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!isMinimal && <span>{item.label}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  )

  return (
    <>
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <SidebarTrigger />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      ) : (
        <Sidebar
          className="border-r border-border/10"
          collapsible="icon"
          {...props}
        >
          {sidebarContent}
        </Sidebar>
      )}
    </>
  )
}
