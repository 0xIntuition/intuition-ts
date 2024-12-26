import * as React from 'react'

import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  IconName,
  SegmentedControl,
  SegmentedControlItem,
  Text,
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
        'rounded-lg border border-border/10 bg-gradient-to-b from-[#060504] to-[#101010] min-w-[480px]',
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
        <div className="absolute -right-2 -top-3">
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

function getParentFolderName(path: string): string {
  const parts = path.split('/')
  // Remove empty strings and current folder name
  const filteredParts = parts.filter(Boolean)
  if (filteredParts.length < 2) {
    return ''
  }
  // Return the parent folder name with underscores
  return filteredParts[filteredParts.length - 2].replace(/-/g, '_')
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
        <Text variant="heading1">Folder Not Found</Text>
        <Text variant="body">Could not find folder with ID: {folderId}</Text>
      </div>
    )
  }

  const parentFolderName = getParentFolderName(folder.path)

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <HomeIcon />
          <div className="flex items-center gap-2">
            <FolderTag name={parentFolderName} />
            <FolderTag name={folder.name} variant="brown" showCount />
          </div>
        </div>
        <SegmentedControl>
          <SegmentedControlItem isActive>Label</SegmentedControlItem>
          <SegmentedControlItem>Label</SegmentedControlItem>
        </SegmentedControl>
      </div>

      {/* Folder Card */}
      <ItemCard>
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded bg-muted/50" />
              <div className="flex flex-col gap-1.5">
                <Text variant="body" className="text-muted-foreground">
                  {folder.name}
                </Text>
                <div className="flex items-center gap-3">
                  <Text variant="headline" weight="regular">
                    {folder.name}
                  </Text>
                  <span className="rounded bg-[#4D3D2D] px-2 py-0.5 text-sm text-[#E6B17E]">
                    1337
                  </span>
                </div>
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

          {/* Middle section with dotted line */}
          <div className="py-8">
            <div className="border-t border-dashed border-border/10" />
          </div>

          {/* Position info */}
          <div className="flex items-center justify-between bg-black px-6 py-3 rounded-b-lg">
            <div className="flex-col items-center gap-2">
              <Text
                variant="caption"
                weight="regular"
                className="text-muted-foreground"
              >
                Your Position
              </Text>
              <div className="flex items-center gap-2">
                <Text
                  variant="headline"
                  weight="medium"
                  className="font-medium"
                >
                  $0.0
                </Text>
                <Text variant="body" weight="medium" className="text-success">
                  +0.0%
                </Text>
              </div>
            </div>
            <Button variant="secondary">Main Action</Button>
          </div>
        </div>
      </ItemCard>

      {/* Grid of items */}
      <div className="grid grid-cols-2 gap-8">
        {folder.items
          .filter((item) => item.type === 'item')
          .map((item: FileNode) => (
            <ItemCard key={item.id}>
              <div className="flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-muted/50" />
                    <div className="flex flex-col gap-1.5">
                      <Text variant="body" className="text-muted-foreground">
                        {folder.name}
                      </Text>
                      <div className="flex items-center gap-3">
                        <Text variant="headline" weight="regular">
                          {item.name}
                        </Text>
                        <span className="rounded bg-[#4D3D2D] px-2 py-0.5 text-sm text-[#E6B17E]">
                          1337
                        </span>
                      </div>
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

                {/* Middle section with dotted line */}
                <div className="py-8">
                  <div className="border-t border-dashed border-border/10" />
                </div>

                {/* Position info */}
                <div className="flex items-center justify-between bg-black px-6 py-3 rounded-b-lg">
                  <div className="flex-col items-center gap-2">
                    <Text
                      variant="caption"
                      weight="regular"
                      className="text-muted-foreground"
                    >
                      Your Position
                    </Text>
                    <div className="flex items-center gap-2">
                      <Text
                        variant="headline"
                        weight="medium"
                        className="font-medium"
                      >
                        $0.0
                      </Text>
                      <Text
                        variant="body"
                        weight="medium"
                        className="text-success"
                      >
                        +0.0%
                      </Text>
                    </div>
                  </div>
                  <Button variant="secondary">Main Action</Button>
                </div>
              </div>
            </ItemCard>
          ))}
      </div>
    </div>
  )
}
