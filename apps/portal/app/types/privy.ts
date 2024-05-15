export interface User {
  id: string
  wallet?: { address: string }
  didSession?: string
  newUser?: boolean
  accessToken?: string
}

export interface UsePrivy {
  user?: User | null
  login: () => void
  logout: () => void
  getAccessToken: () => Promise<string | null>
}

export interface Wallet {
  address: string
  chainId: string
  switchChain: (chainId: number) => Promise<void>
}

export interface UseWallets {
  wallets?: Wallet[] // Now using a defined Wallet type instead of any
  switchChain?: (chainId: number) => Promise<void>
}

export interface PrivyHooks {
  usePrivy?: () => UsePrivy
  useWallets?: () => UseWallets
}
