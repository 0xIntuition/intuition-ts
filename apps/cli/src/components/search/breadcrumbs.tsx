import {Box, Text} from 'ink'
import React from 'react'

import {BreadcrumbItem} from './types.js'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({items}) => {
  if (items.length === 0) return null

  return (
    <Box borderColor="gray" borderStyle="single" paddingX={1}>
      <Text>
        {items.map((item, index) => (
          <Text key={index}>
            {index > 0 && <Text color="gray"> {'>'} </Text>}
            <Text color={index === items.length - 1 ? 'cyan' : 'gray'}>{item.label}</Text>
          </Text>
        ))}
      </Text>
    </Box>
  )
}
