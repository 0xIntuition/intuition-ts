import { User as PrivyUser } from '@privy-io/react-auth'
import { AuthTokenClaims } from '@privy-io/server-auth'

export type ExtendedPrivyUser = PrivyUser & {
  twitter?: PlatformUserDetails
  github?: PlatformUserDetails
  farcaster?: PlatformUserDetails
  [key: string | number]: PlatformUserDetails | undefined
}

export type SessionUser = {
  privyAuthTokenClaims?: AuthTokenClaims
  // User with optional ensName extended
  details?: ExtendedPrivyUser & { ensName?: string }
}
