import {
  eventParseDeposited,
  multiVaultDepositBatch,
  type DepositBatchInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { batchDeposit } from '../src/core/batch-deposit'

vi.mock('@0xintuition/protocol', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@0xintuition/protocol')>()

  return {
    ...actual,
    eventParseDeposited: vi.fn(async () => []),
    multiVaultDepositBatch: vi.fn(
      async () =>
        '0x0000000000000000000000000000000000000000000000000000000000000001',
    ),
  }
})

const writeConfig = {
  address: '0x0000000000000000000000000000000000000001',
  publicClient: {},
  walletClient: {},
} as WriteConfig

const args = [
  '0x0000000000000000000000000000000000000002',
  [
    '0x0000000000000000000000000000000000000000000000000000000000000003',
    '0x0000000000000000000000000000000000000000000000000000000000000004',
  ],
  [1n, 2n],
  [11n, 29n],
  [0n, 0n],
] as const satisfies DepositBatchInputs['args']

describe('batchDeposit', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('forwards the assets-derived value 40n', async () => {
    await batchDeposit(writeConfig, args)

    expect(multiVaultDepositBatch).toHaveBeenCalledWith(writeConfig, {
      args,
      value: 40n,
    })
    expect(eventParseDeposited).toHaveBeenCalledTimes(1)
  })
})
