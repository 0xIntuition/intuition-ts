import {getAccountDetails, getAtomDetails, getTripleDetails} from '@0xintuition/sdk'
import chalk from 'chalk'
import {Box, Text, useInput} from 'ink'
import Spinner from 'ink-spinner'
import React, {useEffect, useState} from 'react'

import {SearchResultItem} from './types.js'
import {getItemIcon} from './utils.js'

// Helper function to extract related triples from atom data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractRelatedTriples(data: any): SearchResultItem[] {
  const related: SearchResultItem[] = []

  // Add related triples where this atom appears as subject
  if (data.as_subject_triples) {
    for (const triple of data.as_subject_triples) {
      related.push({
        data: triple,
        id: triple.term_id,
        label: `As Subject: ${triple.predicate?.label || 'Unknown'} → ${triple.object?.label || 'Unknown'}`,
        type: 'triple',
      })
    }
  }

  // Add related triples where this atom appears as predicate
  if (data.as_predicate_triples) {
    for (const triple of data.as_predicate_triples) {
      related.push({
        data: triple,
        id: triple.term_id,
        label: `As Predicate: ${triple.subject?.label || 'Unknown'} → ${triple.object?.label || 'Unknown'}`,
        type: 'triple',
      })
    }
  }

  // Add related triples where this atom appears as object
  if (data.as_object_triples) {
    for (const triple of data.as_object_triples) {
      related.push({
        data: triple,
        id: triple.term_id,
        label: `As Object: ${triple.subject?.label || 'Unknown'} → ${triple.predicate?.label || 'Unknown'}`,
        type: 'triple',
      })
    }
  }

  return related
}

// Helper function to extract related atoms from triple data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractRelatedAtoms(data: any): SearchResultItem[] {
  const related: SearchResultItem[] = []

  if (data.subject) {
    related.push({
      data: data.subject,
      id: data.subject.term_id,
      label: `Subject: ${data.subject.label || 'Unnamed'}`,
      type: 'atom',
    })
  }

  if (data.predicate) {
    related.push({
      data: data.predicate,
      id: data.predicate.term_id,
      label: `Predicate: ${data.predicate.label || 'Unnamed'}`,
      type: 'atom',
    })
  }

  if (data.object) {
    related.push({
      data: data.object,
      id: data.object.term_id,
      label: `Object: ${data.object.label || 'Unnamed'}`,
      type: 'atom',
    })
  }

  return related
}

// Helper function to fetch details for any item type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchItemDetails(item: SearchResultItem): Promise<{data: any; related: SearchResultItem[]}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = null
  const related: SearchResultItem[] = []

  switch (item.type) {
    case 'account': {
      data = await getAccountDetails(item.data?.address || item.id)
      break
    }

    case 'atom': {
      data = await getAtomDetails(item.id)
      if (data) {
        related.push(...extractRelatedTriples(data))
      }

      break
    }

    case 'triple': {
      data = await getTripleDetails(item.id)
      if (data) {
        related.push(...extractRelatedAtoms(data))
      }

      break
    }
  }

  return {data, related}
}

// Component for rendering account details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AccountDetails: React.FC<{details: any}> = ({details}) => (
  <Box flexDirection="column">
    <Text>Address: {chalk.gray(details.id || details.address || 'Unknown')}</Text>
    <Text>Label: {chalk.cyan(details.label || 'Unknown')}</Text>
    <Text>Positions: {chalk.yellow(details.positions?.length || 0)}</Text>
  </Box>
)

// Component for rendering atom details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AtomDetails: React.FC<{details: any}> = ({details}) => (
  <Box flexDirection="column">
    <Text>ID: {chalk.gray(details.term_id)}</Text>
    <Text>Type: {chalk.yellow(details.type)}</Text>
    {details.value?.text_object?.data && <Text>Value: {chalk.cyan(details.value.text_object.data)}</Text>}
    {details.value?.json_object?.name && <Text>Name: {chalk.cyan(details.value.json_object.name)}</Text>}
    {details.value?.json_object?.description && (
      <Text>Description: {chalk.gray(details.value.json_object.description)}</Text>
    )}
    <Text>Label: {chalk.cyan(details.label || 'Unknown')}</Text>
  </Box>
)

