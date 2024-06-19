import { PrivyPlatform } from 'types/privy'
import { base, baseSepolia } from 'viem/chains'

export const CURRENT_ENV = process.env.NODE_ENV

export const DEFAULT_CHAIN_ID =
  CURRENT_ENV === 'production' ? base.id.toString() : baseSepolia.id.toString()

export const DEFAULT_VERIFIER = function (): void {
  throw new Error('verify function must be implemented')
}

export const MULTIVAULT_CONTRACT_ADDRESS =
  CURRENT_ENV === 'production'
    ? '0xd57981d5Bc446768E8a1E3D582e545fa705415b5' // prod contract address
    : '0xd57981d5Bc446768E8a1E3D582e545fa705415b5' // dev contract address

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

// Privy Social Accounts

export const verifiedPlatforms: PrivyPlatform[] = [
  {
    platformPrivyName: 'twitter',
    platformUiName: 'x',
    platformDisplayName: 'X',
    platformIcon: 'x',
    linkMethod: 'linkTwitter',
    unlinkMethod: 'unlinkTwitter',
  },
  {
    platformPrivyName: 'github',
    platformUiName: 'github',
    platformDisplayName: 'GitHub',
    platformIcon: 'github',
    linkMethod: 'linkGithub',
    unlinkMethod: 'unlinkGithub',
  },
  {
    platformPrivyName: 'farcaster',
    platformUiName: 'farcaster',
    platformDisplayName: 'Farcaster',
    platformIcon: 'farcaster',
    linkMethod: 'linkFarcaster',
    unlinkMethod: 'unlinkFarcaster',
  },
]

// Routes

export const userProfileRouteOptions = [
  { value: 'overview', label: 'Overview', path: '/app/profile/' },
  { value: 'data-about', label: 'Data About', path: '/app/profile/data-about' },
  {
    value: 'data-created',
    label: 'Data Created',
    path: '/app/profile/data-created',
  },
  {
    value: 'connections',
    label: 'Connections',
    path: '/app/profile/connections',
  },
]

export const userIdentityRouteOptions = [
  { value: 'overview', label: 'Overview', basePath: '/app/profile/' },
  {
    value: 'data-about',
    label: 'Data About',
    basePath: '/app/profile/',
  },
  {
    value: 'data-created',
    label: 'Data Created',
    basePath: '/app/profile/',
  },
  {
    value: 'connections',
    label: 'Connections',
    basePath: '/app/profile/',
  },
]

export const identityRouteOptions = [
  { value: 'overview', label: 'Overview', basePath: '/app/identity/' },
  {
    value: 'data-about',
    label: 'Data About',
    basePath: '/app/identity/',
  },

  {
    value: 'tags',
    label: 'Tags',
    basePath: '/app/identity/',
  },
]
