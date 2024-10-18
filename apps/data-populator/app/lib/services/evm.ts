import {
  Abi,
  Address,
  createPublicClient,
  createWalletClient,
  Hex,
  http,
  parseAbi,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

const environment = process.env.ENVIRONMENT
const privateKey =
  environment === 'dev'
    ? (process.env.PRIVATE_KEY_DEV as string)
    : (process.env.PRIVATE_KEY as string)

if (!privateKey) {
  throw new Error('PRIVATE_KEY must be set')
}

// if (privateKey.startsWith('0x')) {
//   privateKey = privateKey.slice(2)
// }

export interface EVMCallRequest {
  address: Address
  fnDeclaration: string[]
  fnName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[]
  txParams: {
    gasLimit?: bigint
    value?: bigint
  }
  RPC: string
}

export async function getPublicClient(RPC: string) {
  try {
    const client = createPublicClient({
      transport: http(RPC),
    })
    return client
  } catch (error) {
    console.error('Error getting public client:', error)
    throw error
  }
}

export async function getWalletClient(RPC: string) {
  try {
    const account = privateKeyToAccount(`0x${privateKey.slice(2)}`)
    const client = createWalletClient({
      account,
      transport: http(RPC),
    })
    return client
  } catch (error) {
    console.error('Error getting wallet client:', error)
    throw error
  }
}

// Using this for now to populate logs with the sender's address
// Later we will get the sender's address via auth
export async function getSender(): Promise<Address> {
  try {
    const account = privateKeyToAccount(`0x${privateKey.slice(2)}`)
    return account.address
  } catch (error) {
    console.error('Error getting sender:', error)
    throw error
  }
}

async function generateTx(call: EVMCallRequest): Promise<{
  gasLimit: bigint
  args: unknown[]
  abi: Abi
  address: Address
  value?: bigint
}> {
  try {
    const publicClient = await getPublicClient(call.RPC)
    const abi = parseAbi(call.fnDeclaration)
    const gasEstimate = await publicClient.estimateContractGas({
      abi,
      address: call.address,
      functionName: call.fnName,
      args: call.args,
      value: call.txParams.value,
    })
    const gasLimit = (gasEstimate * 125n) / 100n // Add 25% to the gas estimate
    return {
      gasLimit,
      args: call.args,
      abi,
      address: call.address,
      value: call.txParams.value,
    }
  } catch (error) {
    console.error('Error generating TX...')
    throw error
  }
}

export async function estimateGas(call: EVMCallRequest): Promise<bigint> {
  try {
    const txData = await generateTx(call)
    return txData.gasLimit
  } catch (error) {
    console.error('Error estimating gas...')
    throw error
  }
}

export async function evmCall(call: EVMCallRequest): Promise<Hex> {
  try {
    const walletClient = await getWalletClient(call.RPC)
    const txData = await generateTx(call)
    const txHash = await walletClient.writeContract({
      abi: txData.abi,
      address: txData.address,
      functionName: call.fnName,
      args: txData.args,
      gas: txData.gasLimit,
      value: txData.value,
      chain: null, // This was specified via the RPC when we created the client
    })
    return txHash
  } catch (error) {
    console.error('Error calling EVM:', error)
    throw error
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function evmRead(call: EVMCallRequest): Promise<any> {
  try {
    const publicClient = await getPublicClient(call.RPC)
    const abi = parseAbi(call.fnDeclaration)
    const result = await publicClient.readContract({
      abi,
      address: call.address,
      functionName: call.fnName,
      args: call.args,
    })
    return result
  } catch (error) {
    console.error('Error reading EVM:', error)
    throw error
  }
}

export async function confirmTx(
  txHash: Hex,
  RPC: string,
  timeout?: number,
): Promise<void> {
  try {
    const publicClient = await getPublicClient(RPC)
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
      timeout,
    })
    if (receipt && receipt.status === 'reverted') {
      throw new Error(`Transaction reverted: ${JSON.stringify(receipt)}`)
    }
  } catch (error) {
    console.error('Error confirming transaction:', error)
    throw error
  }
}

export async function callAndConfirm(
  call: EVMCallRequest,
  timeout?: number,
): Promise<Hex> {
  try {
    console.log('Calling and confirming EVM')
    const txHash = await evmCall(call)
    console.log('Got TX Hash:', txHash)
    console.log('Confirming TX...')
    await confirmTx(txHash, call.RPC, timeout)
    console.log('TX Confirmed! ', txHash)
    return txHash
  } catch (error) {
    console.error('Error calling and confirming EVM:', error)
    throw error
  }
}
