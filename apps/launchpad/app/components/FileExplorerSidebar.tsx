import * as React from 'react'
import { useState } from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  IconName,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  Skeleton,
} from '@0xintuition/1ui'

import { AnimatePresence, motion } from 'framer-motion'
import { MoreVertical } from 'lucide-react'

type FileNode = {
  name: string
  icon?: (typeof IconName)[keyof typeof IconName]
  nodes?: FileNode[]
  path: string
}

interface FileExplorerItemProps {
  node: FileNode
  onSelect?: (path: string) => void
  selectedPath?: string
}

function FileExplorerItem({
  node,
  onSelect,
  selectedPath,
}: FileExplorerItemProps) {
  console.log('FileExplorerItem rendering:', {
    name: node.name,
    hasNodes: !!node.nodes?.length,
  })
  const [isOpen, setIsOpen] = useState(true)
  const isSelected = selectedPath === node.path
  const hasChildren = node.nodes && node.nodes.length > 0

  return (
    <li>
      <div className="flex flex-col">
        <button
          onClick={() => {
            if (hasChildren) {
              setIsOpen(!isOpen)
            }
          }}
          className={`w-full text-left ${isSelected ? 'text-accent' : 'text-muted-foreground'}`}
        >
          <span className="flex items-center gap-1 py-0.5">
            {hasChildren && (
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="flex"
              >
                <Icon
                  name={IconName.chevronRight}
                  className="size-3 text-muted-foreground/70"
                />
              </motion.span>
            )}

            <Icon
              name={
                node.icon || (hasChildren ? IconName.folder : IconName.fileText)
              }
              className={`size-4 ${
                hasChildren
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground/50'
              } ${!hasChildren ? 'ml-[18px]' : ''}`}
            />
            <span className="text-xs">{node.name}</span>
          </span>
        </button>
        {hasChildren && isOpen && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="pl-4 overflow-hidden"
          >
            {node.nodes?.map((childNode) => (
              <FileExplorerItem
                key={childNode.path}
                node={childNode}
                onSelect={onSelect}
                selectedPath={selectedPath}
              />
            ))}
          </motion.ul>
        )}
      </div>
    </li>
  )
}

interface FileExplorerSidebarProps {
  user?: {
    name: string
    avatar: string
  }
  items: FileNode[]
  onSelect?: (path: string) => void
  selectedPath?: string
}

export function FileExplorerSidebar({
  user,
  items,
  onSelect,
  selectedPath,
}: FileExplorerSidebarProps) {
  return (
    <Sidebar className="border-r border-border/10">
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
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm font-medium">
                      {user?.name || 'Unknown'}
                    </span>
                    <MoreVertical className="h-4 w-4 text-muted-foreground/70" />
                  </div>
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
      <SidebarContent className="px-3">
        <ul className="space-y-1">
          {items.map((rootNode) => (
            <FileExplorerItem
              key={rootNode.path}
              node={rootNode}
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
        </ul>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
