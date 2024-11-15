import { chainlinkEthUsdOracleAbi } from '@lib/abis/chainlinkEthUsdOracle'
import { mainnetClient } from '@server/viem'
import { formatUnits } from 'viem'

export async function getEthPrice() {
  const ethPrice = (await mainnetClient.readContract({
    address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    abi: chainlinkEthUsdOracleAbi,
    functionName: 'latestAnswer',
  })) as Promise<string>
  return formatUnits(BigInt(await ethPrice), 8)
}
