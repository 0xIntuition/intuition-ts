import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@0xintuition/1ui'

import { Atom } from './types'

interface AtomTypeSelectProps {
  value: Atom['type']
  onValueChange: (value: Atom['type']) => void
}

export function AtomTypeSelect({ value, onValueChange }: AtomTypeSelectProps) {
  return (
    <div className="w-40">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select atom type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Person">Person</SelectItem>
          <SelectItem value="Thing">Thing</SelectItem>
          <SelectItem value="Organization">Organization</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
