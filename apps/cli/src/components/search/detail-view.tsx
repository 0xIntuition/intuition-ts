import {getAccountDetails, getAtomDetails, getTripleDetails} from '@0xintuition/sdk'
import chalk from 'chalk'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import React, {useEffect, useState} from 'react'

import {SearchResultItem} from './types.js'
import {getItemIcon} from './utils.js'

interface DetailViewProps {
  item: SearchResultItem
  onNavigate?: (_item: SearchResultItem) => void
}

export const DetailView: React.FC<DetailViewProps> = ({item}) => {
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [details, setDetails] = useState<any>(null)
  const [relatedItems, setRelatedItems] = useState<SearchResultItem[]>([])

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      setRelatedItems([])

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let data: any = null
        const related: SearchResultItem[] = []

        switch (item.type) {
          case 'account': {
            data = await getAccountDetails(item.data?.address || item.id)
            if (data) {
              // Account details fetched successfully
              // We'll show basic info for now
            }

            break
          }

          case 'atom': {
            data = await getAtomDetails(item.id)
            // Atom details fetched successfully
            break
          }

          case 'triple': {
            data = await getTripleDetails(item.id)
            if (data) {
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
            }

            break
          }
        }

        setDetails(data)
        setRelatedItems(related)
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

        {item.type === 'account' && details && (
          <Box flexDirection="column">
            <Text>Address: {chalk.gray(details.id || details.address || 'Unknown')}</Text>
            <Text>Label: {chalk.cyan(details.label || 'Unknown')}</Text>
            <Text>Positions: {chalk.yellow(details.positions?.length || 0)}</Text>
          </Box>
        )}

        {item.type === 'atom' && details && (
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
        )}

        {item.type === 'triple' && details && (
          <Box flexDirection="column">
            <Text>ID: {chalk.gray(details.term_id)}</Text>
            <Text>Subject: {chalk.cyan(details.subject?.label || 'Unknown')}</Text>
            <Text>Predicate: {chalk.green(details.predicate?.label || 'Unknown')}</Text>
            <Text>Object: {chalk.yellow(details.object?.label || 'Unknown')}</Text>
            <Text>Creator: {chalk.gray(details.creator?.address || 'Unknown')}</Text>
          </Box>
        )}
      </Box>

      {relatedItems.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text bold color="magenta">
            Related Items:
          </Text>
          {relatedItems.map((relItem) => (
            <Text key={`${relItem.type}-${relItem.id}`}>
              {'  '}
              {getItemIcon(relItem.type)} {relItem.label}
            </Text>
          ))}
          <Box marginTop={1}>
            <Text color="gray">Press Enter to navigate to selected item</Text>
          </Box>
        </Box>
      )}
    </Box>
  )
}
