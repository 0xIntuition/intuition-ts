import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['production', 'development'] as const), // remix only has development (local) and production (deployed)
  DEPLOY_ENV: z.enum(['production', 'staging', 'development'] as const), // based on the environment context
  VITE_ALCHEMY_API_KEY: z.string(),
  VITE_ORIGIN_URL: z.string(),
  PRIVY_APP_ID: z.string(),
})

declare global {
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export function init() {
  const parsed = schema.safeParse(process.env)

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    )

    throw new Error('Invalid environment variables')
  }
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    VITE_ALCHEMY_API_KEY: import.meta.env.VITE_ALCHEMY_API_KEY,
    VITE_ORIGIN_URL: import.meta.env.VITE_ORIGIN_URL,
    PRIVY_APP_ID: process.env.PRIVY_APP_ID,
  }
}

type ENV = ReturnType<typeof getEnv>

declare global {
  const ENV: ENV
  interface Window {
    ENV: ENV
  }
}
