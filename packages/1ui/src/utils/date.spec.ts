// date.spec.ts

import { formatDate } from './date'

describe('formatDate', () => {
  it('should format the date correctly', () => {
    const timestamp = '2024-06-24T16:00:00Z'
    const formattedDate = formatDate(timestamp)
    expect(formattedDate).toBe('June 24, 2024')
  })

  it('should handle different dates correctly', () => {
    const timestamp1 = '2022-12-25T16:00:00Z'
    const formattedDate1 = formatDate(timestamp1)
    expect(formattedDate1).toBe('December 25, 2022')

    const timestamp2 = '2023-01-01T16:00:00Z'
    const formattedDate2 = formatDate(timestamp2)
    expect(formattedDate2).toBe('January 1, 2023')
  })

  it('should handle invalid date string', () => {
    const invalidTimestamp = 'invalid-date'
    expect(() => formatDate(invalidTimestamp)).toThrow(RangeError)
  })

  it('should handle empty date string', () => {
    const emptyTimestamp = ''
    expect(() => formatDate(emptyTimestamp)).toThrow(RangeError)
  })
})
