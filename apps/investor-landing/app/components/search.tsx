import { Input } from '@0xintuition/1ui'

interface SearchProps {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Search({ handleSearchChange }: SearchProps) {
  return (
    <Input
      className="w-48 max-lg:w-full"
      onChange={handleSearchChange}
      placeholder="Search"
      startAdornment="magnifying-glass"
    />
  )
}
