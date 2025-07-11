import React from 'react'

import type { SortDirection } from '@0xintuition/api'

import { SortSelect, type SortOption } from '@components/sort-select'

interface SortProps<T> {
  options: SortOption<T>[]
  handleSortChange: (newSortBy: T, newDirection: SortDirection) => void
}

export function Sort<T>({ options, handleSortChange }: SortProps<T>) {
  return <SortSelect options={options} handleSortChange={handleSortChange} />
}
