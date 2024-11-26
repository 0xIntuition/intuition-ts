import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import {
  createPublicClient,
  createWalletClient,
  http,
} from 'viem'
import { foundry } from 'viem/chains'

const ANVIL_URL = 'http://0.0.0.0:8545'
const ANVIL_ACCOUNT = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

const localFoundry = {
  ...foundry,
  rpcUrls: {
    default: {
      http: [ANVIL_URL],
    },
    public: {
      http: [ANVIL_URL],
    },
  },
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const abi = JSON.parse(formData.get('abi') as string)
    const bytecode = formData.get('bytecode') as `0x${string}`
    const constructorArgs = formData.get('constructorArgs') ?
      JSON.parse(formData.get('constructorArgs') as string) :
      []

    const transport = http(ANVIL_URL, {
      timeout: 60000,
      retryCount: 5,
      retryDelay: 2000,
      batch: false,
    })

    const publicClient = createPublicClient({
      chain: localFoundry,
      transport,
    })

    const walletClient = createWalletClient({
      chain: localFoundry,
      transport,
      account: ANVIL_ACCOUNT,
    })

    // Deploy
    const hash = await walletClient.deployContract({
      abi,
      bytecode,
      args: constructorArgs,
    })

    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    if (!receipt.contractAddress) {
      throw new Error('No contract address in receipt')
    }

    return json({ address: receipt.contractAddress })

  } catch (error) {
    console.error('Deployment failed:', error)
    return json(
      { error: error instanceof Error ? error.message : 'Contract deployment failed' },
      { status: 500 }
    )
  }
} 