import * as React from 'react'
import { useState } from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  cn,
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
  Text,
} from '@0xintuition/1ui'

import { useLocation, useNavigate } from '@remix-run/react'
import { motion } from 'framer-motion'
import { MoreVertical } from 'lucide-react'

type FileItem = {
  id: string
  name: string
  path: string
  icon?: (typeof IconName)[keyof typeof IconName]
  type: 'item'
}

type Folder = {
  id: string
  name: string
  path: string
  icon?: (typeof IconName)[keyof typeof IconName]
  type: 'folder'
  items: (Folder | FileItem)[]
}

type FileNode = Folder | FileItem

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
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)
  const isSelected = location.pathname === `/preferences/folder/${node.id}`
  const isFolder = node.type === 'folder'

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen)
    } else {
      // Navigate to item detail view
      navigate(`/preferences/item/${node.id}`)
    }
  }

  const handleGearClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent folder toggle
    navigate(`/preferences/folder/${node.id}`)
  }

  return (
    <li>
      <div className="flex flex-col">
        <div className="group relative">
          <button
            onClick={handleClick}
            className={cn(
              'w-full text-left',
              isSelected && 'text-foreground bg-muted/50',
              !isSelected && 'text-foreground hover:bg-muted/5',
            )}
          >
            <span className="flex items-center gap-1 py-0.5">
              {isFolder && (
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
                  node.icon || (isFolder ? IconName.folder : IconName.fileText)
                }
                className={`size-4 ${
                  isFolder ? 'text-foreground' : 'text-muted-foreground/50'
                } ${!isFolder ? 'ml-[18px]' : ''}`}
              />
              <Text
                variant="body"
                weight="regular"
                className={`${
                  isFolder ? 'text-foreground' : 'text-foreground/70'
                } ${!isFolder ? 'ml-[18px]' : ''}`}
              >
                {node.name}
              </Text>
            </span>
          </button>
          {isFolder && (
            <button
              onClick={handleGearClick}
              className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon
                name={IconName.settingsGear}
                className="size-3 text-muted-foreground/70 hover:text-muted-foreground"
              />
            </button>
          )}
        </div>
        {isFolder && isOpen && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="pl-4 overflow-hidden"
          >
            {node.items.map((childNode) => (
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
  items: Folder[]
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
