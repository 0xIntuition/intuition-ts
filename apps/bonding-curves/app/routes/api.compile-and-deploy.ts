import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  custom,
} from 'viem'
import { foundry } from 'viem/chains'
import { promises as fs } from 'fs'

const execAsync = promisify(exec)

const ANVIL_URL = 'http://0.0.0.0:8545'
const ANVIL_ACCOUNT = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

// Custom chain config for local Anvil
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
    const fileName = (formData.get('file') as File).name
    let content = formData.get('content') as string

    if (!fileName || !content) {
      return json(
        { error: 'File name and content are required' },
        { status: 400 }
      )
    }

    try {
      // Save the curve file to the container's contracts directory
      const escapedContent = content
        .replace(/"/g, '\\"')
        .replace(
          /import\s*{BaseCurve}\s*from\s*([^"']\S+);/g,
          'import {BaseCurve} from \\"./BaseCurve.sol\\";'
        )

      await execAsync(`docker exec bonding-curves-anvil-1 bash -c "echo '${escapedContent}' > /app/contracts/${fileName}"`)

      try {
        // Compile the contract with verbose output
        let { stdout, stderr } = await execAsync('docker exec bonding-curves-anvil-1 forge build --force --sizes')
        console.log('Compilation output:', stdout)
        if (stderr) console.error('Compilation errors:', stderr)

        // Get the contract artifacts from the container
        const contractName = path.parse(fileName).name
        const { stdout: artifactContent } = await execAsync(
          `docker exec bonding-curves-anvil-1 cat /app/out/${fileName}/${contractName}.json`
        )

        let artifact
        try {
          artifact = JSON.parse(artifactContent)
        } catch (error) {
          console.error('Failed to parse artifact:', error)
          throw new Error('Failed to read contract artifact')
        }

        // Configure transport with more lenient settings
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

        // Test connection to Anvil
        console.log('Testing Anvil connection...')
        const chainId = await publicClient.getChainId()
        console.log('Connected to chain:', chainId)

        // Deploy the contract
        console.log('Deploying contract...')
        console.log('Contract ABI:', JSON.stringify(artifact.abi, null, 2))

        const hash = await walletClient.deployContract({
          abi: artifact.abi,
          bytecode: artifact.bytecode.object as `0x${string}`,
          args: [],
        })

        console.log('Waiting for deployment receipt...')
        const receipt = await publicClient.waitForTransactionReceipt({ hash })

        if (!receipt.contractAddress) {
          throw new Error('No contract address in receipt')
        }

        console.log('Contract deployed at:', receipt.contractAddress)
        return json({ address: receipt.contractAddress })
      } catch (error) {
        console.error('Deployment failed:', error)
        throw error
      } finally {
        // Clean up temporary files in container regardless of success/failure
        try {
          await execAsync(`docker exec bonding-curves-anvil-1 rm /app/contracts/${fileName}`)
        } catch (cleanupError) {
          console.error('Failed to clean up temporary file:', cleanupError)
        }
      }
    } catch (error) {
      console.error('Compilation failed:', error)
      return json(
        { error: error instanceof Error ? error.message : 'Contract compilation failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 