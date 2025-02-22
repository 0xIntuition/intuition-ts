import { z } from 'zod'

export const featureFlagsSchema = z.object({
  FF_GENERIC_BANNER_ENABLED: z.string().optional(),
  FF_INCIDENT_BANNER_ENABLED: z.string().optional(),
  FF_FULL_LOCKDOWN_ENABLED: z.string().optional(),
})

const schema = z.object({
  NODE_ENV: z.enum(['production', 'development'] as const), // remix only has development (local) and production (deployed)
  DEPLOY_ENV: z.enum(['production', 'staging', 'development'] as const), // based on the environment context
  WALLETCONNECT_PROJECT_ID: z.string(),
  ALCHEMY_MAINNET_RPC_URL: z.string(),
  ALCHEMY_BASE_SEPOLIA_RPC_URL: z.string(),
  ALCHEMY_BASE_RPC_URL: z.string(),
  ALCHEMY_SEPOLIA_RPC_URL: z.string(),
  ORIGIN_URL: z.string(),
  PRIVY_APP_ID: z.string(),
  featureFlagsSchema,
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
    WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
    ALCHEMY_MAINNET_RPC_URL: process.env.ALCHEMY_MAINNET_RPC_URL,
    ALCHEMY_BASE_SEPOLIA_RPC_URL: process.env.ALCHEMY_BASE_SEPOLIA_RPC_URL,
    ALCHEMY_BASE_RPC_URL: process.env.ALCHEMY_BASE_RPC_URL,
    ALCHEMY_SEPOLIA_RPC_URL: process.env.ALCHEMY_SEPOLIA_RPC_URL,
    ORIGIN_URL: process.env.ORIGIN_URL,
    PRIVY_APP_ID: process.env.PRIVY_APP_ID,
  }
}

export function getFeatureFlags(): z.infer<typeof featureFlagsSchema> {
  return {
    FF_GENERIC_BANNER_ENABLED: process.env.FF_GENERIC_BANNER_ENABLED,
    FF_INCIDENT_BANNER_ENABLED: process.env.FF_INCIDENT_BANNER_ENABLED,
    FF_FULL_LOCKDOWN_ENABLED: process.env.FF_FULL_LOCKDOWN_ENABLED,
  }
}

export type FeatureFlags = z.infer<typeof featureFlagsSchema>

type ENV = ReturnType<typeof getEnv>

declare global {
  const ENV: ENV
  interface Window {
    ENV: ENV
  }
}
