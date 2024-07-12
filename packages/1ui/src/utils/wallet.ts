// Utility function to format wallet address
export const formatWalletAddress = (address: string): string => {
  if (address.startsWith('did:')) {
    const ethAddress = address.slice(4) // Remove 'did:' prefix
    return `did:${ethAddress.slice(0, 6)}...${ethAddress.slice(-4)}`
  } else if (address.endsWith('.eth')) {
    return address
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
