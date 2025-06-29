import { describe, expect, it } from 'vitest'

import { getAtom, getTriple, pinThing } from '../src'

describe('Reads', () => {
  it('atom', async () => {
    const data = await getAtom('124862')
    expect(data?.label).toEqual('Uniswap')
  })

  it('triple', async () => {
    const data = await getTriple('54670')
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
