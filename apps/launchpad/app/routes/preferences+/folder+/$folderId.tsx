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
import { Globe, MoreVertical } from 'lucide-react'

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
        'rounded-lg border border-border/10 bg-[#1C1C1C] p-6',
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

function FolderTag({
  name,
  variant = 'default',
  showCount,
}: {
  name: string
  variant?: 'default' | 'brown'
  showCount?: boolean
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm',
          variant === 'default' ? 'bg-muted/50' : 'bg-[#4D3D2D]',
        )}
      >
        <Icon name={IconName.folder} className="size-4 text-muted-foreground" />
        <span>{name}</span>
      </div>
      {showCount && (
        <div className="absolute -right-2 -top-2">
          <span className="bg-blue-500 text-[10px] rounded-sm px-1 text-white">
            37
          </span>
        </div>
      )}
    </div>
  )
}

function HomeIcon() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5">
      <Globe className="size-4 text-muted-foreground" />
    </div>
  )
}

export default function FolderView() {
  const { folderId } = useParams()
  const folder = React.useMemo(() => {
    if (!folderId) {
      return null
    }
    return findFolderById(preferencesTree as Folder[], folderId)
  }, [folderId])

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
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <HomeIcon />
          <div className="flex items-center gap-2">
            <FolderTag name="has_preference" />
            <FolderTag name={folder.name} variant="brown" showCount />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="label" className="text-accent" />
            <span className="text-sm">Label</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="label" className="text-accent" />
            <span className="text-sm">Label</span>
          </label>
        </div>
      </div>

      {/* Folder Card */}
      <ItemCard>
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded bg-black" />
              <div className="flex items-center gap-3">
                <Text variant={TextVariant.heading2}>{folder.name}</Text>
                <span className="rounded bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
                  1337
                </span>
              </div>
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
          <div className="flex items-center justify-between border-t border-border/10 pt-4">
            <div className="flex items-center gap-2">
              <Text
                variant={TextVariant.body}
                className="text-muted-foreground"
              >
                Your Position
              </Text>
              <span className="font-medium">$0.0</span>
            </div>
            <div className="flex items-center gap-1 text-success">
              <span>+0.0%</span>
            </div>
          </div>
        </div>
      </ItemCard>

      {/* Grid of items */}
      <div className="grid grid-cols-2 gap-4">
        {folder.items
          .filter((item) => item.type === 'item')
          .map((item: FileNode) => (
            <ItemCard key={item.id}>
              <div className="flex flex-col space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-black" />
                    <div className="flex items-center gap-3">
                      <Text variant={TextVariant.heading3}>{item.name}</Text>
                      <span className="rounded bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
                        1337
                      </span>
                    </div>
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
                <div className="flex items-center justify-between border-t border-border/10 pt-4">
                  <div className="flex items-center gap-2">
                    <Text
                      variant={TextVariant.body}
                      className="text-muted-foreground"
                    >
                      Your Position
                    </Text>
                    <span className="font-medium">$0.0</span>
                  </div>
                  <div className="flex items-center gap-1 text-success">
                    <span>+0.0%</span>
                  </div>
                </div>
              </div>
            </ItemCard>
          ))}
      </div>
    </div>
  )
}
