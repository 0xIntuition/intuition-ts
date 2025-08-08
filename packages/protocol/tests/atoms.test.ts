import { toHex, type Address } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import {
  createAtom,
  createAtomCalculateBaseCost,
  depositAtom,
  eventParseDeposited,
  eventParseRedeemed,
  redeemAtom,
} from '../src'
import { ALICE } from './helpers/constants'
import { deployAndInit } from './helpers/deploy'
import { publicClient, walletClient } from './helpers/utils'

let EthMultiVaultAddress: Address

beforeEach(async () => {
  EthMultiVaultAddress = await deployAndInit()
})

describe('Atoms', () => {
  it('should create new atom', async () => {
    const atomCost = await createAtomCalculateBaseCost({
      publicClient,
      address: EthMultiVaultAddress,
    })
    const data = await createAtom(
      { walletClient, publicClient, address: EthMultiVaultAddress },
      {
        args: [toHex('intuition.systems')],
        value: atomCost,
      },
    )
    const events = await eventParseDeposited(publicClient, data)
    expect(events[0].args.vaultId).toEqual(1n)
    expect(events[0].args.sharesForReceiver).toEqual(100000n)
  })

  it('should deposit in atom', async () => {
    const dataCreate = await createAtom(
      { walletClient, publicClient, address: EthMultiVaultAddress },
      {
        args: [toHex('intuition.systems')],
        value: BigInt(1e18),
      },
    )
    const eventCreate = await eventParseDeposited(publicClient, dataCreate)

    const dataDeposit = await depositAtom(
      { walletClient, publicClient, address: EthMultiVaultAddress },
      {
        args: [ALICE, eventCreate[0].args.vaultId],
        value: BigInt(1e18),
      },
    )
    const eventDeposit = await eventParseDeposited(publicClient, dataDeposit)
    expect(eventDeposit[0].args.vaultId).toEqual(1n)
    expect(eventDeposit[0].args.sharesForReceiver).toEqual(940500000000000000n)
  }, 60000)

  it('should redeem from atom', async () => {
    const dataCreate = await createAtom(
      { walletClient, publicClient, address: EthMultiVaultAddress },
      {
        args: [toHex('intuition.systems')],
        value: BigInt(1e18),
      },
    )
    const eventCreate = await eventParseDeposited(publicClient, dataCreate)

    const dataDeposit = await depositAtom(
      { walletClient, publicClient, address: EthMultiVaultAddress },
      {
        args: [ALICE, eventCreate[0].args.vaultId],
        value: BigInt(1e18),
      },
    )
    const eventDeposit = await eventParseDeposited(publicClient, dataDeposit)

    const dataRedeem = await redeemAtom(
      { walletClient, publicClient, address: EthMultiVaultAddress },
      {
        args: [BigInt(1e18), ALICE, eventDeposit[0].args.vaultId],
      },
    )

    const eventRedeem = await eventParseRedeemed(publicClient, dataRedeem)

    expect(eventDeposit[0].args.vaultId).toEqual(1n)
    expect(eventRedeem[0].args.assetsForReceiver).toEqual(964615751879360387n)
    expect(eventRedeem[0].args.sharesRedeemedBySender).toEqual(
      1000000000000000000n,
    )
  }, 60000)
})
