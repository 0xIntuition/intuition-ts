import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import {
  createPublicClient,
  createWalletClient,
  http,
} from 'viem'
import { foundry } from 'viem/chains'

// Use environment variable or fallback for Anvil URL
const ANVIL_URL = process.env.ANVIL_RPC_URL || 'http://127.0.0.1:8545'
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
    console.log('deploying contract, request:', JSON.stringify(request))
    const formData = await request.formData()
    const abi = JSON.parse(formData.get('abi') as string)
    const bytecode = formData.get('bytecode') as `0x${string}`
    const constructorArgs = formData.get('constructorArgs') ?
      JSON.parse(formData.get('constructorArgs') as string) :
      []

    // console.log('formData:', JSON.stringify(formData))
    // console.log('abi:', abi)
    // console.log('bytecode:', bytecode)
    // console.log('constructorArgs:', constructorArgs)

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

    console.log('Deployment hash:', hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    console.log('Receipt:', receipt)
    console.log('Contract address:', receipt.contractAddress)

    if (!receipt.contractAddress) {
      throw new Error('No contract address in receipt')
    }

    // Verify transaction status using Viem's receipt
    if (receipt.status !== 'success') {
      throw new Error(`Transaction failed with status: ${receipt.status}`)
    }

    // Wait for contract code to be available using Viem's getCode
    const code = await publicClient.getCode({
      address: receipt.contractAddress,
      blockNumber: receipt.blockNumber
    })

    if (!code || code === '0x') {
      console.log("Contract code is ", code)
      throw new Error('Contract code is empty')
    }

    // Verify contract is callable by attempting to read a function
    try {
      const maxAssets = await publicClient.readContract({
        address: receipt.contractAddress,
        abi,
        functionName: 'maxAssets',
        args: []
      })
      console.log('maxAssets from api deploy:', maxAssets)
    } catch (error) {
      throw new Error(`Contract verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // TESTING
    for (let i = 1; i < 10; i++) {
      const shares = await publicClient.readContract({
        address: receipt.contractAddress,
        abi,
        functionName: 'previewDeposit',
        args: [BigInt(i) * BigInt("1000000000000000000"), 0n, 0n]
      })
      console.log('shares from api deploy:', shares)
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