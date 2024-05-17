import { base, baseSepolia } from 'viem/chains'

export const CURRENT_ENV = process.env.NODE_ENV

export const DEFAULT_CHAIN_ID =
  CURRENT_ENV === 'production' ? base.id.toString() : baseSepolia.id.toString()

export const DEFAULT_VERIFIER = function (): void {
  throw new Error('verify function must be implemented')
}

export const MULTIVAULT_CONTRACT_ADDRESS =
  CURRENT_ENV === 'production'
    ? '0x73Edf2A6Aca5AC52041D1D14deB3157A33b9Ab6d' // prod contract address
    : '0x78f576A734dEEFFd0C3550E6576fFf437933D9D5' // dev contract address

export const DEFAULT_LIMIT = 10

// Form constants
export const MAX_NAME_LENGTH = 69
export const DESCRIPTION_MAX_LENGTH = 266
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB
export const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
]
export const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png']

export const BLOCK_EXPLORER_URL =
  CURRENT_ENV === 'production'
    ? 'https://basescan.org'
    : 'https://sepolia.basescan.org'
