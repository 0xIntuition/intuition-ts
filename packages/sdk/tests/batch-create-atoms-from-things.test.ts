import {
  eventParseAtomCreated,
  multiVaultCreateAtoms,
  type WriteConfig,
} from '@0xintuition/protocol'

import { toHex } from 'viem'
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

const txHash =
  '0x0000000000000000000000000000000000000000000000000000000000000001'

const firstAtomCreatedArgs = {
  creator: '0x0000000000000000000000000000000000000002',
  termId: '0x0000000000000000000000000000000000000000000000000000000000000003',
  atomData: '0x1234',
  atomWallet: '0x0000000000000000000000000000000000000004',
} as const

const secondAtomCreatedArgs = {
  creator: '0x0000000000000000000000000000000000000005',
  termId: '0x0000000000000000000000000000000000000000000000000000000000000006',
  atomData: '0x5678',
  atomWallet: '0x0000000000000000000000000000000000000007',
} as const

function pinThingResponse(uri: string) {
  return new Response(
    JSON.stringify({
      data: { pinThing: { uri } },
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

describe('batchCreateAtomsFromThings', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('pins each thing, creates atoms in batch, and returns the created event states', async () => {
    const uris = ['ipfs://bafk-first', 'ipfs://bafk-second']
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(pinThingResponse(uris[0]))
      .mockResolvedValueOnce(pinThingResponse(uris[1]))

    vi.stubGlobal('fetch', fetchMock)
    vi.mocked(eventParseAtomCreated).mockResolvedValueOnce([
      { args: firstAtomCreatedArgs },
      { args: secondAtomCreatedArgs },
    ] as unknown as Awaited<ReturnType<typeof eventParseAtomCreated>>)

    const result = await batchCreateAtomsFromThings(
      writeConfig,
      thingVariables,
      {
        pinApiKey: 'test-pin-key',
      },
    )

    expect(result).toEqual({
      uris,
      state: [firstAtomCreatedArgs, secondAtomCreatedArgs],
      transactionHash: txHash,
    })
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(multiVaultCreateAtoms).toHaveBeenCalledWith(writeConfig, {
      args: [uris.map((uri) => toHex(uri)), [1n, 1n]],
      value: 2n,
    })
  })

  it('includes item context when a batch pin fails', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(pinThingResponse('ipfs://bafk-first'))
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
    const fetchMock = vi.fn(async () => pinThingResponse('ipfs://bafk-test'))

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
