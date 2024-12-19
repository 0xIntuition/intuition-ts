export interface PaginationType {
  offset: number
  limit: number
  totalEntries: number
  onOffsetChange: (offset: number) => void
  onLimitChange: (limit: number) => void
}
