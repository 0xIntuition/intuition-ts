import {
  eventParseTripleCreated,
  multiVaultCreateTriples,
  multiVaultGetTripleCost,
  type CreateTriplesInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

import { parseEther } from 'viem'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { batchCreateTripleStatements } from '../src/core/batch-create-triple-statements'

vi.mock('@0xintuition/protocol', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@0xintuition/protocol')>()

  return {
    ...actual,
    eventParseTripleCreated: vi.fn(async () => []),
    multiVaultCreateTriples: vi.fn(
      async () =>
        '0x0000000000000000000000000000000000000000000000000000000000000001',
    ),
    multiVaultGetTripleCost: vi.fn(async () => parseEther('0.01')),
  }
})

const writeConfig = {
  address: '0x0000000000000000000000000000000000000001',
  publicClient: {},
  walletClient: {},
} as WriteConfig

const value1 = parseEther('100')
const value2 = parseEther('150')
const args = [
  [
    '0x0000000000000000000000000000000000000000000000000000000000000002',
    '0x0000000000000000000000000000000000000000000000000000000000000003',
  ],
  [
    '0x0000000000000000000000000000000000000000000000000000000000000004',
    '0x0000000000000000000000000000000000000000000000000000000000000005',
  ],
  [
    '0x0000000000000000000000000000000000000000000000000000000000000006',
    '0x0000000000000000000000000000000000000000000000000000000000000007',
  ],
  [value1, value2],
] as const satisfies CreateTriplesInputs['args']

describe('batchCreateTripleStatements', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('forwards the summed assets value 250000000000000000000n', async () => {
    await batchCreateTripleStatements(writeConfig, args)

    expect(multiVaultCreateTriples).toHaveBeenCalledWith(writeConfig, {
      args,
      value: parseEther('250'),
    })
    expect(multiVaultGetTripleCost).not.toHaveBeenCalled()
    expect(eventParseTripleCreated).toHaveBeenCalledTimes(1)
  })

  it('keeps accepting the legacy deposit amount without double-counting it', async () => {
    await batchCreateTripleStatements(writeConfig, args, parseEther('999'))

    expect(multiVaultCreateTriples).toHaveBeenCalledWith(writeConfig, {
      args,
      value: parseEther('250'),
    })
  })

  it('warns once for nonzero legacy deposit amounts and stays silent otherwise', async () => {
    // A fresh module makes the once-guard deterministic regardless of prior tests.
    vi.resetModules()
    const { multiVaultCreateTriples: freshMultiVaultCreateTriples } =
      await import('@0xintuition/protocol')
    const { batchCreateTripleStatements: freshBatchCreateTripleStatements } =
      await import('../src/core/batch-create-triple-statements')
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const warningCallCounts: number[] = []

    await freshBatchCreateTripleStatements(writeConfig, args)
    warningCallCounts.push(warnSpy.mock.calls.length)

    await freshBatchCreateTripleStatements(writeConfig, args, 0n)
    warningCallCounts.push(warnSpy.mock.calls.length)

    await freshBatchCreateTripleStatements(writeConfig, args, parseEther('999'))
    warningCallCounts.push(warnSpy.mock.calls.length)

    await freshBatchCreateTripleStatements(
      writeConfig,
      args,
      parseEther('1000'),
    )
    warningCallCounts.push(warnSpy.mock.calls.length)

    expect(freshMultiVaultCreateTriples).toHaveBeenCalledTimes(4)
    for (let call = 1; call <= 4; call += 1) {
      expect(freshMultiVaultCreateTriples).toHaveBeenNthCalledWith(
        call,
        writeConfig,
        {
          args,
          value: parseEther('250'),
        },
      )
    }
    expect(warningCallCounts).toEqual([0, 0, 1, 1])
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringMatching(/deprecated.*ignored/i),
    )
  })
})
