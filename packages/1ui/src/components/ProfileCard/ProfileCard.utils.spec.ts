import {
  formatNumber,
  formatWalletAddress,
  ProfileVariant,
} from './ProfileCard.utils'

describe('ProfileCard.utils', () => {
  describe('ProfileVariant', () => {
    it('should have the correct variants', () => {
      expect(ProfileVariant).toEqual({
        entity: 'entity',
        user: 'user',
      })
    })
  })

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

  describe('formatNumber', () => {
    it('should format numbers correctly', () => {
      expect(formatNumber(999)).toBe('999')
      expect(formatNumber(1000)).toBe('1k')
      expect(formatNumber(1500)).toBe('2k')
      expect(formatNumber(1000000)).toBe('1M')
      expect(formatNumber(2500000)).toBe('3M')
    })
  })
})
