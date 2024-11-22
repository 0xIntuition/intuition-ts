import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@0xintuition/1ui'

export const ATOM_TYPES = [
  'All',
  'Thing',
  'Person',
  'Account',
  'Organization',
  'Book',
] as const
export type AtomType = (typeof ATOM_TYPES)[number]

interface AtomTypeSelectProps {
  value: AtomType
  onValueChange: (value: AtomType) => void
}

export function AtomTypeSelect({ value, onValueChange }: AtomTypeSelectProps) {
  return (
    <Select
      value={value.toLowerCase()}
      onValueChange={(val) => {
        const selectedType = ATOM_TYPES.find(
          (type) => type.toLowerCase() === val,
        )
        if (selectedType) {
          onValueChange(selectedType)
        }
      }}
    >
      <SelectTrigger className="w-32 py-1 tracking-normal font-normal h-8">
        <SelectValue placeholder="Filter type" />
      </SelectTrigger>
      <SelectContent>
        {ATOM_TYPES.map((type) => (
          <SelectItem key={type.toLowerCase()} value={type.toLowerCase()}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
