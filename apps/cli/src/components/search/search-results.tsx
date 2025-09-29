import {Box, Text, useStdout} from 'ink'
import React, {useEffect, useState} from 'react'

import {SearchResultItem} from './types.js'
import {formatItem, getItemColor} from './utils.js'

interface SearchResultsProps {
  items: SearchResultItem[]
  selectedIndex: number
}

export const SearchResults: React.FC<SearchResultsProps> = ({items, selectedIndex}) => {
  const {stdout} = useStdout()
  const [maxDisplay, setMaxDisplay] = useState(15)

  useEffect(() => {
    const calculateMaxDisplay = () => {
      if (!stdout) return

      // Reserve lines for:
      // - Breadcrumbs with border: 3 lines
      // - Controls footer: 1 line
      // - Padding/margins: 6 lines
      const reservedLines = 10
      const availableHeight = Math.max(5, stdout.rows - reservedLines)
      setMaxDisplay(availableHeight)
    }

    calculateMaxDisplay()

    // Listen for terminal resize events
    const handleResize = () => {
      calculateMaxDisplay()
    }

    if (stdout) {
      stdout.on('resize', handleResize)
    }

    return () => {
      if (stdout) {
        stdout.off('resize', handleResize)
      }
    }
  }, [stdout])
  if (items.length === 0) {
    return (
      <Box paddingX={1} paddingY={1}>
        <Text color="gray">No results found</Text>
      </Box>
    )
  }

  const start = Math.max(0, Math.min(selectedIndex - Math.floor(maxDisplay / 2), items.length - maxDisplay))
  const end = Math.min(items.length, start + maxDisplay)
  const visibleItems = items.slice(start, end)

  const groupedItems: Array<{items: Array<{index: number; item: SearchResultItem}>; type: string}> = []

  for (const [idx, item] of visibleItems.entries()) {
    const actualIndex = start + idx
    const group = groupedItems.find((g) => g.type === item.type)
    if (group) {
      group.items.push({index: actualIndex, item})
    } else {
      groupedItems.push({
        items: [{index: actualIndex, item}],
        type: item.type,
      })
    }
  }

  return (
    <Box flexDirection="column" paddingX={1}>
      {start > 0 && <Text color="gray">↑ {start} more results above...</Text>}

      {groupedItems.map((group) => (
        <Box flexDirection="column" key={group.type} marginY={0}>
          <Text bold color={getItemColor(group.items[0].item.type)}>
            {group.type.charAt(0).toUpperCase() + group.type.slice(1)}s
          </Text>
          {group.items.map(({index, item}) => (
            <Box key={`${item.type}-${item.id}`}>
              <Text>{formatItem(item, index === selectedIndex)}</Text>
            </Box>
          ))}
        </Box>
      ))}

      {end < items.length && <Text color="gray">↓ {items.length - end} more results below...</Text>}
    </Box>
  )
}
