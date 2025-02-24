import type { User, Wallet } from '@privy-io/react-auth'

import type { SessionDiscordUser } from './discord'

export interface WalletAuth {
  address: string
}

export interface AuthSession {
  discordUser: SessionDiscordUser | null
  walletAuth: WalletAuth | null
}

export interface PrivyUser extends User {
  wallet: Wallet & {
    address: string
  }
}

export type StoredUserData = {
  discordId: string
  username: string
  walletAddress: string
  createdAt: Date
  updatedAt: Date
}
