import { describe, expect, it } from 'vitest'

import { uploadJsonToPinata } from '../src'

describe('External', () => {
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
})
