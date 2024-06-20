import { formatNumber, ProfileVariant } from './ProfileCard.utils'

describe('ProfileCard.utils', () => {
  describe('ProfileVariant', () => {
    it('should have the correct variants', () => {
      expect(ProfileVariant).toEqual({
        entity: 'entity',
        user: 'user',
      })
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
