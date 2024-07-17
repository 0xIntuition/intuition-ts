import * as React from 'react'

import { Button, Icon, Input } from '@0xintuition/1ui'

export interface ExploreSearchInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  searchParam: string
  placeholder?: string
  initialValue?: string | null
}

const ExploreSearchInput = ({
  searchParam,
  placeholder = 'Search by a username or address',
  initialValue,
  ...props
}: ExploreSearchInputProps) => (
  <div className="flex items-center justify-between">
    <Input
      type="text"
      name={searchParam}
      placeholder={placeholder}
      defaultValue={initialValue}
      className="w-full min-w-[610px] bg-card/70 rounded-lg border-none focus:ring-0 focus:outline-none [&>input]:text-lg pl-px"
      {...props}
    />
    <Button type="submit" variant="secondary" size="icon">
      <Icon name="arrow-corner-down-left" />
    </Button>
  </div>
)

export { ExploreSearchInput }
