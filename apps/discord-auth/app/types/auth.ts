import type { User, Wallet } from '@privy-io/react-auth'

export interface DiscordRole {
  id: string
  name: string
  color: string | null
  position: number
  icon?: string | null
  unicodeEmoji?: string | null
}

export type DiscordUser = {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  roles: DiscordRole[]
}

export type WalletAuth = {
  address: string
}

export type AuthSession = {
  discordUser: DiscordUser | null
  walletAuth: WalletAuth | null
}

export type StoredUserData = {
  discordId: string
  username: string
  roles: DiscordRole[]
  walletAddress: string
  createdAt: Date
  updatedAt: Date
}

export interface PrivyUser extends User {
  wallet: Wallet & {
    address: string
  }
}
