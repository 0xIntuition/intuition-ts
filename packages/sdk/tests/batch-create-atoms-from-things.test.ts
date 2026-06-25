import type { WriteConfig } from '@0xintuition/protocol'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { batchCreateAtomsFromThings } from '../src'

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

const thingVariables = [
  {
    url: 'https://www.intuition.systems/one',
    name: 'Intuition One',
    description: 'A decentralized trust protocol',
    image: 'https://example.com/image-one.png',
  },
  {
    url: 'https://www.intuition.systems/two',
    name: 'Intuition Two',
    description: 'A decentralized trust protocol',
    image: 'https://example.com/image-two.png',
  },
]

describe('batchCreateAtomsFromThings', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('includes item context when a batch pin fails', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            data: { pinThing: { uri: 'ipfs://bafk-first' } },
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ errors: [{ message: 'pin failed' }] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      )

    vi.stubGlobal('fetch', fetchMock)

    await expect(
      batchCreateAtomsFromThings(writeConfig, thingVariables, {
        pinApiKey: 'test-pin-key',
      }),
    ).rejects.toThrow('Failed to pin item 2 of 2: pin failed')
  })

  it('throws a clear error when no AtomCreated events are parsed', async () => {
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
      batchCreateAtomsFromThings(writeConfig, thingVariables, {
        pinApiKey: 'test-pin-key',
      }),
    ).rejects.toThrow(
      'No AtomCreated events found for transaction 0x0000000000000000000000000000000000000000000000000000000000000001',
    )
  })
})
