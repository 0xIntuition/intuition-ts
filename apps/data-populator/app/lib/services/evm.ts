import { ethers } from 'ethers'

const environment = process.env.ENVIRONMENT
const privateKey =
  environment === 'dev' ? process.env.PRIVATE_KEY_DEV : process.env.PRIVATE_KEY

if (!privateKey) {
  throw new Error('PRIVATE_KEY must be set')
}

export interface EVMCallRequest {
  address: string
  fnDeclaration: string[]
  fnName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[]
  txParams: object
  RPC: string
}

export async function getProvider(
  RPC: string,
): Promise<ethers.JsonRpcProvider> {
  try {
    const provider = new ethers.JsonRpcProvider(RPC) as ethers.JsonRpcProvider
    return provider
  } catch (error) {
    console.error('Error getting provider:', error)
    throw error
  }
}

export async function getSigner(
  provider: ethers.JsonRpcProvider,
): Promise<ethers.Signer> {
  try {
    const sk = privateKey as string
    const signer = new ethers.Wallet(sk, provider) as ethers.Signer
    return signer
  } catch (error) {
    console.error('Error getting signer:', error)
    throw error
  }
}

// Using this for now to populate logs with the sender's address
// Later we will get the sender's address via auth
export async function getSender(): Promise<string> {
  try {
    const sk = privateKey as string
    const provider = new ethers.JsonRpcProvider()
    const signer = new ethers.Wallet(sk, provider) as ethers.Signer
    return await signer.getAddress()
  } catch (error) {
    console.error('Error getting sender:', error)
    throw error
  }
}

async function generateTx(
  call: EVMCallRequest,
): Promise<ethers.ContractTransaction> {
  try {
    const provider = await getProvider(call.RPC)
    const signer = await getSigner(provider)

    let contract: ethers.Contract = new ethers.Contract(
      call.address,
      call.fnDeclaration,
      provider,
    ) as ethers.Contract
    contract = contract.connect(signer) as ethers.Contract

    const tx = (await contract[call.fnName].populateTransaction(
      ...call.args,
      call.txParams,
    )) as ethers.ContractTransaction

    const gasEstimate = await signer.estimateGas(tx)
    tx.gasLimit = (gasEstimate * BigInt(125)) / BigInt(100) // Add 25% to the gas estimate

    return tx
  } catch (error) {
    console.error('Error generating TX...')
    throw error
  }
}

export async function estimateGas(call: EVMCallRequest): Promise<number> {
  try {
    const tx = await generateTx(call)
    if (tx.gasLimit === undefined) {
      throw new Error('Gas limit is undefined')
    }
    return tx.gasLimit.toString() as unknown as number
  } catch (error) {
    console.error('Error estimating gas...')
    // console.log("Request: ", call);
    throw error
  }
}

export async function evmCall(call: EVMCallRequest): Promise<string> {
  try {
    const provider = await getProvider(call.RPC)
    const signer = await getSigner(provider)

    const tx = await generateTx(call)

    // ! TESTING
    // console.log("TX:", tx);

    const txHash = (await signer.sendTransaction(
      tx,
    )) as ethers.TransactionResponse

    return txHash.hash as string
  } catch (error) {
    console.error('Error calling EVM:', error)
    throw error
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function evmRead(call: EVMCallRequest): Promise<any> {
  try {
    const provider = await getProvider(call.RPC)
    const contract: ethers.Contract = new ethers.Contract(
      call.address,
      call.fnDeclaration,
      provider,
    ) as ethers.Contract
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await contract[call.fnName](...call.args)) as any
    return result
  } catch (error) {
    console.error('Error reading EVM:', error)
    throw error
  }
}

export async function confirmTx(
  txHash: string,
  RPC: string,
  timeout?: number,
): Promise<void> {
  try {
    const provider = await getProvider(RPC)
    await provider.waitForTransaction(txHash, 1, timeout)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const receipt = await provider.getTransactionReceipt(txHash)
    if (receipt && receipt.status === 0) {
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
): Promise<string> {
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
