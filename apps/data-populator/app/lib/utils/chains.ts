import { Chain, http, Transport } from 'viem'
import { base, baseSepolia } from 'viem/chains'

// these will always be available in the browser as they're bundled
// we need to lock down the API KEY with the Origin URL and allowed domains
// const alchemyId = import.meta.env.VITE_ALCHEMY_API_KEY

const alchemyId =
  typeof window !== 'undefined'
    ? import.meta.env.VITE_ALCHEMY_API_KEY
    : process.env.ALCHEMY_API_KEY

const originUrl =
  typeof window !== 'undefined'
    ? import.meta.env.VITE_ORIGIN_URL
    : process.env.ORIGIN_URL

export const orderedChains = [
  84532, // baseSepolia
  8453, // base
]

const chainsList: { [key: number]: Chain } = {
  84532: baseSepolia,
  8453: base,
}

const multivaultContractsList: { [key: number]: `0x${string}` } = {
  84532: '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665' as `0x${string}`,
  8453: '0x430BbF52503Bd4801E51182f4cB9f8F534225DE5' as `0x${string}`,
}

const attestorContractsList: { [key: number]: `0x${string}` } = {
  84532: '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665' as `0x${string}`, // set to multivault b/c attestoor not working w/ triples
  8453: '0x430BbF52503Bd4801E51182f4cB9f8F534225DE5' as `0x${string}`,
}

const alchemyRpcUrlList: { [key: number]: string } = {
  84532: `https://base-sepolia.g.alchemy.com/v2/${alchemyId}`,
  8453: `https://base-mainnet.g.alchemy.com/v2/${alchemyId}`,
}

const transportsList: { [key: number]: Transport } = {
  84532: http(alchemyRpcUrlList[84532], {
    fetchOptions: {
      headers: {
        Origin: originUrl,
      },
    },
  }),
  8453: http(alchemyRpcUrlList[8453], {
    fetchOptions: {
      headers: {
        Origin: originUrl,
      },
    },
  }),
}

export const chainsMap = (chainId: number) => chainsList[chainId]
export const transportsMap = (chainId: number) => transportsList[chainId]
export const multivaultContractsMap = (chainId: number) =>
  multivaultContractsList[chainId]
export const alchemyRpcUrlMap = (chainId: number) => alchemyRpcUrlList[chainId]
export const attestorContractsMap = (chainId: number) =>
  attestorContractsList[chainId]
export const getExplorerUrl = (chainId: number) =>
  chainsMap(chainId)?.blockExplorers?.etherscan?.url ||
  chainsMap(chainId)?.blockExplorers?.default?.url
