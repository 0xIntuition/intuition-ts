import { Skeleton } from '@0xintuition/1ui'

export function DataHeaderSkeleton() {
  return (
    <div className="flex flex-col w-full rounded-xl border border-neutral-300/20">
      <Skeleton className="w-full h-36" />
    </div>
  )
}

export function PaginatedListSkeleton() {
  return (
    <div className="flex flex-col w-full gap-5 my-5">
      <div className="flex items-center justify-between">
        <Skeleton className="w-44 h-10" />
        <Skeleton className="w-44 h-10" />
      </div>
      <Skeleton className="w-full h-56" />
      <Skeleton className="w-full h-10" />
    </div>
  )
}

export function TabsSkeleton({ numOfTabs }: { numOfTabs: number }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      {Array.from({ length: numOfTabs }).map((_, index) => (
        <Skeleton key={index} className="w-24 h-10 rounded" />
      ))}
    </div>
  )
}
