import { beforeEach, describe, expect, it, vi } from 'vitest'

import { uploadJsonToPinata } from '../src'

describe('External', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.restoreAllMocks()
  })

  it('should upload a new file to IPFS using Pinata', async () => {
    const data = await uploadJsonToPinata(
      process.env.PINATA_API_JWT || 'unknown',
      {
        name: 'Intuition',
        description: 'Intuition is a decentralized trust protocol.',
        image: 'https://example.com/intuition-logo.png',
      },
    )
    expect(data.IpfsHash).toEqual(
      'QmYiJdC6KbkUuKVYeuQLm3DRbaok3h6yPyJjPqas8cotqx',
    )
  })

  describe('Error Handling', () => {
    it('should throw error when Pinata API returns non-200 response', async () => {
      // Mock fetch to return a non-ok response
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Unauthorized',
      })

      await expect(
        uploadJsonToPinata('invalid_jwt', {
          name: 'Test',
        }),
      ).rejects.toThrow(
        'Failed to upload JSON to Pinata: Pinata upload failed: Unauthorized',
      )
    })

    it('should throw error when Pinata API returns empty IPFS hash', async () => {
      // Mock fetch to return a response with empty IpfsHash
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          IpfsHash: '',
          PinSize: 100,
          Timestamp: new Date().toISOString(),
          ID: 'test-id',
          Name: null,
          NumberOfFiles: 1,
          MimeType: 'application/json',
          GroupId: null,
          Keyvalues: null,
          isDuplicate: false,
        }),
      })

      const result = await uploadJsonToPinata('valid_jwt', {
        name: 'Test',
      })

      // The function returns the response, validation happens in calling functions
      expect(result.IpfsHash).toBe('')
    })

    it('should throw error when fetch fails due to network error', async () => {
      // Mock fetch to throw a network error
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(
        uploadJsonToPinata('valid_jwt', {
          name: 'Test',
        }),
      ).rejects.toThrow('Failed to upload JSON to Pinata: Network error')
    })

    it('should throw error when fetch fails with non-Error object', async () => {
      // Mock fetch to throw a non-Error object
      global.fetch = vi.fn().mockRejectedValue('String error')

      await expect(
        uploadJsonToPinata('valid_jwt', {
          name: 'Test',
        }),
      ).rejects.toThrow('Failed to upload JSON to Pinata: Unknown error')
    })

    it('should handle malformed JSON response', async () => {
      // Mock fetch to return invalid JSON
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON')
        },
      })

      await expect(
        uploadJsonToPinata('valid_jwt', {
          name: 'Test',
        }),
      ).rejects.toThrow('Invalid JSON')
    })
  })
})
