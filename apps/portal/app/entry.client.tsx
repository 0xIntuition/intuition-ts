/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

// import './polyfills'
import { startTransition, StrictMode, useEffect } from 'react'

import { RemixBrowser, useLocation, useMatches } from '@remix-run/react'
import * as Sentry from '@sentry/remix'
import { hydrateRoot } from 'react-dom/client'

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [
    Sentry.browserTracingIntegration({
      useEffect,
      useLocation,
      useMatches,
    }),
    // Replay is only available in the client
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/dev.portal.intuition.systems/,
  ],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  )
})
