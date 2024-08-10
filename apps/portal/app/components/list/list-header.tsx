import {
  Icon,
  IconNameType,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

interface ListHeaderItemProps {
  label: string
  icon: IconNameType
}

interface ListHeaderProps {
  items: ListHeaderItemProps[]
}

export function ListHeader({ items }: ListHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-background theme-border border-t border-x rounded-t-xl">
      {items.map(({ label, icon }, index) => (
        <div key={index} className="flex items-center gap-2 px-2">
          <Icon name={icon} className="w-6 h-6 text-muted-foreground" />
          <Text
            variant={TextVariant.body}
            weight={TextWeight.medium}
            className="text-muted-foreground"
          >
            {label}
          </Text>
        </div>
      ))}
    </div>
  )
}
