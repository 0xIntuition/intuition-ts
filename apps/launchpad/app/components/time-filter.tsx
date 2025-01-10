import { Button, cn, Text, TextVariant } from '@0xintuition/1ui'

import { Filter } from 'lucide-react'

export const TIME_FILTER = {
  '1D': '1D',
  '1W': '1W',
  '1M': '1M',
  '3M': '3M',
  '1Y': '1Y',
  YTD: 'YTD',
} as const

export type TimeFilterType = keyof typeof TIME_FILTER

interface TimeFilterProps {
  selected: TimeFilterType
  onSelect: (filter: TimeFilterType) => void
}

export function TimeFilter({ selected, onSelect }: TimeFilterProps) {
  return (
    <div className="inline-flex items-center gap-5 rounded-md p-1">
      {Object.entries(TIME_FILTER).map(([key, value]) => (
        <Button
          key={key}
          variant={selected === key ? 'accent' : 'text'}
          size="sm"
          onClick={() => onSelect(key as TimeFilterType)}
          className={cn(
            'h-7 p-2 rounded-lg hover:bg-accent/10',
            selected === key && 'hover:bg-accent',
          )}
        >
          <Text
            variant={TextVariant.bodyLarge}
            className={cn('text-accent', selected === key && 'text-black')}
          >
            {value}
          </Text>
        </Button>
      ))}
      <Filter className="h-5 w-5 text-accent" />
    </div>
  )
}
