import { ReactNode, useEffect, useState } from 'react'

import { Skeleton } from 'components/Skeleton'
import { cn } from 'styles'

import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export const TimedLoaderComponent = ({
  disableLoader = false,
  skeletonClassName = 'w-full h-10',
  componentToRender,
}: {
  disableLoader?: boolean
  skeletonClassName?: string
  componentToRender: ReactNode
}) => {
  const { isCollapsed } = useSidebarLayoutContext()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    setShowLoader(true)
    setTimeout(() => setShowLoader(false), 300)
  }, [isCollapsed])

  return showLoader && !disableLoader ? (
    <Skeleton className={cn(isCollapsed && 'm-auto', skeletonClassName)} />
  ) : (
    componentToRender
  )
}
