import * as React from 'react'

import { Button, Icon, IconName, Text } from '@0xintuition/1ui'

import { useParams, useSearchParams } from '@remix-run/react'

import { preferencesTree } from '../_layout'

type FileNode = {
  id: string
  name: string
  path: string
  icon?: (typeof IconName)[keyof typeof IconName]
  type: 'folder' | 'item'
  items?: FileNode[]
}

function findItemById(tree: FileNode[], id: string): FileNode | null {
  for (const node of tree) {
    if (node.id === id) {
      return node
    }
    if (node.type === 'folder' && node.items) {
      const found = findItemById(node.items, id)
      if (found) {
        return found
      }
    }
  }
  return null
}

function getParentFolderName(path: string): string {
  const parts = path.split('/')
  // Remove empty strings and current folder name
  const filteredParts = parts.filter(Boolean)
  if (filteredParts.length < 2) {
    return ''
  }
  return filteredParts[filteredParts.length - 2].replace(/-/g, '_')
}

export default function ItemView() {
  const { itemId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const timeFilter = searchParams.get('timeFilter') || 'YTD'

  const item = React.useMemo(() => {
    if (!itemId) {
      return null
    }
    return findItemById(preferencesTree, itemId)
  }, [itemId])

  if (!item) {
    return (
      <div className="space-y-4">
        <Text variant="heading1">Item Not Found</Text>
        <Text variant="body">Could not find item with ID: {itemId}</Text>
      </div>
    )
  }

  const parentFolderName = getParentFolderName(item.path)

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex items-center gap-4">
        <div className="size-8 rounded bg-muted/50" />
        <div className="flex flex-col">
          <Text variant="body" className="text-muted-foreground">
            {parentFolderName}
          </Text>
          <div className="flex items-center gap-2">
            <Text variant="headline" weight="regular">
              {item.name}
            </Text>
            <Text
              variant="caption"
              weight="regular"
              className="rounded-lg border border-border/10 bg-gradient-to-b from-[#060504] to-[#101010] p-0.5 px-1"
            >
              Brief description or label?
            </Text>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Text variant="headline" weight="medium">
            $235.70
          </Text>
          <Button variant="secondary" className="min-w-16">
            Sell
          </Button>
        </div>
      </div>
      <Button variant="secondary">
        <Icon name="eye-open" className="h-4 w-4" />
        View Metadata
      </Button>

      {/* Chart Card */}
      <div className="rounded-lg border border-border/10 bg-gradient-to-b from-[#060504] to-[#101010] p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Text variant="caption" className="text-muted-foreground">
              Share Price
            </Text>
            <Text variant="headline" weight="medium">
              $235.70
            </Text>
          </div>
          <Text variant="caption" className="text-[#E6B17E]">
            Vault ID 1337
          </Text>
        </div>

        {/* Chart Area */}
        <div className="h-[300px]">{/* Chart will go here */}</div>

        {/* Time Period Selector */}
        <div className="flex items-center gap-4 border-t border-dashed border-border/10 pt-4">
          {['1D', '1W', '1M', '3M', '1Y', 'YTD'].map((period) => (
            <button
              key={period}
              onClick={() => setSearchParams({ timeFilter: period })}
              className={`text-sm transition-colors ${
                period === timeFilter
                  ? 'text-[#E6B17E]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {period}
            </button>
          ))}
          <Icon
            name={IconName.filter1}
            className="ml-auto size-4 text-muted-foreground"
          />
        </div>
      </div>

      {/* Position Info */}
      <div className="flex items-center justify-between rounded-lg bg-[#060504] px-6 py-3">
        <div className="flex flex-col gap-1">
          <Text
            variant="caption"
            weight="medium"
            className="text-muted-foreground"
          >
            Your Position
          </Text>
          <div className="flex items-center gap-2">
            <Text variant="headline" weight="medium">
              $0.0
            </Text>
            <Text variant="body" className="text-success">
              +0.0 (+0.0%)
            </Text>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Sell</Button>
          <Button variant="secondary">Buy</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-8">
        {[
          { label: 'Total Assets', value: '1.23 ETH' },
          { label: 'Positions', value: '25' },
          { label: 'Triples', value: '4.20k' },
          { label: 'Signals', value: '4.20k' },
          { label: 'Users', value: '4.20k' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <Text variant="caption" className="text-muted-foreground/50">
              {stat.label}
            </Text>
            <Text variant="headline" weight="medium">
              {stat.value}
            </Text>
          </div>
        ))}
        {/* <div className="h-[400px] w-100 rounded-lg border border-border/10 bg-gradient-to-b from-[#060504] to-[#101010]"></div> */}
      </div>
    </div>
  )
}
