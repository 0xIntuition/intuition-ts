export interface TurnstileSiteVerifyResponse {
  success: boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?: string
  action?: string
  cdata?: string
}

/**
 * Verifies a Turnstile token against Cloudflare's `siteverify` endpoint.
 *
 * @param token The token returned by the Turnstile widget on the client.
 * @param remoteIp (Optional) The end-user's IP address. Including this can help
 *                Cloudflare detect abuse.
 * @returns `true` when the token is valid and passes all of Cloudflare's checks.
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn(
      'TURNSTILE_SECRET_KEY is not defined. Skipping CAPTCHA verification for development purposes.',
    )
    // In development we opt to permit access if the secret isn't configured.
    // Remove this branch for production hard-fail behaviour.
    return true
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  })
  if (remoteIp) {
    params.append('remoteip', remoteIp)
  }

  const res = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: params,
    },
  )

  if (!res.ok) {
    console.error('Turnstile verification network failure', res.status)
    return false
  }

  const data = (await res.json()) as TurnstileSiteVerifyResponse

  if (!data.success) {
    console.warn('Turnstile validation failed', data)
  }

  return data.success
}
