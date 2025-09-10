import {
  MultiVaultAbi,
  MultiVaultBytecode,
  TransparentUpgradeableProxyAbi,
  TransparentUpgradeableProxyBytecode,
} from '@0xintuition/protocol'

import {
  encodeFunctionData,
  isAddress,
  parseEther,
  parseUnits,
  type Address,
} from 'viem'
import { expect } from 'vitest'

import { ALICE, BOB } from './constants.js'
import { publicClient, walletClient } from './utils.js'

export async function deployAndInit(): Promise<Address> {
  const hashMultiVault = await walletClient.deployContract({
    abi: MultiVaultAbi,
    bytecode: MultiVaultBytecode,
    account: ALICE,
  })

  const receiptMultiVault = await publicClient.waitForTransactionReceipt({
    hash: hashMultiVault,
  })

  const addressMultiVault = receiptMultiVault.contractAddress!

  const hashTransparentUpgradeableProxy = await walletClient.deployContract({
    abi: TransparentUpgradeableProxyAbi,
    bytecode: TransparentUpgradeableProxyBytecode,
    account: ALICE,
    args: [
      addressMultiVault,
      ALICE,
      encodeFunctionData({
        abi: MultiVaultAbi,
        functionName: 'initialize',
        args: [
          {
            admin: BOB,
            protocolMultisig: BOB,
            feeDenominator: 10000n, // Common denominator for fee
            minDeposit: parseEther('0.001'), // Minimum deposit amount in wei
            minShare: 1000000n, // Minimum share amount (e.g., for vault initialization)
            atomDataMaxLength: 1000n, // Maximum length of the atom URI data that can be passed when creating atom vaultsj
            decimalPrecision: parseUnits('1', 18), // decimal precision used for calculating share prices
            trustBonding: BOB,
          },
          {
            atomWalletDepositFee: 100n,
            atomCreationProtocolFee: parseEther('0.001'),
          },
          {
            tripleCreationProtocolFee: parseEther('0.001'),
            atomDepositFractionForTriple: 300n,
            totalAtomDepositsOnTripleCreation: parseEther('0.001'),
          },
          {
            permit2: ALICE,
            entryPoint: ALICE,
            atomWarden: ALICE,
            atomWalletBeacon: ALICE,
            atomWalletFactory: ALICE,
          },
          {
            exitFee: 500n,
            entryFee: 500n,
            protocolFee: 100n,
          },
          {
            registry: ALICE,
            defaultCurveId: 1n,
          },
        ],
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
