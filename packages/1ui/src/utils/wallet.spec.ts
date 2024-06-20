import { formatWalletAddress } from './wallet'

describe('formatWalletAddress', () => {
  it('should format did address correctly', () => {
    const address = 'did:0x1234567890abcdef1234567890abcdef12345678'
    expect(formatWalletAddress(address)).toBe('did:0x1234...5678')
  })

  it('should format eth address correctly', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678'
    expect(formatWalletAddress(address)).toBe('0x1234...5678')
  })

  it('should return ENS address as is', () => {
    const address = 'someperson.eth'
    expect(formatWalletAddress(address)).toBe(address)
  })
})
