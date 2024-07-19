import { chainalysisOracleAbi } from '@lib/abis/chainalysisOracle'
import { mainnetClient } from '@server/viem'
import { Address } from 'viem'

export async function isSanctioned(wallet: Address) {
  const walletIsSanctioned = (await mainnetClient.readContract({
    address: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb',
    abi: chainalysisOracleAbi,
    functionName: 'isSanctioned',
    args: [wallet],
  })) as Promise<boolean>
  return walletIsSanctioned
}
