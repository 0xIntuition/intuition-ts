import type { WriteConfig } from '@0xintuition/protocol'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { createAtomFromThing } from '../src'

vi.mock('@0xintuition/protocol', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@0xintuition/protocol')>()

  return {
    ...actual,
    eventParseAtomCreated: vi.fn(async () => []),
    multiVaultCreateAtoms: vi.fn(
      async () =>
        '0x0000000000000000000000000000000000000000000000000000000000000001',
    ),
    multiVaultGetAtomCost: vi.fn(async () => 1n),
  }
})

const writeConfig = {
  address: '0x0000000000000000000000000000000000000001',
  publicClient: {},
  walletClient: {},
} as WriteConfig

const thingVariables = {
  url: 'https://www.intuition.systems/',
  name: 'Intuition',
  description: 'A decentralized trust protocol',
  image: 'https://example.com/image.png',
}

describe('createAtomFromThing', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('throws a clear error when no AtomCreated event is parsed', async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          data: { pinThing: { uri: 'ipfs://bafk-test' } },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    })

    vi.stubGlobal('fetch', fetchMock)

    await expect(
      createAtomFromThing(writeConfig, thingVariables, {
        pinApiKey: 'test-pin-key',
      }),
    ).rejects.toThrow(
      'No AtomCreated event found for transaction 0x0000000000000000000000000000000000000000000000000000000000000001',
    )
  })
})
