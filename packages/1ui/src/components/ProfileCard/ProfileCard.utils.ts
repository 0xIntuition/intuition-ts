export const ProfileVariant = {
  entity: 'entity',
  user: 'user',
} as const

// Utility function to format wallet address
export const formatWalletAddress = (address: string): string => {
  if (address.startsWith('did:')) {
    const ethAddress = address.slice(4) // Remove 'did:' prefix
    return `did:${ethAddress.slice(0, 6)}...${ethAddress.slice(-4)}`
  } else if (address.endsWith('.eth')) {
    return address
  } else {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
}

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
