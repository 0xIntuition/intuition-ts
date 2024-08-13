import * as React from 'react'

import { cn } from 'styles'
import { Identity, IdentityType } from 'types'

import { IdentityTag, Text, TextVariant, Trunctacular } from '..'

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: IdentityType
  username: string
  avatarImgSrc: string
  timestamp: string
}

const InfoCard = ({
  variant = Identity.user,
  username,
  avatarImgSrc,
  timestamp,
  className,
  ...props
}: InfoCardProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp))

  return (
    <div
      className={cn(
        `flex flex-col gap-2 theme-border p-5 rounded-lg max-sm:items-center`,
        className,
      )}
      {...props}
    >
      <Text variant={TextVariant.caption} className="text-muted-foreground">
        Creator
      </Text>
      <div className="flex justify-start items-center gap-1">
        <IdentityTag variant={variant} imgSrc={avatarImgSrc}>
          <Trunctacular value={username} maxStringLength={18} />
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
