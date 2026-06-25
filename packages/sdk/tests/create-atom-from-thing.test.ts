import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'
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

const txHash =
  '0x0000000000000000000000000000000000000000000000000000000000000001'

const atomCreatedArgs = {
  creator: '0x0000000000000000000000000000000000000002',
  termId: '0x0000000000000000000000000000000000000000000000000000000000000003',
  atomData: '0x1234',
  atomWallet: '0x0000000000000000000000000000000000000004',
} as const

function mockPinThingFetch(uri: string) {
  const fetchMock = vi.fn(async () => {
    return new Response(
      JSON.stringify({
        data: { pinThing: { uri } },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  })

  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}

describe('createAtomFromThing', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('pins thing data, creates an atom, and returns the created event state', async () => {
    const uri = 'ipfs://bafk-test'
    const fetchMock = mockPinThingFetch(uri)
    vi.mocked(eventParseAtomCreated).mockResolvedValueOnce([
      { args: atomCreatedArgs },
    ] as unknown as Awaited<ReturnType<typeof eventParseAtomCreated>>)

    const result = await createAtomFromThing(writeConfig, thingVariables, {
      pinApiKey: 'test-pin-key',
    })

    expect(result).toEqual({
      uri,
      transactionHash: txHash,
      state: atomCreatedArgs,
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(multiVaultCreateAtoms).toHaveBeenCalledWith(writeConfig, {
      args: [[toHex(uri)], [1n]],
      value: 1n,
    })
  })

  it('throws a clear error when no AtomCreated event is parsed', async () => {
    mockPinThingFetch('ipfs://bafk-test')

    await expect(
      createAtomFromThing(writeConfig, thingVariables, {
        pinApiKey: 'test-pin-key',
      }),
    ).rejects.toThrow(
      'No AtomCreated event found for transaction 0x0000000000000000000000000000000000000000000000000000000000000001',
    )
  })
})
