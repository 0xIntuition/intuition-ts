import { createPool, createProxy } from '@viem/anvil'
import { Address, toHex } from 'viem'
import { afterAll, beforeAll, describe, it } from 'vitest'

import { createAtom } from '../src/create-atom'
import { deployAndInit } from './helpers/deploy'
import { publicClient, walletClient } from './helpers/utils'

let multivaultAddress: Address
const server = await createProxy({
  pool: createPool(),
})

beforeAll(async () => {
  //   server.listen(8545, '::', () => {
  //     console.log('Proxy server listening on http://0.0.0.0:8545')
  //   })
  multivaultAddress = await deployAndInit()
})

afterAll(async () => {
  await server.close()
})

describe('Atoms', () => {
  it('create atom', async () => {
    const balance = await publicClient.getBalance({
      address: walletClient.account.address,
    })
    console.log(balance, 'balancebalance')
    const data = await createAtom(
      { walletClient, address: multivaultAddress },
      [toHex('intuition.systems')],
      //   parseEther('0.1'),
    )
    // expect(data).toEqual(
    //   'ipfs://bafkreib7534cszxn2c6qwoviv43sqh244yfrxomjbealjdwntd6a7atq6u',
    // )
  })
})
