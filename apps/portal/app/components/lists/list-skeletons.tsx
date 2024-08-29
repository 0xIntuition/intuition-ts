import { Skeleton } from '@0xintuition/1ui'

export function ListClaimsSkeletonLayout({
  totalItems = 8,
  enableSearch = true,
  enableSort = true,
}: {
  totalItems?: number
  enableSearch?: boolean
  enableSort?: boolean
}) {
  return (
    <div className="flex flex-col w-full gap-5 my-5">
      <div className="flex items-center justify-between mb-4">
        {enableSearch && <Skeleton className="w-64 h-10" />}
        {enableSort && <Skeleton className="w-44 h-10" />}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-7">
        {[...Array(totalItems)].map((_, index) => (
          <Skeleton key={index} className="w-full aspect-[3/2]" />
        ))}
      </div>
      <Skeleton className="w-full h-10 mt-4" />
    </div>
  )
}

export function TabsSkeleton() {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <Skeleton className="w-44 h-10" />
      <Skeleton className="w-44 h-10" />
    </div>
  )
}
