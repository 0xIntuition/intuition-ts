import chalk from 'chalk'

import {ItemType, SearchResultItem} from './types.js'

export const getItemColor = (type: ItemType): string => {
  switch (type) {
    case 'account': {
      return 'cyan'
    }

    case 'atom': {
      return 'green'
    }

    case 'collection': {
      return 'magenta'
    }

    case 'triple': {
      return 'yellow'
    }

    default: {
      return 'white'
    }
  }
}

export const getItemIcon = (type: ItemType): string => {
  switch (type) {
    case 'account': {
      return '👤'
    }

    case 'atom': {
      return '⚛️'
    }

    case 'collection': {
      return '📚'
    }

    case 'triple': {
      return '🔗'
    }

    default: {
      return '•'
    }
  }
}

export const formatItem = (item: SearchResultItem, isSelected: boolean = false): string => {
  const icon = getItemIcon(item.type)
  const color = getItemColor(item.type)
  const prefix = isSelected ? '▶ ' : '  '

  let coloredLabel = item.label
  switch (color) {
    case 'cyan': {
      coloredLabel = chalk.cyan(item.label)
      break
    }

    case 'green': {
      coloredLabel = chalk.green(item.label)
      break
    }

    case 'magenta': {
      coloredLabel = chalk.magenta(item.label)
      break
    }

    case 'yellow': {
      coloredLabel = chalk.yellow(item.label)
      break
    }

    default: {
      coloredLabel = item.label
    }
  }

  return `${prefix}${icon} ${coloredLabel}`
}

// eslint-disable-next-line complexity,@typescript-eslint/no-explicit-any
export const parseSearchResults = (globalResults: any, semanticResults: any): SearchResultItem[] => {
  const items: SearchResultItem[] = []

  if (globalResults?.accounts) {
    for (const a of globalResults.accounts) {
      items.push({
        data: a,
        id: a.atom_id || a.id,
        label: a.label || a.address,
        type: 'account',
        url: `https://portal.intuition.systems/explore/atom/${a.atom_id}`,
      })
    }
  }

  if (globalResults?.atoms) {
    for (const a of globalResults.atoms) {
      items.push({
        data: a,
        id: a.term_id || a.id,
        label: a.label || '',
        type: 'atom',
        url: `https://portal.intuition.systems/explore/atom/${a.term_id}`,
      })
    }
  }

  if (globalResults?.triples) {
    for (const t of globalResults.triples) {
      items.push({
        data: t,
        id: t.term_id || t.id,
        label: `${t.subject.label} - ${t.predicate.label} - ${t.object.label}`,
        type: 'triple',
        url: `https://portal.intuition.systems/explore/triple/${t.term_id}`,
      })
    }
  }

  if (globalResults?.collections) {
    for (const c of globalResults.collections) {
      items.push({
        data: c,
        id: c.object.term_id || c.id,
        label: c.object.label || '',
        type: 'collection',
        url: `https://portal.intuition.systems/explore/list/0x49487b1d5bf2734d497d6d9cfcd72cdfbaefb4d4f03ddc310398b24639173c9d-${c.object.term_id}`,
      })
    }
  }

  if (semanticResults?.search_term) {
    for (const i of semanticResults.search_term) {
      const name = i.atom?.value?.json_object?.name || i.atom?.value?.text_object?.data
      if (name && !items.some((item) => item.id === i.atom?.term_id)) {
        items.push({
          data: i.atom,
          description: i.atom?.value?.json_object?.description,
          id: i.atom?.term_id || '',
          label: name,
          type: 'atom',
          url: `https://portal.intuition.systems/explore/atom/${i.atom?.term_id}`,
        })
      }
    }
  }

  return items
}
