export type ItemType = 'account' | 'atom' | 'collection' | 'triple'

export interface SearchResultItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  description?: string
  id: string
  label: string
  type: ItemType
  url?: string
}

export interface SearchResultsGroup {
  items: SearchResultItem[]
  title: string
  type: ItemType
}

export interface NavigationState {
  item?: SearchResultItem
  parentItem?: SearchResultItem
  selectedIndex?: number // For search view: tracks selected result, for detail view: tracks selected related item
  type: 'detail' | 'search'
}

export interface BreadcrumbItem {
  item?: SearchResultItem
  label: string
  type: 'detail' | 'search'
}
