import * as React from 'react'

import { Identity, Text, TextVariant } from '..'

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'default' | 'user'
  username: string
  avatarImgSrc: string
  timestamp: string
}

const InfoCard = ({
  variant,
  username,
  avatarImgSrc,
  timestamp,
  ...props
}: InfoCardProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp))

  return (
    <div
      className="flex flex-col gap-2 border border-border/30 p-5 rounded-lg"
      {...props}
    >
      <Text variant={TextVariant.caption} className="text-muted-foreground">
        Creator
      </Text>
      <div className="flex justify-between items-center gap-1">
        <Identity variant={variant} imgSrc={avatarImgSrc}>
          {username}
        </Identity>
        <span className="bg-muted-foreground h-[2px] w-[2px] block rounded-full" />
        <Text variant={TextVariant.body} className="text-muted-foreground">
          {formattedDate}
        </Text>
      </div>
    </div>
  )
}

export { InfoCard }
