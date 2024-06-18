export const ProfileVariant = {
  entity: 'entity',
  user: 'user',
} as const

// Utility function to format wallet address
export const formatWalletAddress = (address: string): string => {
  if (address.endsWith('.eth')) {
    return address
  } else {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
}
