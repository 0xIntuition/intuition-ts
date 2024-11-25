import type { ReactNode } from 'react'

import { cn } from '@lib/utils/misc'

export default function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn(`flex-1 space-y-4 px-12 py-10 max-md:py-5`, className)}>
      {children}
    </div>
  )
}