// Component for rendering triple details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TripleDetails: React.FC<{details: any}> = ({details}) => (
  <Box flexDirection="column">
    <Text>ID: {chalk.gray(details.term_id)}</Text>
    <Text>Subject: {chalk.cyan(details.subject?.label || 'Unknown')}</Text>
    <Text>Predicate: {chalk.green(details.predicate?.label || 'Unknown')}</Text>
    <Text>Object: {chalk.yellow(details.object?.label || 'Unknown')}</Text>
    <Text>Creator: {chalk.gray(details.creator?.address || 'Unknown')}</Text>
  </Box>
)

// Component for rendering related items list
const RelatedItems: React.FC<{
  items: SearchResultItem[]
  maxDisplay?: number
  selectedIndex: number
}> = ({items, maxDisplay = 15, selectedIndex}) => {
  // Calculate visible window based on selected index
  const start = Math.max(0, Math.min(selectedIndex - Math.floor(maxDisplay / 2), items.length - maxDisplay))
  const end = Math.min(items.length, start + maxDisplay)
  const visibleItems = items.slice(start, end)

  return (
    <Box flexDirection="column" marginTop={1}>
      <Text bold color="magenta">
        Related Items:
      </Text>
      {start > 0 && <Text color="gray">↑ {start} more items above...</Text>}
      {visibleItems.map((relItem, index) => {
        const actualIndex = start + index
        return (
          <Text key={`${relItem.type}-${relItem.id}`}>
            {actualIndex === selectedIndex ? chalk.cyan('▶ ') : '  '}
            {getItemIcon(relItem.type)} {relItem.label}
          </Text>
        )
      })}
      {end < items.length && <Text color="gray">↓ {items.length - end} more items below...</Text>}
      <Box marginTop={1}>
        <Text color="gray">↑/↓/j/k: Select | Enter: Navigate to selected item</Text>
      </Box>
    </Box>
  )
}

interface DetailViewProps {
  item: SearchResultItem
  onNavigate?: (_item: SearchResultItem) => void
}

export const DetailView: React.FC<DetailViewProps> = ({item, onNavigate}) => {
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [details, setDetails] = useState<any>(null)
  const [relatedItems, setRelatedItems] = useState<SearchResultItem[]>([])
  const [selectedRelatedIndex, setSelectedRelatedIndex] = useState(0)

  // Handle keyboard input for related items navigation
  useInput((input, key) => {
    if (relatedItems.length === 0) return

    if (key.upArrow || input === 'k') {
      setSelectedRelatedIndex((prev) => Math.max(0, prev - 1))
    } else if (key.downArrow || input === 'j') {
      setSelectedRelatedIndex((prev) => Math.min(relatedItems.length - 1, prev + 1))
    } else if (key.return && onNavigate) {
      const selectedItem = relatedItems[selectedRelatedIndex]
      if (selectedItem) {
        onNavigate(selectedItem)
      }
    }
  })

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      setRelatedItems([])

      try {
        const {data, related} = await fetchItemDetails(item)
        setDetails(data)
        setRelatedItems(related)
        setSelectedRelatedIndex(0) // Reset selection when related items change
      } catch (error) {
        console.error('Error fetching details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [item])

  if (loading) {
    return (
      <Box paddingX={2} paddingY={1}>
        <Text>
          <Spinner type="dots" /> Loading details...
        </Text>
      </Box>
    )
  }

  if (!details) {
    return (
      <Box paddingX={2} paddingY={1}>
        <Text color="red">Failed to load details</Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box borderColor="cyan" borderStyle="double" marginBottom={1} paddingX={1}>
        <Text>
          {getItemIcon(item.type)} <Text bold>{item.label}</Text>
        </Text>
      </Box>

      <Box flexDirection="column" paddingX={1}>
        <Text bold color="green">
          Details:
        </Text>

        {item.type === 'account' && details && <AccountDetails details={details} />}
        {item.type === 'atom' && details && <AtomDetails details={details} />}
        {item.type === 'triple' && details && <TripleDetails details={details} />}
      </Box>

      {relatedItems.length > 0 && <RelatedItems items={relatedItems} selectedIndex={selectedRelatedIndex} />}
    </Box>
  )
}
