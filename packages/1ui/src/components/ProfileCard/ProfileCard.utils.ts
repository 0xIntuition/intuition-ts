export const ProfileVariant = {
  entity: 'entity',
  user: 'user',
} as const

// Utility function to format large numbers
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return Math.round(value / 1000000) + 'M'
  } else if (value >= 1000) {
    return Math.round(value / 1000) + 'k'
  } else {
    return value.toString()
  }
}
