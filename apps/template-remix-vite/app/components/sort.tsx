import React from 'react'

import { SortDirection } from '@0xintuition/api'

import { SortOption, SortSelect } from '@components/sort-select'

interface SortProps<T> {
  options: SortOption<T>[]
  handleSortChange: (newSortBy: T, newDirection: SortDirection) => void
}

export function Sort<T>({ options, handleSortChange }: SortProps<T>) {
  return <SortSelect options={options} handleSortChange={handleSortChange} />
}
