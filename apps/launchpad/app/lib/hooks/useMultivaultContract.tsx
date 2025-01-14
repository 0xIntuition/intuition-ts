import { multivaultAbi } from '@lib/abis/multivault'
import { getContract } from 'viem'
import { usePublicClient } from 'wagmi'

export const getMultivaultContractConfig = (contract?: string) => ({
  address:
    (contract as `0x${string}`) ||
    (`0xcA03acB834e2EA046189bD090A6005507A392341` as `0x${string}`),
  abi: multivaultAbi,
})

export function useMultivaultContract(contract?: string, chainId?: number) {
  const publicClient = usePublicClient({ chainId })

  if (!publicClient) {
    console.error('No publicClient found.')
    return null
  }

  return getContract({
    ...getMultivaultContractConfig(
      contract ||
        (`0xcA03acB834e2EA046189bD090A6005507A392341` as `0x${string}`),
    ),
    client: {
      public: publicClient,
    },
  })
}
