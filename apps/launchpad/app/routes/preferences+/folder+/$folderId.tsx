import * as React from 'react'

import {
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  IconName,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import { useParams } from '@remix-run/react'
import { MoreVertical } from 'lucide-react'

import { preferencesTree } from '../_layout'

type FileNode = {
  id: string
  name: string
  path: string
  icon?: (typeof IconName)[keyof typeof IconName]
  type: 'folder' | 'item'
  items?: FileNode[]
}

type Folder = FileNode & {
  type: 'folder'
  items: FileNode[]
}

function ItemCard({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border/10 bg-card text-card-foreground shadow p-4 space-y-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function findFolderById(tree: Folder[], id: string): Folder | null {
  for (const node of tree) {
    if (node.id === id && node.type === 'folder') {
      return node
    }
    if (node.type === 'folder' && node.items) {
      const found = findFolderById(
        node.items.filter((item): item is Folder => item.type === 'folder'),
        id,
      )
      if (found) {
        return found
      }
    }
  }
  return null
}

export default function FolderView() {
  const { folderId } = useParams()
  const folder = folderId
    ? findFolderById(preferencesTree as Folder[], folderId)
    : null

  if (!folder) {
    return (
      <div className="space-y-4">
        <Text variant={TextVariant.heading1}>Folder Not Found</Text>
        <Text variant={TextVariant.body}>
          Could not find folder with ID: {folderId}
        </Text>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon
            name={folder.icon || IconName.folder}
            className="size-6 text-muted-foreground"
          />
          <Text variant={TextVariant.heading1}>{folder.name}</Text>
          <span className="text-sm text-muted-foreground">1337</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="size-5 text-muted-foreground/70" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Option 1</DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-2 gap-4">
        {folder.items.map((item: FileNode) => (
          <ItemCard key={item.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Text variant={TextVariant.heading3}>{item.name}</Text>
                <span className="text-sm text-muted-foreground">1337</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className="size-4 text-muted-foreground/70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Option 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Position info */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Text variant={TextVariant.body}>Your Position</Text>
                <span className="text-muted-foreground">$0.0</span>
              </div>
              <div className="flex items-center gap-1 text-success">
                <span>+0.0%</span>
              </div>
            </div>
          </ItemCard>
        ))}
      </div>
    </div>
  )
}
