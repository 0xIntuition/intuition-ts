import { Multivault } from '@0xintuition/protocol'

import pinataSDK from '@pinata/sdk'
import { createPublicClient, createWalletClient, http } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'

if (!process.env.PINATA_JWT_KEY) {
  throw new Error('PINATA_JWT_KEY is not set')
}
if (!process.env.RPC_URL) {
  throw new Error('RPC_URL is required')
}
if (!process.env.SEED_PHRASE) {
  throw new Error('SEED_PHRASE is required')
}

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.RPC_URL),
})

const account = mnemonicToAccount(process.env.SEED_PHRASE, { accountIndex: 0 })

const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(process.env.RPC_URL),
  account,
})

export const multivault = new Multivault({
  public: publicClient,
  wallet: walletClient,
})

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT_KEY })

export async function pinataPinJSON(obj: any): Promise<string> {
  const result = await pinata.pinJSONToIPFS(obj, {
    pinataOptions: { cidVersion: 0 },
  })
  return result.IpfsHash
}
export async function getOrCreateAtom(multivault: Multivault, atomUri: string) {
  const atomId = await multivault.getVaultIdFromUri(atomUri)
  if (atomId) {
    return atomId
  } else {
    console.log(`Creating atom: ${atomUri}`)
    const { vaultId } = await multivault.createAtom(atomUri)
    return vaultId
  }
}
