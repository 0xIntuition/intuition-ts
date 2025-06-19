import { describe, expect, it } from 'vitest'

import { pinThing } from '../src/pin-thing'

describe('Mutations', () => {
  it('fetch atom', async () => {
    const data = await pinThing({
      url: 'https://www.intuition.systems/',
      name: 'Intuition',
      description: 'A decentralized trust protocol',
      image: 'https://example.com/image.png',
    })
    expect(data).toEqual(
      'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
    )
  })
})
