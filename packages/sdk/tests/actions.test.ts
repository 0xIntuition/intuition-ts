import { Address, toHex } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import {
  createEthereumAccount,
  createThing,
  depositAtom,
  eventParseRedeemAtomTransaction,
  redeemAtom,
} from '../src'
import { createAtom } from '../src/chain/create-atom'
import { eventParseDepositAtomTransaction } from '../src/events/event-parse-deposit-atom-transaction'
import { ALICE } from './helpers/constants'
import { deployAndInit } from './helpers/deploy'
import { publicClient, walletClient } from './helpers/utils'

// TODO: Use @viem/anvil to setup a local anvil node

let multivaultAddress: Address
beforeEach(async () => {
  multivaultAddress = await deployAndInit()
})

describe('Core', () => {
  it('should create thing', async () => {
    const data = await createThing(
      { walletClient, publicClient, address: multivaultAddress },
      {
        url: 'https://www.intuition.systems/',
        name: 'Intuition',
        description: 'A decentralized trust protocol',
        image: 'https://example.com/image.png',
      },
      BigInt(1e18),
    )
    expect(data.uri).toEqual(
      'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
    )
    expect(data.state.vaultId).toEqual(1n)
    expect(data.state.sharesForReceiver).toEqual(989940600000001000n)
  }, 70000)

  it('should create ethereum account', async () => {
    const data = await createEthereumAccount(
      { walletClient, publicClient, address: multivaultAddress },
      {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        chainId: 1, // Mainnet
      },
      BigInt(1e18),
    )
    expect(data.uri).toEqual(
      'eip155:1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    )
    expect(data.state.vaultId).toEqual(1n)
    expect(data.state.sharesForReceiver).toEqual(989940600000001000n)
  }, 70000)
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
