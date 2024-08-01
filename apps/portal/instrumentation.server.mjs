import * as Sentry from '@sentry/remix'

Sentry.init({
  dsn: 'https://de49927453262eeb56a313be2d02c052@o4507699051560960.ingest.us.sentry.io/4507699076399104',
  tracesSampleRate: 1,
  autoInstrumentRemix: true,
})
