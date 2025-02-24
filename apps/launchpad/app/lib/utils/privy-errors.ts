import { toast } from '@0xintuition/1ui'

/**
 * Converts Privy error codes to user-friendly messages
 * Error codes are in snake_case format
 */
export function formatPrivyErrorMessage(errorCode: string): string {
  // Split by underscore and convert to Title Case
  const words = errorCode
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

  // Special cases for common acronyms
  const acronyms = ['Url', 'Id', 'Ui', 'Api', 'Rpc', 'Mfa', 'Oauth']
  words.forEach((word, index) => {
    if (acronyms.includes(word)) {
      words[index] = word.toUpperCase()
    }
  })

  return words.join(' ')
}

/**
 * Maps Privy error codes to user-friendly messages
 * Based on:
 * - https://docs.privy.io/reference/sdk/react-auth/enumerations/PrivyErrorCode
 * - @privy-io/api-base error codes
 */
export function getPrivyErrorMessage(errorCode: string): string {
  const customMessages: Record<string, string> = {
    // Authentication errors
    must_be_authenticated: 'Please connect your wallet to continue',
    oauth_account_suspended: 'This account has been suspended',
    oauth_unexpected: 'Unexpected authentication error',
    oauth_user_denied: 'Authentication was denied',
    oauth_state_mismatch: 'Authentication session mismatch',
    unknown_auth_error: 'Authentication failed. Please try again',
    user_exited_auth_flow: 'Authentication cancelled',
    user_does_not_exist: 'No user found with this login method',
    already_logged_out: 'Session already ended',
    token_already_used: 'Session token already used',

    // Wallet connection errors
    generic_connect_wallet_error: 'Failed to connect wallet. Please try again',
    unknown_connect_wallet_error: 'Unable to connect wallet. Please try again',
    unsupported_chain_id:
      'This network is not supported. Please switch to Base',
    insufficient_balance: 'Insufficient balance',
    transaction_failure: 'Transaction failed',
    unable_to_sign: 'Unable to sign message',
    exited_auth_flow: 'Authentication cancelled',

    // Embedded wallet errors
    embedded_wallet_already_exists: 'Wallet already exists',
    embedded_wallet_create_error: 'Failed to create wallet',
    embedded_wallet_not_found: 'Wallet not found',
    embedded_wallet_password_already_exists:
      'Password already set for this wallet',
    embedded_wallet_password_unconfirmed: 'Please confirm your wallet password',
    embedded_wallet_recovery_already_exists: 'Recovery method already set',
    unknown_embedded_wallet_error: 'Wallet error occurred',
    cannot_unlink_embedded_wallet: 'Cannot unlink embedded wallet',
    cannot_unlink_sole_account: 'Cannot unlink your only connected account',
    wallet_password_exists: 'Wallet password already exists',
    cannot_set_password: 'Cannot set password for this wallet',
    device_revoked: 'This device has been revoked',

    // Account linking errors
    failed_to_link_account: 'Failed to link account',
    failed_to_update_account: 'Failed to update account',
    linked_to_another_user: 'Account already linked to another user',
    cannot_link_more_of_type: 'Cannot link another account of this type',
    user_exited_link_flow: 'Account linking cancelled',
    user_exited_update_flow: 'Account update cancelled',
    linked_account_not_found: 'Linked account not found',
    cross_app_connection_not_allowed: 'Cross-app connection not allowed',

    // MFA errors
    missing_mfa_credentials: 'Two-factor authentication required',
    missing_or_invalid_mfa: 'Invalid two-factor authentication',
    expired_or_invalid_mfa_token: 'Two-factor authentication expired',
    unknown_mfa_error: 'Authentication error occurred',

    // Rate limiting and permissions
    too_many_requests: 'Too many attempts. Please try again later',
    user_limit_reached: 'Maximum number of accounts reached',
    max_apps_reached: 'Maximum number of apps reached',
    max_denylist_entries_reached: 'Maximum number of denied entries reached',
    disallowed_login_method: 'This login method is not allowed',
    disallowed_recovery_method: 'This recovery method is not allowed',
    disallowed_plus_email: 'This email format is not allowed',
    passkey_not_allowed: 'Passkeys are not supported',
    allowlist_rejected: 'This account is not allowed',

    // CAPTCHA errors
    captcha_disabled: 'CAPTCHA verification is disabled',
    captcha_failure: 'CAPTCHA verification failed',
    captcha_timeout: 'CAPTCHA verification timed out',
    invalid_captcha: 'Invalid CAPTCHA response',

    // Technical errors
    client_request_timeout: 'Request timed out. Please try again',
    invalid_credentials: 'Invalid credentials provided',
    invalid_data: 'Invalid input provided',
    invalid_message: 'Invalid message format',
    invalid_origin: 'Invalid request origin',
    missing_origin: 'Missing request origin',
    invalid_native_app_id: 'Invalid native app ID',
    invalid_pkce_parameters: 'Invalid authentication parameters',
    invalid_app_url_scheme_configuration: 'Invalid app configuration',
    missing_or_invalid_privy_account_id: 'Invalid account configuration',
    missing_or_invalid_privy_app_id: 'Invalid app configuration',
    missing_or_invalid_privy_client_id: 'Invalid client configuration',
    missing_or_invalid_token: 'Session expired. Please reconnect',
    not_supported: 'This action is not supported',
    session_storage_unavailable: 'Browser storage is unavailable',
    legacy_dashboard_login_configuration:
      'Please update login configuration in dashboard',

    // User actions
    user_exited_set_password_flow: 'Password setup cancelled',
    account_transfer_required: 'Account transfer required',
    user_unsubscribed: 'You have unsubscribed from notifications',
  }

  return customMessages[errorCode] ?? formatPrivyErrorMessage(errorCode)
}

interface PrivyError extends Error {
  code?: number
  reason?: string
}

export function handlePrivyError(error: unknown): void {
  console.error('Privy error:', error)

  if (error instanceof Error) {
    const privyError = error as PrivyError

    // Handle specific error codes
    if (privyError.code === 4001) {
      toast.error('Transaction rejected by user')
      return
    }

    if (privyError.code === 4902) {
      toast.error('Network not added to wallet')
      return
    }

    if (privyError.reason) {
      toast.error(privyError.reason)
      return
    }

    // Default error message
    toast.error(privyError.message || 'Transaction failed')
    return
  }

  // Fallback error message
  toast.error('An unexpected error occurred')
}

export function isPrivyError(error: unknown): error is PrivyError {
  return error instanceof Error && 'code' in error
}

// Common Privy error messages
export const PRIVY_ERROR_MESSAGES = {
  USER_REJECTED: 'User rejected the request',
  NETWORK_ERROR: 'Network error occurred',
  CHAIN_NOT_ADDED: 'Chain not added to wallet',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const
