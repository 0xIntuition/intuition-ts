import { Address, toHex } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import {
  createAtom,
  depositAtom,
  eventParseDepositAtomTransaction,
  eventParseRedeemAtomTransaction,
  redeemAtom,
} from '../src'
import { ALICE } from './helpers/constants'
import { deployAndInit } from './helpers/deploy'
import { publicClient, walletClient } from './helpers/utils'

// TODO: Use @viem/anvil to setup a local anvil node

let multivaultAddress: Address
beforeEach(async () => {
  multivaultAddress = await deployAndInit()
})

describe('Atoms', () => {
  it('should create new atom', async () => {
    const data = await createAtom(
      { walletClient, publicClient, address: multivaultAddress },
      {
        args: [toHex('intuition.systems')],
        value: BigInt(1e18),
      },
    )
    const events = await eventParseDepositAtomTransaction(publicClient, data)
    expect(events.vaultId).toEqual(1n)
    expect(events.sharesForReceiver).toEqual(989940600000001000n)
  })

  it('should deposit in atom', async () => {
    const dataCreate = await createAtom(
      { walletClient, publicClient, address: multivaultAddress },
      {
        args: [toHex('intuition.systems')],
        value: BigInt(1e18),
      },
    )
    const eventCreate = await eventParseDepositAtomTransaction(
      publicClient,
      dataCreate,
    )

    const dataDeposit = await depositAtom(
      { walletClient, publicClient, address: multivaultAddress },
      {
        args: [ALICE, eventCreate.vaultId],
        value: BigInt(1e18),
      },
    )
    const eventDeposit = await eventParseDepositAtomTransaction(
      publicClient,
      dataDeposit,
    )
    expect(eventDeposit.vaultId).toEqual(1n)
    expect(eventDeposit.sharesForReceiver).toEqual(940500000000000000n)
  }, 60000)

  it('should redeem from atom', async () => {
    const dataCreate = await createAtom(
      { walletClient, publicClient, address: multivaultAddress },
      {
        args: [toHex('intuition.systems')],
        value: BigInt(1e18),
      },
    )
    const eventCreate = await eventParseDepositAtomTransaction(
      publicClient,
      dataCreate,
    )

    const dataDeposit = await depositAtom(
      { walletClient, publicClient, address: multivaultAddress },
      {
        args: [ALICE, eventCreate.vaultId],
        value: BigInt(1e18),
      },
    )
    const eventDeposit = await eventParseDepositAtomTransaction(
      publicClient,
      dataDeposit,
    )

    const dataRedeem = await redeemAtom(
      { walletClient, publicClient, address: multivaultAddress },
      {
        args: [BigInt(1e18), ALICE, eventDeposit.vaultId],
      },
    )

    const eventRedeem = await eventParseRedeemAtomTransaction(
      publicClient,
      dataRedeem,
    )

    expect(eventDeposit.vaultId).toEqual(1n)
    expect(eventRedeem.assetsForReceiver).toEqual(964615751879360387n)
    expect(eventRedeem.sharesRedeemedBySender).toEqual(1000000000000000000n)
  }, 60000)
})
