import type { Address } from 'viem'
import { beforeAll, describe, expect, it } from 'vitest'

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
beforeAll(async () => {
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
        args: [
          [atom1.state.termId],
          [atom2.state.termId],
          [atom3.state.termId],
          [assets],
        ],
        value: assets,
      },
    )

    expect(triple.state[0].args.termId).toEqual(
      '0xe8e94bfafd526baff28dfb8eb2bd5a6190924b5a87d897025f91503ea768c0fa',
    )
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
    expect(data.state.termId).toEqual(
      '0xe90d87170d15cd1dc34932b535f2864776ec795bb63528330e9f1a1f59b16fc6',
    )
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
    expect(data.state.termId).toEqual(
      '0xe577edea16b07b063d70514baa7b4055f91d0639dbc680a7bf5c162b21ab30c2',
    )
  })

  it('should create a string Atom', async () => {
    const data = await createAtomFromString(
      { walletClient, publicClient, address: address },
      'This is a test string atom',
    )
    expect(data.uri).toEqual('This is a test string atom')
    expect(data.state.termId).toEqual(
      '0xc46f79cd4acd683c597ed8f7a72212aa3c6b25d54586da7eb3177ca6a9a5bbb8',
    )
  })

  it('should create ethereum account Atom', async () => {
    const data = await createAtomFromEthereumAccount(
      { walletClient, publicClient, address: address },
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    )
    expect(data.uri).toEqual('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    expect(data.state.termId).toEqual(
      '0x1e1424ab9612aff0e8fd41ee0d78f525ad6963610bd017d18f96d2a37cdf402a',
    )
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
    expect(data.state.termId).toEqual(
      '0x457d61fc585eeebc6a1ada616261ac5fd95822346c664423507fdd310d2cff23',
    )
  })

  it('should create Thing Atom', async () => {
    const data = await createAtomFromThing(
      { walletClient, publicClient, address: address },
      {
        url: 'https://www.intuition.systems/',
        name: 'Intuition2',
        description: 'A decentralized trust protocol',
        image: 'https://example.com/image.png',
      },
    )
    expect(data.uri).toEqual(
      'ipfs://bafkreif73fpm7kvp2am3diuajnpslnhitefwcuwz6ip2zeklco3ye2bdlu',
    )
    expect(data.state.termId).toEqual(
      '0x131e2e1fe9ca4390022023b21706ae064a85a432f51c1bbca5f0e28f6edb7462',
    )
  })
})
