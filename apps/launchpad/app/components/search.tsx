import { Input } from '@0xintuition/1ui'

interface SearchProps {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Search({ handleSearchChange }: SearchProps) {
  return (
    <Input
      className="w-full max-lg:w-full bg-transparent border-none text-xl"
      onChange={handleSearchChange}
      placeholder="Search atoms"
      startAdornment="magnifying-glass"
    />
  )
}
