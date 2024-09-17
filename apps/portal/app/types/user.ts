import {
  ClaimPresenter,
  IdentityPresenter,
  UserPresenter,
  UserTotalsPresenter,
} from '@0xintuition/api'

import { User as PrivyUser } from '@privy-io/react-auth'
import { AuthTokenClaims } from '@privy-io/server-auth'

import { PlatformUserDetails } from './privy'
import { VaultDetailsType } from './vault'

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

export interface ReadOnlyProfileLoaderData {
  userWallet: string
  userIdentity: IdentityPresenter
  userObject: UserPresenter
  userTotals: UserTotalsPresenter
  vaultDetails: VaultDetailsType
  followClaim: ClaimPresenter
  isPending: boolean
  relicMintCount: number
  relicHoldCount: string
}
