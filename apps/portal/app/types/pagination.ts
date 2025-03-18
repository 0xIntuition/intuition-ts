export interface PaginationType {
  currentPage: number
  limit: number
  totalEntries: number
  totalPages: number
}

// GraphQL pagination type that includes count directly from GraphQL responses
export interface GraphQLPaginationType {
  aggregate?: { count: number }
}

// Extended pagination type that combines our standard pagination with GraphQL pagination info
export interface FullPaginationType extends PaginationType {
  gqlTotalQuery?: GraphQLPaginationType
}
