import type { Address } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import {
  createAtomFromEthereumAccount,
  createAtomFromIpfsUpload,
  createAtomFromIpfsUri,
  createAtomFromSmartContract,
  createAtomFromString,
  createAtomFromThing,
  createTripleStatement,
  getTripleCost,
} from '../src'
import { deployAndInit } from './helpers/deploy'
import { publicClient, walletClient } from './helpers/utils'

let address: Address
beforeEach(async () => {
  address = await deployAndInit()
})

describe('Triple', () => {
  it('should create a Triple', async () => {
    const atom1 = await createAtomFromString(
      { walletClient, publicClient, address },
      'atom1',
    )
    const atom2 = await createAtomFromString(
      { walletClient, publicClient, address },
      'atom2',
    )
    const atom3 = await createAtomFromString(
      { walletClient, publicClient, address },
      'atom3',
    )

    const assets = await getTripleCost({ publicClient, address })

    const triple = await createTripleStatement(
      { walletClient, publicClient, address },
      {
        args: [[atom1.state.termId], [atom2.state.termId], [atom3.state.termId], [assets]],
        value: assets
      },
    )

    expect(triple.state[0].args.termId).toEqual(4n)
  })
})

describe('Atoms', () => {
  it('should upload to IPFS and create Atom', async () => {
    const data = await createAtomFromIpfsUpload(
      {
        walletClient,
        publicClient,
        address: address,
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
    expect(data.state.termId).toEqual(1n)
    expect(data.state.shares).toEqual(100000n)
  })

  it('should create an IPFS referenced Atom', async () => {
    const data = await createAtomFromIpfsUri(
      {
        walletClient,
        publicClient,
        address: address,
      },
      'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
    )
    expect(data.uri).toEqual(
      'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
    )
    expect(data.state.termId).toEqual(1n)
  })

  it('should create a string Atom', async () => {
    const data = await createAtomFromString(
      { walletClient, publicClient, address: address },
      'This is a test string atom',
    )
    expect(data.uri).toEqual('This is a test string atom')
    expect(data.state.termId).toEqual(1n)
  })

  it('should create ethereum account Atom', async () => {
    const data = await createAtomFromEthereumAccount(
      { walletClient, publicClient, address: address },
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    )
    expect(data.uri).toEqual('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    expect(data.state.termId).toEqual(1n)
  })

  it('should create CAIP10 ethereum account Atom', async () => {
    const data = await createAtomFromSmartContract(
      { walletClient, publicClient, address: address },
      {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        chainId: 1, // Mainnet
      },
    )
    expect(data.uri).toEqual(
      'caip10:eip155:1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    )
    expect(data.state.termId).toEqual(1n)
  })

  it('should create Thing Atom', async () => {
    const data = await createAtomFromThing(
      { walletClient, publicClient, address: address },
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
    expect(data.state.termId).toEqual(1n)
  })
})
