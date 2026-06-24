#!/usr/bin/env node
import fs from 'node:fs'
import process from 'node:process'

import { configureClient, usePinThingMutation } from '@0xintuition/graphql'
import {
  configureSdk,
  createAtomFromIpfsUpload,
  createAtomFromThing,
  getMultiVaultAddressFromChainId,
  intuitionTestnet,
  multiVaultGetAtomCost,
  pinThing,
  uploadJsonToPinata,
} from '@0xintuition/sdk'

import {
  createPublicClient,
  createWalletClient,
  formatEther,
  http,
  isAddress,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

const usage = `Usage:
  pnpm --filter @0xintuition/sdk smoke:pinning-lifecycle

Required, one of:
  INTUITION_PIN_API_KEY              API key for the gated Intuition pinning endpoint
  INTUITION_PIN_API_KEY_FILE         File containing INTUITION_PIN_API_KEY

Optional:
  INTUITION_PIN_API_URL              Override the gated pinning GraphQL endpoint
  PINATA_API_JWT                     Pinata JWT for direct Pinata upload smoke
  PINATA_API_JWT_FILE                File containing PINATA_API_JWT
  INTUITION_RUN_ONCHAIN=1            Submit a testnet createAtomFromThing transaction
  INTUITION_RUN_PINATA_ATOM=1        Also submit createAtomFromIpfsUpload when onchain is enabled
  INTUITION_TESTNET_PRIVATE_KEY      Funded testnet private key for onchain smoke
  INTUITION_TESTNET_PRIVATE_KEY_FILE File containing INTUITION_TESTNET_PRIVATE_KEY
  INTUITION_TESTNET_RPC_URL          Override Intuition testnet RPC URL
  INTUITION_TESTNET_MULTIVAULT_ADDRESS Override MultiVault address
`

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(usage)
  process.exit(0)
}

const pinApiKey = readSecret(
  'INTUITION_PIN_API_KEY',
  'INTUITION_PIN_API_KEY_FILE',
)
const pinApiUrl = readOptional('INTUITION_PIN_API_URL')
const pinataApiJwt = readSecret('PINATA_API_JWT', 'PINATA_API_JWT_FILE')
const testnetPrivateKey = readSecret(
  'INTUITION_TESTNET_PRIVATE_KEY',
  'INTUITION_TESTNET_PRIVATE_KEY_FILE',
)
const runOnchain = process.env.INTUITION_RUN_ONCHAIN === '1'
const runPinataAtom = process.env.INTUITION_RUN_PINATA_ATOM === '1'

if (!pinApiKey) {
  throw new Error(
    'Missing INTUITION_PIN_API_KEY. Set it directly or use INTUITION_PIN_API_KEY_FILE.',
  )
}

const pinConfig = {
  pinApiKey,
  ...(pinApiUrl ? { pinApiUrl } : {}),
}

const results = new Map()

await step('generated GraphQL pinThing mutation', async () => {
  configureClient(pinConfig)
  const data = await usePinThingMutation.fetcher(
    createThing('generated GraphQL fetcher'),
  )()
  const uri = data.pinThing?.uri
  assertIpfsUri(uri, 'generated GraphQL pinThing')
  results.set('generatedGraphqlPinThingUri', uri)
  logResult('URI', uri)
})

await step('SDK configureSdk + pinThing', async () => {
  configureSdk(pinConfig)
  const uri = await pinThing(createThing('SDK configured pinThing'))
  assertIpfsUri(uri, 'SDK pinThing')
  results.set('sdkConfiguredPinThingUri', uri)
  logResult('URI', uri)
})

await step('SDK per-call pinThing key override', async () => {
  configureSdk({ pinApiKey: undefined, pinApiUrl: undefined })
  const uri = await pinThing(createThing('SDK per-call pinThing'), pinConfig)
  assertIpfsUri(uri, 'SDK per-call pinThing')
  results.set('sdkPerCallPinThingUri', uri)
  logResult('URI', uri)
})

if (pinataApiJwt) {
  await step('direct Pinata JSON upload', async () => {
    const response = await uploadJsonToPinata(
      pinataApiJwt,
      createPinataPayload('direct upload'),
    )

    if (!response.IpfsHash) {
      throw new Error('Pinata upload did not return IpfsHash')
    }

    results.set('pinataIpfsHash', response.IpfsHash)
    logResult('CID', response.IpfsHash)
  })
} else {
  logSkip('direct Pinata JSON upload', 'PINATA_API_JWT was not provided')
}

if (runOnchain) {
  if (!testnetPrivateKey) {
    throw new Error(
      'INTUITION_RUN_ONCHAIN=1 requires INTUITION_TESTNET_PRIVATE_KEY or INTUITION_TESTNET_PRIVATE_KEY_FILE.',
    )
  }

  await runOnchainSmoke({
    pinConfig,
    pinataApiJwt,
    runPinataAtom,
    privateKey: testnetPrivateKey,
  })
} else {
  logSkip('testnet atom creation', 'set INTUITION_RUN_ONCHAIN=1 to enable it')
}

console.log('\nSummary')
for (const [key, value] of results.entries()) {
  console.log(`  ${key}: ${value}`)
}

