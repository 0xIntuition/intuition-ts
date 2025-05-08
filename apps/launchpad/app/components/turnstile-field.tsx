import { useEffect, useState } from 'react'

import { TurnstileWidget } from '@components/turnstile-widget'
import { useFetcher } from '@remix-run/react'

interface TurnstileFieldProps {
  siteKey?: string
  onVerified: (isOk: boolean) => void
}

/**
 * Combines the client widget with server-side validation. It emits `onVerified`
 * once the `/actions/verify-captcha` route confirms the token.
 */
export function TurnstileField({ siteKey, onVerified }: TurnstileFieldProps) {
  const [token, setToken] = useState<string | null>(null)
  const fetcher = useFetcher<{ ok: boolean }>()

  const actualKey =
    siteKey ??
    (typeof window !== 'undefined' ? window.ENV?.TURNSTILE_SITE_KEY : undefined)

  if (!actualKey) {
    return null
  }

  // When we receive a new token from the widget we immediately POST it to the
  // verify route using a fetcher so the surrounding component can enable its
  // submit button only if verification passes.
  useEffect(() => {
    if (!token) {
      return
    }

    const fd = new FormData()
    fd.append('turnstile_token', token)
    fetcher.submit(fd, {
      method: 'post',
      action: '/actions/verify-captcha',
    })
  }, [token])

  // Notify parent when verification result comes back.
  useEffect(() => {
    if (fetcher.data) {
      onVerified(!!fetcher.data.ok)
    }
  }, [fetcher.data, onVerified])

  return <TurnstileWidget siteKey={actualKey} onSuccess={setToken} />
}
