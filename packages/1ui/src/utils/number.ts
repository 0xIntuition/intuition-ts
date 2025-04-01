// Utility function to format large numbers
export const formatNumber = (value: number, precision?: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(precision ?? 0)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(precision ?? 0)}K`
  }
  return precision ? value.toFixed(precision) : value.toString()
}
