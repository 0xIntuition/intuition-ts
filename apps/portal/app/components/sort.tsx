import React from 'react'

import { SortOption, SortSelect } from '@components/sort-select'
import { SortDirection } from '@lib/utils/params'

interface SortProps<T> {
  options: SortOption<T>[]
  handleSortChange: (newSortBy: T, newDirection: SortDirection) => void
}

export function Sort<T>({ options, handleSortChange }: SortProps<T>) {
  return <SortSelect options={options} handleSortChange={handleSortChange} />
}
