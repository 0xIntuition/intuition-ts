import { multivaultAbi } from '@lib/abis/multivault'
import { CURRENT_ENV, MULTIVAULT_CONTRACT_ADDRESS } from 'app/consts'
import {
  createPublicClient,
  getContract,
  http,
  PublicClient,
  type Abi,
} from 'viem'
import { base, baseSepolia } from 'viem/chains'

export const publicClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: CURRENT_ENV === 'development' ? baseSepolia : base,
  transport: http(
    CURRENT_ENV === 'development'
      ? process.env.ALCHEMY_BASE_SEPOLIA_RPC_URL
      : process.env.ALCHEMY_BASE_RPC_URL,
    {
      fetchOptions: {
        headers: {
          Origin: process.env.ORIGIN_URL,
        },
      },
    },
  ),
}) as PublicClient

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
