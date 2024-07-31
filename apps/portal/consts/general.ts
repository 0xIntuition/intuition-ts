import { PrivyPlatform } from 'types/privy'
import { baseSepolia } from 'viem/chains'

import { PATHS } from './paths'

export const CURRENT_ENV = process.env.NODE_ENV

export const DEFAULT_CHAIN_ID =
  CURRENT_ENV === 'production'
    ? baseSepolia.id.toString()
    : baseSepolia.id.toString()

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
    ? 'https://sepolia.basescan.org'
    : 'https://sepolia.basescan.org'

export const IPFS_GATEWAY_URL = 'https://ipfs.io/ipfs'

export const CREATE_RESOURCE_ROUTE = '/resources/create'
export const CREATE_CLAIM_RESOURCE_ROUTE = '/resources/create-claim'
export const GET_IDENTITIES_BY_IDS_RESOURCE_ROUTE =
  '/resources/get-identities-by-ids'
export const GET_IDENTITIES_RESOURCE_ROUTE = '/resources/get-identities'
export const SEARCH_IDENTITIES_RESOURCE_ROUTE = '/resources/search-identities'
export const TAG_RESOURCE_ROUTE = '/resources/tag'
export const SEARCH_CLAIMS_BY_IDS_RESOURCE_ROUTE =
  '/resources/search-claims-by-ids'
export const GET_VAULT_DETAILS_RESOURCE_ROUTE = '/resources/get-vault-details'

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
  { value: 'overview', label: 'Overview', path: PATHS.PROFILE },
  { value: 'data-about', label: 'Data About', path: PATHS.PROFILE_DATA_ABOUT },
  {
    value: 'data-created',
    label: 'Data Created',
    path: PATHS.PROFILE_DATA_CREATED,
  },
  {
    value: 'connections',
    label: 'Connections',
    path: PATHS.PROFILE_CONNECTIONS,
  },
]

export const userIdentityRouteOptions = [
  { value: 'overview', label: 'Overview', basePath: PATHS.PROFILE },
  {
    value: 'data-about',
    label: 'Data About',
    basePath: PATHS.PROFILE,
  },
  {
    value: 'data-created',
    label: 'Data Created',
    basePath: PATHS.PROFILE,
  },
  {
    value: 'connections',
    label: 'Connections',
    basePath: PATHS.PROFILE,
  },
]

export const identityRouteOptions = [
  { value: 'overview', label: 'Overview', basePath: PATHS.IDENTITY },
  {
    value: 'data-about',
    label: 'Data About',
    basePath: PATHS.IDENTITY,
  },

  {
    value: 'tags',
    label: 'Tags',
    basePath: PATHS.IDENTITY,
  },
]

export const exploreRouteOptions = [
  {
    value: 'users',
    label: 'Users',
    basePath: PATHS.EXPLORE,
  },
  {
    value: 'identities',
    label: 'Identities',
    basePath: PATHS.EXPLORE,
  },
  {
    value: 'claims',
    label: 'Claims',
    basePath: PATHS.EXPLORE,
  },

  {
    value: 'lists',
    label: 'Lists',
    basePath: PATHS.EXPLORE,
  },
]

export const activityRouteOptions = [
  {
    value: 'global',
    label: 'Global Activity',
    basePath: PATHS.ACTIVITY,
  },
  {
    value: 'personal',
    label: 'Your Activity',
    basePath: PATHS.ACTIVITY,
  },
]

// SPECIAL ATOMS

export const LIST_OBJECT_VAULT_ID_TESTNET = 175 // used in testnet list claim as object
export const TAG_PREDICATE_VAULT_ID_TESTNET = 176 // used in testnet tag claim as predicate
export const I_PREDICATE_VAULT_ID_TESTNET = 19
export const AM_WATCHING_VAULT_ID_TESTNET = 264

export const TAG_PREDICATE_ID_TESTNET = '8af2e266-ffdd-4a46-bcf8-69bd27e995d4'
export const AM_WATCHING_ID_TESTNET = 'e2237e27-cc80-4dec-abf8-ae1755c101f0'

export const AM_WATCHING_DISPLAY_NAME_TESTNET = 'am watching'
