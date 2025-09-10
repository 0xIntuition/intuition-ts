import { parseEther, toHex, type Address } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import {
  createAtoms,
  deposit,
  eventParseDeposited,
  eventParseRedeemed,
  getAtomCost,
  multiCallIntuitionConfigs,
  redeem,
} from '../src'
import { ALICE } from './helpers/constants'
import { deployAndInit } from './helpers/deploy'
import { publicClient, walletClient } from './helpers/utils'

let address: Address

beforeEach(async () => {
  address = await deployAndInit()
})

describe('Atoms', () => {
  it('should read config', async () => {
    const config = await multiCallIntuitionConfigs({
      publicClient,
      address: address,
    })
    expect(config).toBeDefined()
  })
  it('should create new atom', async () => {
    const atomCost = await getAtomCost({
      publicClient,
      address: address,
    })
    const data = await createAtoms(
      { walletClient, publicClient, address },
      {
        args: [[toHex('intuition.systems')], [atomCost]],
        value: atomCost,
      },
    )
    const events = await eventParseDeposited(publicClient, data)
    expect(events[0].args.termId).toEqual(1n)
    expect(events[0].args.shares).toEqual(100000n)
  })

  it('should deposit in atom', async () => {
    const dataCreate = await createAtoms(
      { walletClient, publicClient, address },
      {
        args: [[toHex('intuition.systems')], [BigInt(1e18)]],
        value: BigInt(1e18),
      },
    )
    const eventCreate = await eventParseDeposited(publicClient, dataCreate)

    const dataDeposit = await deposit(
      { walletClient, publicClient, address },
      {
        args: [ALICE, eventCreate[0].args.termId, 1n, 0n],
        value: BigInt(1e18),
      },
    )
    const eventDeposit = await eventParseDeposited(publicClient, dataDeposit)
    expect(eventDeposit[0].args.termId).toEqual(1n)
    expect(eventDeposit[0].args.shares).toEqual(940500000000000000n)
  }, 60000)

  it('should redeem from atom', async () => {
    const dataCreate = await createAtoms(
      { walletClient, publicClient, address },
      {
        args: [[toHex('intuition.systems')], [BigInt(1e18)]],
        value: BigInt(1e18),
      },
    )
    const eventCreate = await eventParseDeposited(publicClient, dataCreate)

    const dataDeposit = await deposit(
      { walletClient, publicClient, address },
      {
        args: [ALICE, eventCreate[0].args.termId, 1n, 0n],
        value: BigInt(1e18),
      },
    )
    const eventDeposit = await eventParseDeposited(publicClient, dataDeposit)

    const dataRedeem = await redeem(
      { walletClient, publicClient, address },
      {
        args: [ALICE, eventDeposit[0].args.termId, 1n, BigInt(1e18), 0n],
      },
    )

    const eventRedeem = await eventParseRedeemed(publicClient, dataRedeem)

    expect(eventDeposit[0].args.termId).toEqual(1n)
    expect(eventRedeem[0].args.assets).toEqual(964615751879360387n)
    expect(eventRedeem[0].args.shares).toEqual(1000000000000000000n)
  }, 60000)
})
