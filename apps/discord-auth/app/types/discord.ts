// Raw API types
export interface DiscordAPIRole {
  id: string
  name: string
  color: number
  position: number
  permissions: string
  managed: boolean
  mentionable: boolean
  icon?: string | null
  unicode_emoji?: string | null
}

export interface DiscordAPIUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  bot?: boolean
  system?: boolean
  mfa_enabled?: boolean
  verified?: boolean
}

export interface DiscordGuildMember {
  roles: string[]
  nick: string | null
  avatar: string | null
  premium_since: string | null
  joined_at: string
  pending: boolean
  communication_disabled_until: string | null
}

export interface DiscordTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

// Application types
export interface DiscordRole {
  id: string
  name: string
  color: string | null
  position: number
  icon: string | null
  unicodeEmoji: string | null
  points?: number
}

export interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  roles: DiscordRole[]
  totalPoints?: number
}

// Session types
export interface SessionDiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  roleIds: string[]
  totalPoints?: number
}
