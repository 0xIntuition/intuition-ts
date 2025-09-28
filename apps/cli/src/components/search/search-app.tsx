import chalk from 'chalk'
import {Box, Text, useApp, useInput} from 'ink'
import React, {useState} from 'react'

import {Breadcrumbs} from './breadcrumbs.js'
import {DetailView} from './detail-view.js'
import {SearchResults} from './search-results.js'
import {BreadcrumbItem, NavigationState, SearchResultItem} from './types.js'

interface SearchAppProps {
  initialResults: SearchResultItem[]
  searchQuery: string
}

export const SearchApp: React.FC<SearchAppProps> = ({initialResults, searchQuery}) => {
  const {exit} = useApp()
  const [results] = useState<SearchResultItem[]>(initialResults)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [navigationStack, setNavigationStack] = useState<NavigationState[]>([{type: 'search'}])
  const [currentView, setCurrentView] = useState<NavigationState>({type: 'search'})
  const [selectedItem, setSelectedItem] = useState<null | SearchResultItem>(null)

  const breadcrumbs: BreadcrumbItem[] = navigationStack.map((state) => {
    if (state.type === 'search') {
      return {
        label: `Search: "${searchQuery}"`,
        type: 'search',
      }
    }

    return {
      item: state.item,
      label: state.item?.label || 'Detail',
      type: 'detail',
    }
  })

  useInput((input, key) => {
    if (input === 'q' || (key.ctrl && input === 'c')) {
      exit()
      return
    }

    if (currentView.type === 'search') {
      if (key.upArrow || input === 'k') {
        setSelectedIndex((prev) => Math.max(0, prev - 1))
      } else if (key.downArrow || input === 'j') {
        setSelectedIndex((prev) => Math.min(results.length - 1, prev + 1))
      } else if (key.return) {
        const item = results[selectedIndex]
        if (item) {
          setSelectedItem(item)
          const newState: NavigationState = {
            item,
            parentItem: currentView.item,
            type: 'detail',
          }
          setNavigationStack([...navigationStack, newState])
          setCurrentView(newState)
        }
      } else if (key.escape) {
        if (navigationStack.length > 1) {
          const newStack = navigationStack.slice(0, -1)
          setNavigationStack(newStack)
          setCurrentView(newStack.at(-1)!)
          setSelectedItem(null)
        } else {
          exit()
        }
      }
    } else if (currentView.type === 'detail') {
      if (key.escape || input === 'b') {
        if (navigationStack.length > 1) {
          const newStack = navigationStack.slice(0, -1)
          setNavigationStack(newStack)
          setCurrentView(newStack.at(-1)!)
          setSelectedItem(null)
        }
      } else if (input === 'q') {
        exit()
      }
    }
  })

  return (
    <Box flexDirection="column">
      <Box borderColor="cyan" borderStyle="round" marginBottom={1} paddingX={1}>
        <Text bold>🔎 Intuition Search - {chalk.cyan(searchQuery)}</Text>
      </Box>

      {currentView.type === 'search' && results.length > 0 && (
        <>
          <SearchResults items={results} maxDisplay={15} selectedIndex={selectedIndex} />
          <Box marginTop={1} paddingX={1}>
            <Text color="gray">{chalk.bold('Controls:')} ↑/↓/j/k: Navigate | Enter: View Details | q/Esc: Exit</Text>
          </Box>
        </>
      )}

      {currentView.type === 'search' && results.length === 0 && (
        <Box paddingX={2} paddingY={1}>
          <Text color="yellow">No results found for "{searchQuery}"</Text>
        </Box>
      )}

      {currentView.type === 'detail' && selectedItem && (
        <>
          <DetailView
            item={selectedItem}
            onNavigate={(item) => {
              setSelectedItem(item)
              const newState: NavigationState = {
                item,
                parentItem: currentView.item,
                type: 'detail',
              }
              setNavigationStack([...navigationStack, newState])
              setCurrentView(newState)
            }}
          />
          <Box marginTop={1} paddingX={1}>
            <Text color="gray">{chalk.bold('Controls:')} Esc/b: Back | q: Exit</Text>
          </Box>
        </>
      )}

      <Box marginTop={1}>
        <Breadcrumbs items={breadcrumbs} />
      </Box>
    </Box>
  )
}
