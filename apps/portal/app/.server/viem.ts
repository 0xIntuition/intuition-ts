import process from 'process'

import { multivaultAbi } from '@lib/abis/multivault'
import { CURRENT_ENV, MULTIVAULT_CONTRACT_ADDRESS } from 'app/consts'
import {
  createPublicClient,
  getContract,
  http,
  PublicClient,
  type Abi,
} from 'viem'
import { base, baseSepolia, mainnet } from 'viem/chains'

export const publicClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: CURRENT_ENV === 'development' ? baseSepolia : base,
  transport: http(
    CURRENT_ENV === 'development'
      ? process.env.ALCHEMY_BASE_SEPOLIA_RPC_URL
      : process.env.ALCHEMY_BASE_RPC_URL,
    // {
    //   fetchOptions: {
    //     headers: {
    //       Origin:
    //         CURRENT_ENV === 'production'
    //           ? process.env.PRODUCTION_ORIGIN_URL!
    //           : process.env.STAGING_ORIGIN_URL!,
    //     },
    //   },
    // }, // TODO: we need to add this back in for hardening - revisit in [ENG-3508]
  ),
}) as PublicClient

export const mainnetClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: mainnet,
  transport: http(process.env.ALCHEMY_MAINNET_RPC_URL),
})

export const getMultivaultContract = getContract({
  address: MULTIVAULT_CONTRACT_ADDRESS as `0x${string}`,
  abi: multivaultAbi as Abi,
  client: {
    public: publicClient,
  },
})

export const createMultiVaultContract = (contractAddress: string) =>
  ({
    address: contractAddress as `0x${string}`,
    abi: multivaultAbi as Abi,
  }) as const

export const multiVaultContract = {
  address: MULTIVAULT_CONTRACT_ADDRESS as `0x${string}`,
  abi: multivaultAbi as Abi,
} as const

export const getEnsName = async (address: `0x${string}`) => {
  return await mainnetClient.getEnsName({ address })
}
