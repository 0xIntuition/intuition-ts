import { Address } from 'viem'
import { base, baseSepolia } from 'viem/chains'

const deployments: Record<number, Address> = {}

deployments[base.id] = '0x430BbF52503Bd4801E51182f4cB9f8F534225DE5'
deployments[baseSepolia.id] = '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665'

export { deployments }