async function runOnchainSmoke({
  pinConfig,
  pinataApiJwt,
  runPinataAtom,
  privateKey,
}) {
  const rpcUrl = readOptional('INTUITION_TESTNET_RPC_URL')
  const chain = rpcUrl
    ? {
        ...intuitionTestnet,
        rpcUrls: {
          ...intuitionTestnet.rpcUrls,
          default: { http: [rpcUrl] },
          public: { http: [rpcUrl] },
        },
      }
    : intuitionTestnet
  const transport = http(rpcUrl || undefined)
  const publicClient = createPublicClient({ chain, transport })
  const account = privateKeyToAccount(normalizePrivateKey(privateKey))
  const walletClient = createWalletClient({ account, chain, transport })
  const address =
    readOptional('INTUITION_TESTNET_MULTIVAULT_ADDRESS') ??
    getMultiVaultAddressFromChainId(chain.id)

  if (!isAddress(address)) {
    throw new Error(`Invalid INTUITION_TESTNET_MULTIVAULT_ADDRESS: ${address}`)
  }

  const atomCost = await multiVaultGetAtomCost({ publicClient, address })
  const balance = await publicClient.getBalance({ address: account.address })
  const expectedAtomCount = runPinataAtom && pinataApiJwt ? 2n : 1n
  const minimumAssets = atomCost * expectedAtomCount

  console.log(`  Account: ${account.address}`)
  console.log(`  MultiVault: ${address}`)
  console.log(
    `  Balance: ${formatEther(balance)} ${chain.nativeCurrency.symbol}`,
  )
  console.log(
    `  Atom cost: ${formatEther(atomCost)} ${chain.nativeCurrency.symbol}`,
  )

  if (balance < minimumAssets) {
    throw new Error(
      `Insufficient balance for ${expectedAtomCount} atom creation(s). Required assets before gas: ${formatEther(minimumAssets)} ${chain.nativeCurrency.symbol}.`,
    )
  }

  await step('testnet createAtomFromThing', async () => {
    configureSdk(pinConfig)
    const result = await createAtomFromThing(
      { address, publicClient, walletClient },
      createThing('testnet createAtomFromThing'),
      pinConfig,
    )

    assertIpfsUri(result.uri, 'createAtomFromThing URI')
    results.set('createAtomFromThingUri', result.uri)
    results.set('createAtomFromThingTx', result.transactionHash)
    logResult('URI', result.uri)
    logResult('TX', transactionUrl(chain, result.transactionHash))
  })

  if (runPinataAtom && pinataApiJwt) {
    await step('testnet createAtomFromIpfsUpload with Pinata', async () => {
      const result = await createAtomFromIpfsUpload(
        { address, publicClient, walletClient, pinataApiJWT: pinataApiJwt },
        createPinataPayload('testnet createAtomFromIpfsUpload'),
      )

      assertIpfsUri(result.uri, 'createAtomFromIpfsUpload URI')
      results.set('createAtomFromIpfsUploadUri', result.uri)
      results.set('createAtomFromIpfsUploadTx', result.transactionHash)
      logResult('URI', result.uri)
      logResult('TX', transactionUrl(chain, result.transactionHash))
    })
  } else if (runPinataAtom) {
    logSkip(
      'testnet createAtomFromIpfsUpload with Pinata',
      'PINATA_API_JWT was not provided',
    )
  } else {
    logSkip(
      'testnet createAtomFromIpfsUpload with Pinata',
      'set INTUITION_RUN_PINATA_ATOM=1 to enable it',
    )
  }
}

async function step(label, callback) {
  console.log(`\nRunning: ${label}`)
  await callback()
  console.log(`Passed: ${label}`)
}

function createThing(label) {
  const stamp = new Date().toISOString()
  return {
    name: `SDK pinning lifecycle smoke - ${label} - ${stamp}`,
    description: `Live SDK pinning lifecycle smoke for ${label}.`,
    image: null,
    url: 'https://intuition.systems',
  }
}

function createPinataPayload(label) {
  return {
    name: `SDK Pinata lifecycle smoke - ${label}`,
    description: `Live Pinata smoke for ${label}.`,
    timestamp: new Date().toISOString(),
  }
}

function assertIpfsUri(value, label) {
  if (typeof value !== 'string' || !value.startsWith('ipfs://')) {
    throw new Error(`${label} did not return an ipfs:// URI`)
  }
}

function readOptional(name) {
  const value = process.env[name]?.trim()
  return value || undefined
}

function readSecret(envName, fileEnvName) {
  const value = readOptional(envName)
  if (value) {
    return value
  }

  const filePath = readOptional(fileEnvName)
  if (!filePath) {
    return undefined
  }

  return fs.readFileSync(filePath, 'utf8').trim()
}

function normalizePrivateKey(privateKey) {
  const trimmed = privateKey.trim()
  return trimmed.startsWith('0x') ? trimmed : `0x${trimmed}`
}

function transactionUrl(chain, transactionHash) {
  const explorerUrl = chain.blockExplorers?.default?.url
  return explorerUrl ? `${explorerUrl}/tx/${transactionHash}` : transactionHash
}

function logResult(label, value) {
  console.log(`  ${label}: ${value}`)
}

function logSkip(label, reason) {
  console.log(`\nSkipped: ${label}`)
  console.log(`  Reason: ${reason}`)
}
