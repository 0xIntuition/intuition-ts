import * as React from 'react'

import { IdentityType } from 'types'

import { IdentityTag, Text, TextVariant } from '..'

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: IdentityType
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
    <div className="flex flex-col gap-2 theme-border p-5 rounded-lg" {...props}>
      <Text variant={TextVariant.caption} className="text-muted-foreground">
        Creator
      </Text>
      <div className="flex justify-between items-center gap-1">
        <IdentityTag variant={variant} imgSrc={avatarImgSrc}>
          {username}
        </IdentityTag>
        <span className="bg-muted-foreground h-[2px] w-[2px] block rounded-full" />
        <Text variant={TextVariant.body} className="text-muted-foreground">
          {formattedDate}
        </Text>
      </div>
    </div>
  )
}

export { InfoCard }
