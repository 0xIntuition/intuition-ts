export interface PaginationInput {
  total: number
  limit: number
  offset: number
  onOffsetChange: (offset: number) => void
  onLimitChange: (limit: number) => void
}

export interface PaginationType {
  totalEntries: number
  limit: number
  offset: number
  onOffsetChange: (offset: number) => void
  onLimitChange: (limit: number) => void
}

export function mapPaginationInput(input: PaginationInput): PaginationType {
  return {
    totalEntries: input.total,
    limit: input.limit,
    offset: input.offset,
    onOffsetChange: input.onOffsetChange,
    onLimitChange: input.onLimitChange,
  }
}
