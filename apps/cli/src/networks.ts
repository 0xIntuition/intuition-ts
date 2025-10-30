import {intuitionTestnet} from '@0xintuition/protocol'

export const supportedNetworks = [intuitionTestnet]

export function getNetworkByName(name: string) {
  return supportedNetworks.find((n) => n.name.toLowerCase() === name.toLowerCase())
}

export {intuitionTestnet} from '@0xintuition/protocol'
