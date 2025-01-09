import {
  AUTH_ERROR_CODES,
  AUTH_ERROR_MESSAGES,
  AuthErrorCode,
  AuthError as IAuthError,
} from '../types/auth'

export class AuthError extends Error implements IAuthError {
  constructor(
    message: string,
    public code: AuthErrorCode,
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export { AUTH_ERROR_CODES }

export const handleAuthError = (
  error: unknown,
  code: AuthErrorCode = AUTH_ERROR_CODES.SESSION_ERROR,
): AuthError => {
  console.error('Auth error:', error)

  const message =
    error instanceof Error ? error.message : AUTH_ERROR_MESSAGES[code]

  return new AuthError(message, code)
}
