import {
  multiVaultAbi,
  multiVaultBytecode,
  TransparentUpgradeableProxyAbi,
  TransparentUpgradeableProxyBytecode,
} from '@0xintuition/protocol'

import { isAddress, parseEther, parseUnits, type Address } from 'viem'
import { expect } from 'vitest'

import { initEncode } from '../../src/chain/init-encode.js'
import { ALICE, BOB } from './constants.js'
import { publicClient, walletClient } from './utils.js'

export async function deployAndInit(): Promise<Address> {
  const hashEthMultiVault = await walletClient.deployContract({
    abi: multiVaultAbi,
    bytecode: multiVaultBytecode,
    account: ALICE,
  })

  const receiptEthMultiVault = await publicClient.waitForTransactionReceipt({
    hash: hashEthMultiVault,
  })

  const addressEthMultiVault = receiptEthMultiVault.contractAddress!

  const hashTransparentUpgradeableProxy = await walletClient.deployContract({
    abi: TransparentUpgradeableProxyAbi,
    bytecode: TransparentUpgradeableProxyBytecode,
    account: ALICE,
    args: [
      addressEthMultiVault, // Address of the MultiVault contract
      ALICE, // Admin address
      initEncode({
        generalConfig: {
          admin: BOB,
          protocolMultisig: BOB,
          feeDenominator: 10000n, // Common denominator for fee
          minDeposit: parseEther('0.00042'), // Minimum deposit amount in wei
          minShare: 100000n, // Minimum share amount (e.g., for vault initialization)
          atomUriMaxLength: 250n, // Maximum length of the atom URI data that can be passed when creating atom vaults
          decimalPrecision: parseUnits('1', 18), // decimal precision used for calculating share prices
          minDelay: BigInt(1 * 24 * 60 * 60 * 1000), // minimum delay for timelocked transactions
        },
        atomConfig: {
          atomWalletInitialDepositAmount: parseEther('0.00003'), // Fee charged for purchasing vault shares for the atom wallet upon creation
          atomCreationProtocolFee: parseEther('0.00003'), // Fee charged for creating an atom
        },
        tripleConfig: {
          tripleCreationProtocolFee: parseEther('0.0003'), // Fee for creating a triple
          totalAtomDepositsOnTripleCreation: parseEther('0.00003'), // Static fee going towards increasing the amount of assets in the underlying atom vaults
          atomDepositFractionForTriple: 900n, // Fee for equity in atoms when creating a triple
        },
        walletConfig: {
          permit2: ALICE, // Permit2 on Base
          entryPoint: ALICE, // EntryPoint address on Base
          atomWarden: ALICE, // AtomWarden address (should be a multisig in production)
          atomWalletBeacon: ALICE, // Address of the AtomWalletBeacon contract
        },
        defaultVaultFees: {
          entryFee: 500n, // Entry fee for vault 0
          exitFee: 500n, // Exit fee for vault 0
          protocolFee: 100n, // Protocol fee for vault 0
        },
        bondingCurveConfig: {
          registry: ALICE, // Address of the registry contract
          defaultCurveId: BigInt(1), // Default curve ID for vault 0
        },
      }),
    ],
  })

  const receiptTransparentUpgradeableProxy =
    await publicClient.waitForTransactionReceipt({
      hash: hashTransparentUpgradeableProxy,
    })

  const address = receiptTransparentUpgradeableProxy.contractAddress!

  expect(address).toBeDefined()
  expect(isAddress(address)).toBe(true)

  expect(receiptTransparentUpgradeableProxy).toBeDefined()
  const receipt2 = await publicClient.waitForTransactionReceipt({
    hash: receiptTransparentUpgradeableProxy.transactionHash,
  })
  expect(receipt2).toBeDefined()
  return address
}
