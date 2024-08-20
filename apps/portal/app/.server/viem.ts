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

const getOriginByEnvironment = ({
  env,
}: {
  env: 'development' | 'staging' | 'production'
}) => {
  switch (env) {
    case 'staging':
      return process.env.STAGING_ORIGIN_URL
    case 'production':
      return process.env.PRODUCTION_ORIGIN_URL
    default:
      return process.env.STAGING_ORIGIN_URL
  }
}

export const publicClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain:
    CURRENT_ENV === 'development' || CURRENT_ENV === 'staging'
      ? baseSepolia
      : base,
  transport: http(
    CURRENT_ENV === 'development' || CURRENT_ENV === 'staging'
      ? process.env.ALCHEMY_BASE_SEPOLIA_RPC_URL
      : process.env.ALCHEMY_BASE_RPC_URL,
    {
      fetchOptions: {
        headers: {
          Origin: getOriginByEnvironment(CURRENT_ENV),
        },
      },
    },
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
