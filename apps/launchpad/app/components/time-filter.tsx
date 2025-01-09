import { Button } from '@0xintuition/1ui'

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
    <div className="inline-flex items-center gap-1 rounded-md bg-background/5 p-1">
      {Object.entries(TIME_FILTER).map(([key, value]) => (
        <Button
          key={key}
          variant={selected === key ? 'secondary' : 'text'}
          size="sm"
          onClick={() => onSelect(key as TimeFilterType)}
          className="h-7 px-3 text-xs font-medium text-[#E6A068] data-[state=active]:text-foreground"
        >
          {value}
        </Button>
      ))}
    </div>
  )
}
