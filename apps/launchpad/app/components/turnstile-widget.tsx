import { useEffect, useRef } from 'react'

interface TurnstileWidgetProps {
  siteKey: string
  onSuccess: (token: string) => void
  options?: Record<string, unknown>
  className?: string
}

type _Turnstile = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string
      callback: (token: string) => void
      [key: string]: unknown
    },
  ) => string
  remove: (widgetId: string) => void
}

function ensureTurnstileScript() {
  if (typeof document === 'undefined') {
    return
  }
  if (document.getElementById('cf-turnstile-script')) {
    return
  }
  const script = document.createElement('script')
  script.id = 'cf-turnstile-script'
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

export function TurnstileWidget({
  siteKey,
  onSuccess,
  options,
  className,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>()

  useEffect(() => {
    ensureTurnstileScript()

    const tryRender = () => {
      const ts = (window as any).turnstile as _Turnstile | undefined
      if (containerRef.current && ts && !widgetIdRef.current) {
        widgetIdRef.current = ts.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onSuccess(token),
          ...options,
        })
      }
    }

    const interval = setInterval(() => {
      tryRender()
      if (widgetIdRef.current) {
        clearInterval(interval)
      }
    }, 250)

    return () => {
      clearInterval(interval)
      const ts = (window as any).turnstile as _Turnstile | undefined
      if (widgetIdRef.current && ts) {
        ts.remove(widgetIdRef.current)
      }
    }
  }, [siteKey, onSuccess, options])

  return (
    <div
      ref={containerRef}
      role="presentation"
      className={className}
      aria-label="Cloudflare Turnstile CAPTCHA"
    />
  )
}
