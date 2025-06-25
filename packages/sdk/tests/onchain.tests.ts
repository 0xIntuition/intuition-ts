import { createAnvil } from '@viem/anvil'
import { afterAll, beforeAll, describe } from 'vitest'

let anvil: ReturnType<typeof createAnvil>

// Replace with your own mainnet RPC URL or use a public one for forking
const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL || 'https://eth-mainnet.alchemyapi.io/v2/demo'

describe('onchain (anvil forked mainnet)', () => {
  beforeAll(async () => {
    anvil = createAnvil({
      forkUrl: MAINNET_RPC_URL,
    })
    await anvil.start()
  })

  afterAll(async () => {
    if (anvil) {
      await anvil.stop()
    }
  })

  // Add your tests here
})
