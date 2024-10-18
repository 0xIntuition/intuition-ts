export type SortDirection = 'asc' | 'desc'

export interface SortState {
  column: number
  direction: SortDirection
}

export function sortData(data: string[][], sortState: SortState): number[] {
  const { column, direction } = sortState

  // Create an array of indices
  const indices = Array.from({ length: data.length - 1 }, (_, i) => i + 1)

  // Sort the indices based on the values in the specified column
  indices.sort((a, b) => {
    const valueA = data[a][column].toLowerCase()
    const valueB = data[b][column].toLowerCase()

    if (valueA < valueB) {
      return direction === 'asc' ? -1 : 1
    }
    if (valueA > valueB) {
      return direction === 'asc' ? 1 : -1
    }
    return 0
  })

  return indices
}

export function getNextSortDirection(
  currentDirection: SortDirection | null,
): SortDirection {
  return currentDirection === 'asc' ? 'desc' : 'asc'
}
