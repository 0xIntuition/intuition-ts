import { type Address, parseEther, parseUnits } from 'viem'
import { ADMIN, CONTRACT_ADDRESS, MNEMONIC } from './constants.js'
import { publicClient, adminClient } from './utils.js'
import { bytecode } from './bytecode'
import { abi, Multivault } from '@0xintuition/protocol'
import { mnemonicToAccount } from 'viem/accounts'

let initialized = false

export async function getOrDeployAndInit(): Promise<Address> {
  if (initialized) {
    return CONTRACT_ADDRESS
  }
  // Check if contract is already deployed and initialized
  const multivault = new Multivault(
    // @ts-ignore
    { public: publicClient, wallet: adminClient },
    CONTRACT_ADDRESS,
  )
  try {
    const config = await multivault.getGeneralConfig()
    if (config) {
      return CONTRACT_ADDRESS
    }
  } catch (e) {
    console.log('Contract not found. Deploying...')
  }

  // Deploy contract
  const hash = await adminClient.deployContract({
    abi,
    bytecode,
    account: ADMIN,
  })

  console.log(`Waiting for tx hash: ${hash}`)
  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  })

  const address = receipt.contractAddress!

  console.log(`Contract deployed at: ${address}`)
  console.log(`Initializing contract...`)
  const hash2 = await adminClient.writeContract({
    address,
    account: ADMIN,
    abi,
    functionName: 'init',
    args: [
      {
        admin: ADMIN.address,
        protocolVault: ADMIN.address,
        feeDenominator: 10000n, // Common denominator for fee
        minDeposit: parseEther('0.0003'), // Minimum deposit amount in wei
        minShare: 10000n, // Minimum share amount (e.g., for vault initialization)
        atomUriMaxLength: 250n, // Maximum length of the atom URI data that can be passed when creating atom vaults
        decimalPrecision: parseUnits('1', 18), // decimal precision used for calculating share prices
        minDelay: BigInt(1 * 24 * 60 * 60 * 1000), // minimum delay for timelocked transactions
      },
      {
        atomWalletInitialDepositAmount: parseEther('0.0001'), // Fee charged for purchasing vault shares for the atom wallet upon creation
        atomCreationProtocolFee: parseEther('0.0002'), // Fee charged for creating an atom
      },
      {
        tripleCreationProtocolFee: parseEther('0.0002'), // Fee for creating a triple
        atomDepositFractionOnTripleCreation: parseEther('0.0003'), // Static fee going towards increasing the amount of assets in the underlying atom vaults
        atomDepositFractionForTriple: 1500n, // Fee for equity in atoms when creating a triple
      },
      {
        permit2: ADMIN.address, // Permit2 on Base
        entryPoint: ADMIN.address, // EntryPoint address on Base
        atomWarden: ADMIN.address, // AtomWarden address (should be a multisig in production)
        atomWalletBeacon: ADMIN.address, // Address of the AtomWalletBeacon contract
      },
      {
        entryFee: 500n, // Entry fee for vault 0
        exitFee: 500n, // Exit fee for vault 0
        protocolFee: 100n, // Protocol fee for vault 0
      },
    ],
  })

  console.log(`Waiting for tx hash: ${hash2}`)
  await publicClient.waitForTransactionReceipt({
    hash: hash2,
  })

  console.log(`Contract initialized at: ${address}`)

  let hash3
  let accounts = 400
  for (let accountIndex = 0; accountIndex < accounts; accountIndex++) {
    const account = mnemonicToAccount(MNEMONIC, { accountIndex })

    // Faucet
    console.log(
      `${accountIndex}/${accounts} Sending 10 ETH to ${account.address}`,
    )
    hash3 = await adminClient.sendTransaction({
      account: ADMIN,
      value: parseEther('10'),
      to: account.address,
    })
  }

  console.log(`Waiting for tx hash: ${hash3}`)
  await publicClient.waitForTransactionReceipt({
    hash: hash3,
  })
  console.log(`Faucet completed`)

  initialized = true
  return address
}
