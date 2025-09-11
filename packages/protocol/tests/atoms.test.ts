import { toHex, type Address } from 'viem'
import { beforeAll, describe, expect, it } from 'vitest'

import {
  createAtoms,
  deposit,
  eventParseDeposited,
  eventParseRedeemed,
  getAtomCost,
  multiCallIntuitionConfigs,
  redeem,
} from '../src'
import { CAROL } from './helpers/constants'
import { deployAndInit } from './helpers/deploy'
import { publicClient, userWalletClient as walletClient } from './helpers/utils'

let address: Address

beforeAll(async () => {
  address = await deployAndInit()
}, 360000) // 60 second timeout for deployment

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
        args: [[toHex('first')], [atomCost]],
        value: atomCost,
      },
    )
    const events = await eventParseDeposited(publicClient, data)
    expect(events[0].args.termId).toEqual(
      '0x692e3fbb06193c3a65b6ccb60c9ec6fb32af21c16d3f6ac10039258c2a5d4d2d',
    )
    expect(events[0].args.shares).toEqual(0n)
  })

  it('should deposit in atom', async () => {
    const dataCreate = await createAtoms(
      { walletClient, publicClient, address },
      {
        args: [[toHex('second')], [BigInt(1e18)]],
        value: BigInt(1e18),
      },
    )
    const eventCreate = await eventParseDeposited(publicClient, dataCreate)

    const dataDeposit = await deposit(
      { walletClient, publicClient, address },
      {
        args: [CAROL, eventCreate[0].args.termId, 1n, 0n],
        value: BigInt(1e18),
      },
    )
    const eventDeposit = await eventParseDeposited(publicClient, dataDeposit)
    expect(eventDeposit[0].args.termId).toEqual(
      '0x45318970bfff215a328f56895f3a97d4f276a44c24c135c12c37867a1f667b8a',
    )
    expect(eventDeposit[0].args.shares).toEqual(882551020408211731n)
  }, 60000)

  it('should redeem from atom', async () => {
    const dataCreate = await createAtoms(
      { walletClient, publicClient, address },
      {
        args: [[toHex('third')], [BigInt(1e18)]],
        value: BigInt(1e18),
      },
    )
    const eventCreate = await eventParseDeposited(publicClient, dataCreate)

    const dataDeposit = await deposit(
      { walletClient, publicClient, address },
      {
        args: [CAROL, eventCreate[0].args.termId, 1n, 0n],
        value: BigInt(1e18),
      },
    )
    const eventDeposit = await eventParseDeposited(publicClient, dataDeposit)

    const dataRedeem = await redeem(
      { walletClient, publicClient, address },
      {
        args: [CAROL, eventDeposit[0].args.termId, 1n, BigInt(1e18), 0n],
      },
    )

    const eventRedeem = await eventParseRedeemed(publicClient, dataRedeem)

    expect(eventDeposit[0].args.termId).toEqual(
      '0xb4bcbe03ecedd13c604440a26cbdbc28cb7eea7fb31af3efe0e73d501c738c34',
    )
    expect(eventRedeem[0].args.assets).toEqual(1081363032296081014n)
    expect(eventRedeem[0].args.shares).toEqual(1000000000000000000n)
  }, 60000)
})
