import { Address } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import {
  createAtomFromIpfsUpload,
  createAtomFromIpfsUri,
  createEthereumAccount,
  createThing,
} from '../src'
import { deployAndInit } from './helpers/deploy'
import { publicClient, walletClient } from './helpers/utils'

let multivaultAddress: Address
beforeEach(async () => {
  multivaultAddress = await deployAndInit()
})

describe('Core', () => {
  it('should upload to IPFS and create Atom', async () => {
    const data = await createAtomFromIpfsUpload(
      {
        walletClient,
        publicClient,
        address: multivaultAddress,
        pinataApiJWT: String(process.env.PINATA_API_JWT),
      },
      {
        name: 'Product',
        description: 'A decentralized trust protocol',
        language: 'en',
        cost: '$100.00',
      },
    )
    expect(data.uri).toEqual(
      'ipfs://QmQ4hhBnpkvirs3ERfLE9ibw1r3cyZkttQRt2MDuWev82q',
    )
    expect(data.state.vaultId).toEqual(1n)
    expect(data.state.sharesForReceiver).toEqual(100000n)
  })

  it('should create an IPFS referenced Atom', async () => {
    const data = await createAtomFromIpfsUri(
      {
        walletClient,
        publicClient,
        address: multivaultAddress,
      },
      'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
    )
    expect(data.uri).toEqual(
      'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
    )
    expect(data.state.vaultId).toEqual(1n)
    expect(data.state.sharesForReceiver).toEqual(100000n)
  })

  it('should create a string Atom', async () => {
    const data = await createEthereumAccount(
      { walletClient, publicClient, address: multivaultAddress },
      {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      },
    )
    expect(data.uri).toEqual('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    expect(data.state.vaultId).toEqual(1n)
    expect(data.state.sharesForReceiver).toEqual(100000n)
  })

  it('should create ethereum account Atom', async () => {
    const data = await createEthereumAccount(
      { walletClient, publicClient, address: multivaultAddress },
      {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      },
    )
    expect(data.uri).toEqual('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    expect(data.state.vaultId).toEqual(1n)
    expect(data.state.sharesForReceiver).toEqual(100000n)
  })

  it('should create CAIP10 ethereum account Atom', async () => {
    const data = await createEthereumAccount(
      { walletClient, publicClient, address: multivaultAddress },
      {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        chainId: 1, // Mainnet
      },
    )
    expect(data.uri).toEqual(
      'caip10:eip155:1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    )
    expect(data.state.vaultId).toEqual(1n)
    expect(data.state.sharesForReceiver).toEqual(100000n)
  })

  it('should create Thing Atom', async () => {
    const data = await createThing(
      { walletClient, publicClient, address: multivaultAddress },
      {
        url: 'https://www.intuition.systems/',
        name: 'Intuition',
        description: 'A decentralized trust protocol',
        image: 'https://example.com/image.png',
      },
    )
    expect(data.uri).toEqual(
      'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
    )
    expect(data.state.vaultId).toEqual(1n)
    expect(data.state.sharesForReceiver).toEqual(100000n)
  })
})
