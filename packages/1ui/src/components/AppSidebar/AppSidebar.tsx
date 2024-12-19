import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from 'components/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/DropdownMenu'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from 'components/Sidebar'
import {
  Activity,
  Circle,
  FileText,
  Github,
  Globe,
  Home,
  LayoutGrid,
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

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  isAccent?: boolean
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/#' },
  { icon: LayoutGrid, label: 'Dashboard', href: '/#' },
  { icon: Globe, label: 'Discover', href: '/#' },
  { icon: Activity, label: 'Network', href: '/#', isAccent: true },
]

const footerNavItems: NavItem[] = [
  { icon: FileText, label: 'Developer Docs', href: '/#' },
  { icon: Github, label: 'Github', href: '/#' },
  { icon: Upload, label: 'Bulk Uploader', href: '/#' },
  { icon: Circle, label: 'Ecosystem', href: '/#' },
]

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

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/10" {...props}>
        <SidebarHeader className="px-2 py-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="w-full gap-3">
                    <Avatar
                      name={user?.name || 'Unknown'}
                      className="h-8 w-8 border border-border/10"
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
        <SidebarContent className="flex flex-col justify-between">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeItem === item.label}
                      className={item.isAccent ? 'text-accent' : undefined}
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
          <SidebarGroup>
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
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}
