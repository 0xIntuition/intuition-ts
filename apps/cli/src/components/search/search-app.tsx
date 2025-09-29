import {globalSearch, semanticSearch} from '@0xintuition/sdk'
import chalk from 'chalk'
import {Box, Text, useApp, useInput} from 'ink'
import React, {useEffect, useState} from 'react'

import {Breadcrumbs} from './breadcrumbs.js'
import {DetailView} from './detail-view.js'
import {SearchResults} from './search-results.js'
import {BreadcrumbItem, NavigationState, SearchResultItem} from './types.js'
import {parseSearchResults} from './utils.js'

interface SearchAppProps {
  searchQuery: string
}

export const SearchApp: React.FC<SearchAppProps> = ({searchQuery}) => {
  const {exit} = useApp()
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [navigationStack, setNavigationStack] = useState<NavigationState[]>([{selectedIndex: 0, type: 'search'}])
  const [currentView, setCurrentView] = useState<NavigationState>({selectedIndex: 0, type: 'search'})
  const [selectedItem, setSelectedItem] = useState<null | SearchResultItem>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Derived state from currentView
  const selectedIndex = currentView.selectedIndex ?? 0

  useEffect(() => {
    const performSearch = async () => {
      try {
        const [globalResults, semanticResults] = await Promise.all([
          globalSearch(`%${searchQuery}%`, {
            accountsLimit: 10,
            atomsLimit: 10,
            collectionsLimit: 10,
            triplesLimit: 10,
          }),
          semanticSearch(searchQuery, {limit: 5}),
        ])

        const searchResults = parseSearchResults(globalResults || {}, semanticResults || {})
        setResults(searchResults)
        setIsLoading(false)
      } catch {
        setHasError(true)
        setIsLoading(false)
      }
    }

    performSearch()
  }, [searchQuery])

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
        const newIndex = Math.max(0, selectedIndex - 1)
        const updatedView = {...currentView, selectedIndex: newIndex}
        setCurrentView(updatedView)
        // Update the current view in the stack as well
        const updatedStack = [...navigationStack]
        updatedStack[updatedStack.length - 1] = updatedView
        setNavigationStack(updatedStack)
      } else if (key.downArrow || input === 'j') {
        const newIndex = Math.min(results.length - 1, selectedIndex + 1)
        const updatedView = {...currentView, selectedIndex: newIndex}
        setCurrentView(updatedView)
        // Update the current view in the stack as well
        const updatedStack = [...navigationStack]
        updatedStack[updatedStack.length - 1] = updatedView
        setNavigationStack(updatedStack)
      } else if (key.return) {
        const item = results[selectedIndex]
        if (item) {
          setSelectedItem(item)
          const newState: NavigationState = {
            item,
            parentItem: currentView.item,
            selectedIndex: 0, // Start with first related item selected
            type: 'detail',
          }
          setNavigationStack([...navigationStack, newState])
          setCurrentView(newState)
        }
      } else if (key.escape) {
        if (navigationStack.length > 1) {
          const newStack = navigationStack.slice(0, -1)
          const newCurrentView = newStack.at(-1)!
          setNavigationStack(newStack)
          setCurrentView(newCurrentView)
          setSelectedItem(newCurrentView.item || null)
        } else {
          exit()
        }
      }
    } else if (currentView.type === 'detail') {
      if (key.escape || input === 'b') {
        if (navigationStack.length > 1) {
          const newStack = navigationStack.slice(0, -1)
          const newCurrentView = newStack.at(-1)!
          setNavigationStack(newStack)
          setCurrentView(newCurrentView)
          setSelectedItem(newCurrentView.item || null)
        }
      } else if (input === 'q') {
        exit()
      }
    }
  })

  return (
    <Box flexDirection="column">
      {currentView.type === 'search' && isLoading && (
        <Box paddingX={2} paddingY={1}>
          <Text color="cyan">Loading search results...</Text>
        </Box>
      )}

      {currentView.type === 'search' && !isLoading && hasError && (
        <Box paddingX={2} paddingY={1}>
          <Text color="red">Error occurred while searching. Please try again.</Text>
        </Box>
      )}

      {currentView.type === 'search' && !isLoading && !hasError && results.length > 0 && (
        <>
          <SearchResults items={results} selectedIndex={selectedIndex} />
          <Box marginTop={1} paddingX={1}>
            <Text color="gray">{chalk.bold('Controls:')} ↑/↓/j/k: Navigate | Enter: View Details | q/Esc: Exit</Text>
          </Box>
        </>
      )}

      {currentView.type === 'search' && !isLoading && !hasError && results.length === 0 && (
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
                selectedIndex: 0, // Start with first related item selected
                type: 'detail',
              }
              setNavigationStack([...navigationStack, newState])
              setCurrentView(newState)
            }}
            onUpdateSelectedIndex={(index) => {
              const updatedView = {...currentView, selectedIndex: index}
              setCurrentView(updatedView)
              // Update the current view in the stack as well
              const updatedStack = [...navigationStack]
              updatedStack[updatedStack.length - 1] = updatedView
              setNavigationStack(updatedStack)
            }}
            selectedRelatedIndex={selectedIndex}
          />
          <Box marginTop={1} paddingX={1}>
            <Text color="gray">{chalk.bold('Controls:')} Esc/b: Back | q: Exit</Text>
          </Box>
        </>
      )}

      <Breadcrumbs items={breadcrumbs} />
    </Box>
  )
}
