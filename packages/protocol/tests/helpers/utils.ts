import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  http,
  type Chain,
} from 'viem'
import { localhost } from 'viem/chains'

import { ALICE, CAROL } from './constants'

/**
 * The id of the current test worker.
 *
 * This is used by the anvil proxy to route requests to the correct anvil instance.
 */
export const pool = Number(process.env.VITEST_POOL_ID ?? 1)
export const anvil = {
  ...localhost, // We are using a mainnet fork for testing.
  id: 31337, // We configured our anvil instance to use `123` as the chain id (see `globalSetup.ts`);
  rpcUrls: {
    // These rpc urls are automatically used in the transports.
    default: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:8545/${pool}`],
      webSocket: [`ws://127.0.0.1:8545/${pool}`],
    },
    public: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:8545/${pool}`],
      webSocket: [`ws://127.0.0.1:8545/${pool}`],
    },
  },
} as const satisfies Chain

export const testClient = createTestClient({
  chain: anvil,
  mode: 'anvil',
  transport: http(),
})

export const publicClient = createPublicClient({
  chain: anvil,
  transport: http(),
})

export const walletClient = createWalletClient({
  chain: anvil,
  transport: http(),
  account: ALICE,
})

export const userWalletClient = createWalletClient({
  chain: anvil,
  transport: http(),
  account: CAROL,
})

export function extractRevertReason(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return String(error)
  }

  const err = error as Record<string, unknown>

  // Try to walk the error chain to find the root cause
  if (typeof err.walk === 'function') {
    try {
      let rootCause: string | undefined
      err.walk((e: Record<string, unknown>) => {
        if (e.data && typeof e.data === 'object') {
          const data = e.data as Record<string, unknown>
          if (data.errorName) {
            rootCause = `${data.errorName}${data.args ? `(${JSON.stringify(data.args)})` : ''}`
            return true
          }
        }
        if (e.reason && typeof e.reason === 'string') {
          rootCause = e.reason
        }
        return false
      })
      if (rootCause) return rootCause
    } catch {
      // Continue to other methods if walk fails
    }
  }

  // Check for viem specific error structures
  if (err.details && typeof err.details === 'string') return err.details
  if (err.shortMessage && typeof err.shortMessage === 'string')
    return err.shortMessage
  if (Array.isArray(err.metaMessages) && err.metaMessages.length > 0)
    return err.metaMessages.join('\n')
  if (err.reason && typeof err.reason === 'string') return err.reason

  // Check nested cause
  if (err.cause) return extractRevertReason(err.cause)

  return String(error)
}
