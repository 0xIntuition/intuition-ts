import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@0xintuition/1ui'

export interface SortOption<T> {
  value: string
  sortBy: T
}

interface SortSelectProps<T> {
  options: SortOption<T>[]
  handleSortChange: (sortBy: T, order: 'asc' | 'desc') => void
}

export function SortSelect<T>({
  options,
  handleSortChange,
}: SortSelectProps<T>) {
  return (
    <Select
      onValueChange={(value) => {
        const selectedOption = options.find(
          (option) => option.value.toLowerCase() === value,
        )
        if (selectedOption) {
          handleSortChange(selectedOption.sortBy, 'desc')
        }
      }}
    >
      <SelectTrigger className="w-52 max-lg:w-full">
        <SelectValue placeholder={`Sort by`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value.toLowerCase()}
            value={option.value.toLowerCase()}
          >
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
