import { Address } from 'viem'
import { base, baseSepolia } from 'viem/chains'

const deployments: Record<number, Address> = {}

deployments[base.id] = '0x73Edf2A6Aca5AC52041D1D14deB3157A33b9Ab6d'
deployments[baseSepolia.id] = '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665'

export { deployments }
