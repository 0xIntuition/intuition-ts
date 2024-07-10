import { Multivault } from '@0xintuition/protocol'

import { Organization, WithContext } from 'schema-dts'
import {
  Address,
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
} from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'

import { getOrCreateAtom, pinataPinJSON } from './utils'

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

const multivault = new Multivault({
  public: publicClient,
  wallet: walletClient,
})

async function main() {
  const accountAtom = await getOrCreateAtom(multivault, account.address)
  console.log(`Account atom: ${accountAtom}`)

  const organizationPredicate = await getOrCreateAtom(
    multivault,
    'https://schema.org/Organization',
  )

  const adminOrganizationJson: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Intuition',
    image: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    email: 'info@intuition.systems',
    url: 'https://intuition.systems',
  }

  const cid = await pinataPinJSON(adminOrganizationJson)
  console.log(`Pinned JSON: ${cid}`)
  const adminOrganizationAtom = await getOrCreateAtom(
    multivault,
    `ipfs://${cid}`,
  )

  console.log(
    `Created atom: ${adminOrganizationAtom} ${adminOrganizationJson.name} `,
  )

  const adminOrganizationTriple = await multivault.createTriple(
    accountAtom,
    organizationPredicate,
    adminOrganizationAtom,
  )
  console.log(
    `Created triple: ${adminOrganizationTriple.vaultId} https://schema.org/Organization ${adminOrganizationJson.name} `,
  )
}

main().catch(console.error)
