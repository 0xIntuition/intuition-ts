import {intuitionMainnet, intuitionTestnet} from '@0xintuition/protocol'

export const supportedNetworks = [intuitionTestnet, intuitionMainnet]

export function getNetworkByName(name: string) {
  return supportedNetworks.find((n) => n.name.toLowerCase() === name.toLowerCase())
}

export function getNetworkById(id: number) {
  return supportedNetworks.find((n) => n.id === id)
}

export function getNetworkByEnvironment(name: string) {
  if (name === 'intuition') {
    return intuitionMainnet
  }

  if (name === 'testnet') {
    return intuitionTestnet
  }

  return null
}

export {intuitionMainnet, intuitionTestnet} from '@0xintuition/protocol'
