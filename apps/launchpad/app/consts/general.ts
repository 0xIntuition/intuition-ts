import { ChainEnv } from '@lib/utils/environment'
import { base, baseSepolia } from 'viem/chains'

export const CURRENT_ENV: ChainEnv =
  (import.meta.env.VITE_DEPLOY_ENV as ChainEnv) || 'development'

export const API_URL_DEV =
  'https://prod.base-sepolia-v-1-5.intuition.sh/v1/graphql'
// export const API_URL_PROD = 'https://prod.base.intuition-api.com/v1/graphql'
export const API_URL_PROD = API_URL_DEV

export const DEFAULT_CHAIN_ID =
  CURRENT_ENV === 'development' ? baseSepolia.id : base.id

export const DEFAULT_VERIFIER = function (): void {
  throw new Error('verify function must be implemented')
}

export const MULTIVAULT_CONTRACT_ADDRESS =
  CURRENT_ENV === 'development'
    ? '0x63B90A9c109fF8f137916026876171ffeEdEe714' // dev contract address 1.5
    : '0x430BbF52503Bd4801E51182f4cB9f8F534225DE5' // prod contract address

export const RELIC_CONTRACT_ADDRESS =
  CURRENT_ENV === 'development'
    ? '0x7aB2F10CaC6E27971fa93A5D5470Bb84126Bb734' // dev contract address
    : '0x7aB2F10CaC6E27971fa93A5D5470Bb84126Bb734' // prod contract address

export const DEFAULT_LIMIT = 10

export const MIN_DEPOSIT =
  CURRENT_ENV === 'development' ? '0.00069' : '0.000025'
// Form constants
export const MAX_NAME_LENGTH = 100
export const DESCRIPTION_MAX_LENGTH = 512
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 5 // 5MB
export const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
]
export const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png']

export const BLOCK_EXPLORER_URL =
  CURRENT_ENV === 'development'
    ? 'https://sepolia.basescan.org'
    : 'https://basescan.org'

export const PORTAL_URL =
  CURRENT_ENV === 'development'
    ? 'https://dev.portal.intuition.systems'
    : 'https://portal.intuition.systems'

export const IPFS_GATEWAY_URL = 'https://ipfs.io/ipfs'

// Routes
export const GET_VAULT_DETAILS_RESOURCE_ROUTE = '/resources/get-vault-details'
export const GET_MULTIVAULT_CONFIG_RESOURCE_ROUTE =
  '/resources/get-vault-config'

// SPECIAL ATOMS
// Best practice is to retrieve these on startup, as they can vary per environment
export const TAG_PREDICATE_VAULT_ID_TESTNET = 3 // used in testnet tag claim as predicate
export const I_PREDICATE_VAULT_ID_TESTNET = 13
export const AM_FOLLOWING_VAULT_ID_TESTNET = 4
export const THING_VAULT_ID_TESTNET = 2

export const TAG_PREDICATE_ID_TESTNET = '6eab2a76-687e-4f23-9429-276eb14e6c6c'
export const I_PREDICATE_ID_TESTNET = '6b8c8a43-6338-4a96-a3b6-fc8cc4910600'
export const AM_FOLLOWING_ID_TESTNET = 'b369445b-2310-4a89-8335-8c5c61e1b464'
export const THING_ID_TESTNET = 'cd43092d-8698-46da-96a6-fd2b8551dde0'

export const TAG_PREDICATE_DISPLAY_NAME_TESTNET = 'has tag'
export const I_PREDICATE_DISPLAY_NAME_TESTNET = 'I'
export const AM_FOLLOWING_DISPLAY_NAME_TESTNET = 'am following'
export const THING_DISPLAY_NAME_TESTNET = 'thing'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
