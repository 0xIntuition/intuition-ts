import { User } from '@privy-io/react-auth'

export interface WalletSession {
  wallet: string | null
}

export type AuthState = {
  isReady: boolean
  isAuthenticated: boolean
  isLoading: boolean
  error: AuthError | null
  walletAddress: string | null
}

export type AuthUser = {
  wallet: string
  privyUser: User
}

export interface AuthError {
  code: AuthErrorCode
  message: string
}

export const AUTH_ERROR_CODES = {
  WALLET_REQUIRED: 'WALLET_REQUIRED',
  CONNECTION_FAILED: 'CONNECTION_FAILED',
  DISCONNECT_FAILED: 'DISCONNECT_FAILED',
  SESSION_ERROR: 'SESSION_ERROR',
  INITIALIZATION_ERROR: 'INITIALIZATION_ERROR',
  INVALID_STATE: 'INVALID_STATE',
} as const

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES]

export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  WALLET_REQUIRED: 'Wallet connection required',
  CONNECTION_FAILED: 'Failed to connect wallet',
  DISCONNECT_FAILED: 'Failed to disconnect wallet',
  SESSION_ERROR: 'Session error occurred',
  INITIALIZATION_ERROR: 'Failed to initialize auth',
  INVALID_STATE: 'Invalid auth state',
}
