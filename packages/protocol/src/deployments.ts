import { Address } from 'viem'
import { base, baseSepolia } from 'viem/chains'

const deployments: Record<number, Address> = {}

deployments[base.id] = '0x73Edf2A6Aca5AC52041D1D14deB3157A33b9Ab6d'
deployments[baseSepolia.id] = '0x3A6fF6BD5eD4E0478437BA8880988c7f9D294Ebd'

export { deployments }
