import * as React from 'react'

import { Button, Icon, IconName, Text } from '@0xintuition/1ui'

import { useParams, useSearchParams } from '@remix-run/react'

import { FileNode } from '../../preferences+/_layout'

function getParentFolderName(path: string): string {
  const parts = path.split('/')
  // Remove empty strings and current folder name
  const filteredParts = parts.filter(Boolean)
  if (filteredParts.length < 2) {
    return ''
  }
  return filteredParts[filteredParts.length - 2].replace(/-/g, '_')
}

export default function TagItemView() {
  const { itemId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const timeFilter = searchParams.get('timeFilter') || 'YTD'

  // TODO: Replace with actual data from your GraphQL query
  const item: FileNode = {
    id: itemId || '',
    name: 'Tag Item',
    path: `/tags/item/${itemId}`,
    icon: IconName.circle,
    type: 'item',
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
      </div>
    </div>
  )
}
