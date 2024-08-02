import React from 'react'

import { Avatar } from '@0xintuition/1ui'

export function ListTabIdentityDisplay({
  imgSrc,
  children,
}: {
  imgSrc?: string | null
  children: React.ReactNode
}) {
  return (
    <div className="font-medium py-0.5 pl-0.5 pr-2 flex gap-2 items-center text-base [&>span]:h-6 [&>span]:w-6">
      <Avatar
        className="rounded-full [&>span]:rounded-full [&>span]:overflow-hidden"
        src={imgSrc || ''}
        name="identity avatar"
      />
      {children}
    </div>
  )
}
