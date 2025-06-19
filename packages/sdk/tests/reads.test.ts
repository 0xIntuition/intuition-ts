import { describe, expect, it } from 'vitest'

import { getAtom } from '../src/get-atom'
import { getTriple } from '../src/get-triple'

describe('Read', () => {
  it('atom', async () => {
    const data = await getAtom('124862')
    expect(data?.label).toEqual('Uniswap')
  })

  it('triple', async () => {
    const data = await getTriple('54670')
    expect(data?.object.label).toEqual('Intuition')
  }, 6000000)
})
