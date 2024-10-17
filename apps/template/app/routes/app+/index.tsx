import { useState } from 'react'

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from '@0xintuition/1ui'

import { AtomSortKey, AtomTypeKey, useAtoms } from '@lib/hooks/useAtoms'

export default function App() {
  const [atomsSortKey, setAtomsSortKey] = useState<AtomSortKey>('Most Recent')
  const [filterString, setFilterString] = useState('0x1f')
  const [type, setType] = useState<AtomTypeKey>('ALL')

  const atoms = useAtoms({
    token: '0xintuition',
    atomsSortKey,
    type,
    filterString,
  })

  const handleSortChange = (value: string) => {
    setAtomsSortKey(value as AtomSortKey)
  }

  const handleTypeChange = (value: string) => {
    setType(value as AtomTypeKey)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(event.target.value)
  }

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Text>Sort by:</Text>
          <Select onValueChange={handleSortChange} value={atomsSortKey}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Name">Name</SelectItem>
              <SelectItem value="Most Recent">Most Recent</SelectItem>
              <SelectItem value="Most Popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Text>Type:</Text>
          <Select onValueChange={handleTypeChange} value={type}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="Thing">Thing</SelectItem>
              <SelectItem value="Account">Account</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Text>Search:</Text>
          <Input
            className="w-48"
            onChange={handleSearchChange}
            value={filterString}
            placeholder="Search"
            startAdornment="magnifying-glass"
          />
        </div>
      </div>
      <pre>{JSON.stringify(atoms, null, 2)}</pre>
    </div>
  )
}
