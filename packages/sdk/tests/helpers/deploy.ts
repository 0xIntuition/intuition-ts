import { multiVaultAbi, multiVaultBytecode } from '@0xintuition/protocol'

import { isAddress, parseEther, parseUnits, type Address } from 'viem'
import { expect } from 'vitest'

import { ALICE, BOB } from './constants.js'
import { publicClient, walletClient } from './utils.js'

export async function deployAndInit(): Promise<Address> {
  const hash = await walletClient.deployContract({
    abi: multiVaultAbi,
    bytecode: multiVaultBytecode,
    account: ALICE,
  })

  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  })

  const address = receipt.contractAddress!

  expect(address).toBeDefined()
  expect(isAddress(address)).toBe(true)

  const hash2 = await walletClient.writeContract({
    address,
    account: ALICE,
    abi: multiVaultAbi,
    functionName: 'init',
    args: [
      {
        admin: BOB,
        protocolMultisig: BOB,
        feeDenominator: 10000n, // Common denominator for fee
        minDeposit: parseEther('0.00042'), // Minimum deposit amount in wei
        minShare: 10000n, // Minimum share amount (e.g., for vault initialization)
        atomUriMaxLength: 250n, // Maximum length of the atom URI data that can be passed when creating atom vaults
        decimalPrecision: parseUnits('1', 18), // decimal precision used for calculating share prices
        minDelay: BigInt(1 * 24 * 60 * 60 * 1000), // minimum delay for timelocked transactions
      },
      {
        atomWalletInitialDepositAmount: parseEther('0.00003'), // Fee charged for purchasing vault shares for the atom wallet upon creation
        atomCreationProtocolFee: parseEther('0.00003'), // Fee charged for creating an atom
      },
      {
        tripleCreationProtocolFee: parseEther('0.0003'), // Fee for creating a triple
        totalAtomDepositsOnTripleCreation: parseEther('0.00003'), // Static fee going towards increasing the amount of assets in the underlying atom vaults
        atomDepositFractionForTriple: 900n, // Fee for equity in atoms when creating a triple
      },
      {
        permit2: ALICE, // Permit2 on Base
        entryPoint: ALICE, // EntryPoint address on Base
        atomWarden: ALICE, // AtomWarden address (should be a multisig in production)
        atomWalletBeacon: ALICE, // Address of the AtomWalletBeacon contract
      },
      {
        entryFee: 500n, // Entry fee for vault 0
        exitFee: 500n, // Exit fee for vault 0
        protocolFee: 100n, // Protocol fee for vault 0
      },
      {
        registry: ALICE, // Address of the registry contract
        defaultCurveId: BigInt(0), // Default curve ID for vault 0
      },
    ],
  })

  expect(hash2).toBeDefined()
  const receipt2 = await publicClient.waitForTransactionReceipt({
    hash: hash2,
  })
  expect(receipt2).toBeDefined()
  return address
}
