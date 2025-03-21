import { type Address } from 'viem'

import { RELIC_CONTRACT_ADDRESS } from '../consts'
import { relicsAbi } from '../lib/abis/relics'
import { mainnetClient } from './viem'

export async function getRelicCount(wallet: Address) {
  const relicCount = (await mainnetClient.readContract({
    address: RELIC_CONTRACT_ADDRESS,
    abi: relicsAbi,
    functionName: 'balanceOf',
    args: [wallet],
  })) as number

  return relicCount
}
