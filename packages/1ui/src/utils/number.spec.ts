// number.spec.ts

import { formatNumber } from './number'

describe('formatNumber', () => {
  it('should format numbers greater than or equal to 1,000,000 as M', () => {
    expect(formatNumber(1000000)).toBe('1M')
    expect(formatNumber(2500000)).toBe('2.5M')
    expect(formatNumber(1999999)).toBe('2M')
  })

  it('should format numbers greater than or equal to 1,000 and less than 1,000,000 as K', () => {
    expect(formatNumber(1000)).toBe('1K')
    expect(formatNumber(1500)).toBe('1.5K')
    expect(formatNumber(999999)).toBe('1000K')
  })

  it('should return the number as a string if it is less than 1,000', () => {
    expect(formatNumber(999)).toBe('999')
    expect(formatNumber(500)).toBe('500')
    expect(formatNumber(0)).toBe('0')
  })

  it('should handle edge cases correctly', () => {
    expect(formatNumber(999999)).toBe('1000K')
    expect(formatNumber(1000000)).toBe('1M')
  })
})
