import { AuthTokenClaims } from '@privy-io/server-auth'
import { User as PrivyUser } from '@privy-io/react-auth'

export type SessionUser = {
  privyAuthTokenClaims?: AuthTokenClaims
  // User with optional ensName extended
  details?: PrivyUser & { ensName?: string }
}
