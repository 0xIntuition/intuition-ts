// Utility function to format large numbers
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    const millions = value / 1000000
    return millions >= 100
      ? `${Math.round(millions)}M`
      : `${millions.toFixed(1).replace(/\.?0+$/, '')}M`
  } else if (value >= 1000) {
    const thousands = value / 1000
    return thousands >= 100
      ? `${Math.round(thousands)}K`
      : `${thousands.toFixed(1).replace(/\.?0+$/, '')}K`
  }
  return value.toString()
}
