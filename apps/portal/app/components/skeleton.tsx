import { Skeleton } from '@0xintuition/1ui'

export function DataHeaderSkeleton() {
  return (
    <div className="flex flex-col w-full gap-3">
      <Skeleton className="w-full h-36" />
    </div>
  )
}

export function PaginatedListSkeleton({
  enableSearch = true,
  enableSort = true,
}: {
  enableSearch?: boolean
  enableSort?: boolean
}) {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-3">
        {enableSearch && <Skeleton className="w-44 h-10 max-sm:w-full" />}
        {enableSort && <Skeleton className="w-44 h-10 max-sm:w-full" />}
      </div>
      <Skeleton className="w-full h-56" />
      <Skeleton className="w-full h-10" />
    </div>
  )
}

export function TabsSkeleton({ numOfTabs }: { numOfTabs: number }) {
  return (
    <div className="flex items-center gap-2.5">
      {Array.from({ length: numOfTabs }).map((_, index) => (
        <Skeleton key={index} className="w-44 h-10 rounded" />
      ))}
    </div>
  )
}

export function ActivitySkeleton() {
  return (
    <div className="flex flex-col w-full gap-6">
      <Skeleton className="w-full h-48" />
      <Skeleton className="w-full h-48" />
      <Skeleton className="w-full h-48" />
    </div>
  )
}

export function HomeStatsHeaderSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      ))}
    </div>
  )
}
