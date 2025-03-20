import { Input } from '@0xintuition/1ui'

import { SortOption, SortSelect } from '@components/sort-select'
import { SortDirection } from '@lib/utils/params'

interface SearchAndSortProps<T> {
  options: SortOption<T>[]
  handleSortChange: (newSortBy: T, newDirection: SortDirection) => void
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchAndSort<T>({
  options,
  handleSortChange,
  handleSearchChange,
}: SearchAndSortProps<T>) {
  return (
    <div className="flex flex-row justify-between w-full">
      <Input
        className="w-48"
        onChange={handleSearchChange}
        placeholder="Search"
        startAdornment="magnifying-glass"
      />
      <SortSelect options={options} handleSortChange={handleSortChange} />
    </div>
  )
}
