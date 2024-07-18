import * as React from 'react'

import { ClaimProps, Text, TextVariant, TextWeight } from '..'

export interface ListHeaderCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: number
  children: React.ReactElement<ClaimProps>
}

const ListHeaderCard: React.FC<ListHeaderCardProps> = ({
  label,
  value,
  children,
  ...props
}) => {
  return (
    <div
      className="flex items-center justify-between w-full p-6 theme-border rounded-xl"
      {...props}
    >
      <div className="flex flex-col">
        <Text
          variant={TextVariant.caption}
          className="text-muted-foreground mb-0.5"
        >
          {label}
        </Text>
        <Text
          variant={TextVariant.bodyLarge}
          weight={TextWeight.medium}
          {...props}
        >
          {value}
        </Text>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  )
}

export { ListHeaderCard }
