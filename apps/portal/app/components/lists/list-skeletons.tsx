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
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div
          className={`flex flex-row w-full ${enableSearch ? 'justify-between' : 'justify-end'} ${enableSort ? 'mb-6' : 'mb-0'}`}
        >
          {enableSearch && <Skeleton className="w-64 h-10" />}
          {enableSort && <Skeleton className="w-44 h-10" />}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(totalItems)].map((_, index) => (
            <Skeleton
              key={index}
              className="relative flex flex-col min-w-[200px] max-w-[400px] min-h-[370px] p-5 rounded-xl overflow-hidden"
            />
          ))}
        </div>
      </div>
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
