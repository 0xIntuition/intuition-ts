import type { UserPresenter } from '@0xintuition/api'

import type { User as PrivyUser } from '@privy-io/react-auth'
import type { AuthTokenClaims } from '@privy-io/server-auth'

import type { PlatformUserDetails } from './privy'

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

export type ExtendedUserPresenter = UserPresenter & {
  user: {
    id: string
    privy_id: string
    image: string
    wallet: string
    display_name: string
    description: string
    ens_name?: string
    total: number
  }
}
