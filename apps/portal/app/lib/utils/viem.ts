import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const mainnetClient = createPublicClient({
  batch: {
    multicall: true,
  }, //adding this incase we ever need to support multicall on mainnet
  chain: mainnet,
  transport: http(process.env.ALCHEMY_MAINNET_RPC_URL),
})
