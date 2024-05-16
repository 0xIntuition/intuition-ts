import { Address } from 'viem'
import { base, baseSepolia } from 'viem/chains'

const deployments: Record<number, Address> = {}

deployments[base.id] = '0x73Edf2A6Aca5AC52041D1D14deB3157A33b9Ab6d'
deployments[baseSepolia.id] = '0x78f576A734dEEFFd0C3550E6576fFf437933D9D5'

export { deployments }
