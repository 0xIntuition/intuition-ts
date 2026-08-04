import {
  eventParseDeposited,
  multiVaultDeposit,
  type DepositInputs,
  type WriteConfig,
} from '@0xintuition/protocol'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { deposit } from '../src/core/deposit'

vi.mock('@0xintuition/protocol', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@0xintuition/protocol')>()

  return {
    ...actual,
    eventParseDeposited: vi.fn(async () => []),
    multiVaultDeposit: vi.fn(
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
  '0x0000000000000000000000000000000000000000000000000000000000000003',
  1n,
  0n,
] as const satisfies DepositInputs['args']

describe('deposit', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('forwards the payable value to the protocol deposit request', async () => {
    const value = 42n

    await deposit(writeConfig, { args, value })

    expect(multiVaultDeposit).toHaveBeenCalledWith(writeConfig, {
      args,
      value,
    })
    expect(eventParseDeposited).toHaveBeenCalledTimes(1)
  })

  it('forwards an explicit zero value', async () => {
    await deposit(writeConfig, { args, value: 0n })

    expect(multiVaultDeposit).toHaveBeenCalledWith(writeConfig, {
      args,
      value: 0n,
    })
  })

  it('sends no value when the payable input omits it', async () => {
    await deposit(writeConfig, { args })

    expect(multiVaultDeposit).toHaveBeenCalledWith(writeConfig, { args })
  })

  it('keeps bare deposit args backward compatible without sending value', async () => {
    await deposit(writeConfig, args)

    expect(multiVaultDeposit).toHaveBeenCalledWith(writeConfig, { args })
  })
})
