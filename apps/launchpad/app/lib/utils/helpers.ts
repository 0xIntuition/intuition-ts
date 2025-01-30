import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL } from '@consts/general'
import { AtomType } from 'app/types/atom'
import { extractChain } from 'viem'
import * as chains from 'viem/chains'

// atom GQL helpers
export const getAtomImage = (atom: AtomType | null | undefined) => {
  if (!atom) {
    return ''
  }
  return (
    atom?.image ??
    atom?.value?.person?.image ??
    atom?.value?.thing?.image ??
    atom?.value?.organization?.image ??
    ''
  )
}

export const getAtomLabel = (atom: AtomType | null | undefined) => {
  if (!atom) {
    return '?'
  }
  return (
    atom.label ??
    atom.value?.person?.name ??
    atom.value?.thing?.name ??
    atom.value?.organization?.name ??
    atom.wallet_id ??
    atom.id ??
    ''
  )
}

export const getAtomDescription = (atom: AtomType | null | undefined) => {
  return (
    atom?.value?.person?.description ??
    atom?.value?.thing?.description ??
    atom?.value?.organization?.description ??
    ''
  )
}

export const getAtomIpfsLink = (atom: AtomType | null | undefined) => {
  if (!atom) {
    return ''
  }
  if (atom.type === ('Account' || 'Default')) {
    return `${BLOCK_EXPLORER_URL}/address/${atom.wallet_id}`
  }
  if (atom.data?.startsWith('https')) {
    return atom.data
  }
  if (atom.label?.startsWith('caip10')) {
    const parts = atom.label.split(':')
    const chainId = Number(parts[2])
    const address = parts[3]
    const chain = extractChain({
      chains: Object.values(chains),
      // @ts-ignore Ignoring type since viem doesn't provide proper typings for chain IDs
      id: chainId,
    })
    return chain?.blockExplorers?.default
      ? `${chain.blockExplorers.default.url}/address/${address}`
      : ''
  }
  return `${IPFS_GATEWAY_URL}/${atom.data?.replace('ipfs://', '')}`
  return ''
}

export const getAtomLink = (atom: AtomType | null | undefined) => {
  return (
    atom?.value?.person?.url ??
    atom?.value?.thing?.url ??
    atom?.value?.organization?.url ??
    ''
  )
}

export const getAtomId = (atom: AtomType) => {
  if (!atom) {
    return ''
  }
  if (atom.type === ('Account' || 'Default')) {
    return atom.wallet_id
  }
  return atom.id
}
