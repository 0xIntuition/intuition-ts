import { User as PrivyUser, Wallet } from '@privy-io/react-auth'

export interface User {
  id: string
  wallet?: { address: string }
  didSession?: string
  newUser?: boolean
  accessToken?: string
}

export interface UsePrivy {
  user?: PrivyUser | null
  login: () => void
  logout: () => void
  getAccessToken: () => Promise<string | null>
}

// export interface Wallet {
//   address: string
//   chainId: string
//   switchChain: (chainId: number) => Promise<void>
// }

export interface UseWallets {
  wallets?: Wallet[] // Now using a defined Wallet type instead of any
  switchChain?: (chainId: number) => Promise<void>
}

export interface PrivyHooks {
  usePrivy?: () => UsePrivy
  useWallets?: () => UseWallets
}

export interface PrivyModule {
  user?: User | null
  login: () => void
  logout: () => void
  getAccessToken: () => Promise<string | null>
}

export type PrivyModuleType = typeof import('@privy-io/react-auth')

export type LinkMethodNames = 'linkTwitter' | 'linkGithub' | 'linkFarcaster'
type UnlinkMethodNamesBySubject = 'unlinkTwitter' | 'unlinkGithub'
type UnlinkMethodNamesByFid = 'unlinkFarcaster'

export interface PrivyPlatform {
  platformPrivyName: string
  platformDisplayName: string
  linkMethod: LinkMethodNames
  unlinkMethod: UnlinkMethodNamesBySubject | UnlinkMethodNamesByFid
}

export interface PlatformUserDetails {
  subject: string
  fid: number
  username?: string
  verifiedAt?: Date
}

export type ExtendedPrivyUser = PrivyUser & {
  twitter?: PlatformUserDetails
  github?: PlatformUserDetails
  farcaster?: PlatformUserDetails
  [key: string | number]: PlatformUserDetails | undefined
}
