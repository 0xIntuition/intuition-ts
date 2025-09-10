import { describe, expect, it } from 'vitest'

import { getAtomDetails, getTripleDetails, pinThing } from '../src'

describe('Reads', () => {
  it('atom', async () => {
    const data = await getAtomDetails('0xff89a9d8eed2bfc3ee6701935d0fbbd3f191b27b97ae980e0baa5185499e9be8')
    expect(data?.label).toEqual('Uniswap')
  })

  it('triple', async () => {
    const data = await getTripleDetails('0x18d0c323750e23ee400ea00519b0eb9374005f28527fcbd8dbfeeedda2bc0b1a')
    expect(data?.object.label).toEqual('Web3 Analytics Tool')
  }, 60000)
})

describe('Writes', () => {
  it('should pin thing', async () => {
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
