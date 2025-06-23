
import { Address } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import { createEthereumAccount, createThing } from '../src'
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
