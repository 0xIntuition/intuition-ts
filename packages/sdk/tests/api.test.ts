import { describe, expect, it } from 'vitest'

import { getAtomDetails, getTripleDetails, pinThing } from '../src'

describe('Reads', () => {
  it('atom', async () => {
    const data = await getAtomDetails(
      '0x114fab7e1612bf18692e9c9ef913f149cbe9fb06ce6c236642f062180004bb29',
    )
    expect(data?.label).toEqual('Arbitrum Ecosystem')
  }, 60000)

  it('triple', async () => {
    const data = await getTripleDetails(
      '0x3ace992ee16ac3902c0ee6330165de2a1024b569e78bc96e0c413aa2a608e051',
    )
    expect(data?.object?.label).toEqual('Arbitrum Ecosystem')
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
