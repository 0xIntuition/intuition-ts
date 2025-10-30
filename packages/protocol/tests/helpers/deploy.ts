import { encodeFunctionData, isAddress, parseEther, type Address } from 'viem'
import { expect } from 'vitest'

import {
  AtomWalletFactoryAbi,
  AtomWalletFactoryBytecode,
  BondingCurveRegistryAbi,
  BondingCurveRegistryBytecode,
  LinearCurveAbi,
  LinearCurveBytecode,
  MultiVaultAbi,
  MultiVaultBytecode,
  OffsetProgressiveCurveAbi,
  OffsetProgressiveCurveBytecode,
  SatelliteEmissionsControllerAbi,
  SatelliteEmissionsControllerBytecode,
  TransparentUpgradeableProxyAbi,
  TransparentUpgradeableProxyBytecode,
  TrustAbi,
  TrustBondingAbi,
  TrustBondingBytecode,
  TrustBytecode,
} from '../../src/contracts/index.js'
import { ALICE } from './constants.js'
import { publicClient, walletClient } from './utils.js'

// Add missing interface imports for proper configuration
interface MetaERC20DispatchInit {
  recipientAddress: Address
  hubOrSpoke: Address
  recipientDomain: number
  gasLimit: number
  finalityState: number
}

interface CoreEmissionsControllerInit {
  startTimestamp: bigint
  emissionsLength: bigint
  emissionsPerEpoch: bigint
  emissionsReductionCliff: bigint
  emissionsReductionBasisPoints: bigint
}

export async function deployAndInit(): Promise<Address> {
  // Deploy TRUST token first (needed for TrustBonding initialization)
  // Deploy Trust implementation
  const hashTrustImpl = await walletClient.deployContract({
    abi: TrustAbi,
    bytecode: TrustBytecode,
    account: ALICE,
    args: [],
  })

  const receiptTrustImpl = await publicClient.waitForTransactionReceipt({
    hash: hashTrustImpl,
  })

  const addressTrustImpl = receiptTrustImpl.contractAddress!

  // Deploy Trust proxy
  const hashTrustProxy = await walletClient.deployContract({
    abi: TransparentUpgradeableProxyAbi,
    bytecode: TransparentUpgradeableProxyBytecode,
    account: ALICE,
    args: [addressTrustImpl, ALICE, '0x'],
  })

  const receiptTrustProxy = await publicClient.waitForTransactionReceipt({
    hash: hashTrustProxy,
  })

  const addressTrust = receiptTrustProxy.contractAddress!

  // Initialize Trust token
  await walletClient.writeContract({
    abi: TrustAbi,
    address: addressTrust,
    functionName: 'reinitialize',
    args: [ALICE, ALICE], // admin, controller
    account: ALICE,
  })

  // Deploy SatelliteEmissionsController implementation
  const hashSatelliteImpl = await walletClient.deployContract({
    abi: SatelliteEmissionsControllerAbi,
    bytecode: SatelliteEmissionsControllerBytecode,
    account: ALICE,
    args: [],
  })

  const receiptSatelliteImpl = await publicClient.waitForTransactionReceipt({
    hash: hashSatelliteImpl,
  })

  const addressSatelliteImpl = receiptSatelliteImpl.contractAddress!

  // Deploy SatelliteEmissionsController proxy
  const hashSatelliteProxy = await walletClient.deployContract({
    abi: TransparentUpgradeableProxyAbi,
    bytecode: TransparentUpgradeableProxyBytecode,
    account: ALICE,
    args: [addressSatelliteImpl, ALICE, '0x'],
  })

  const receiptSatelliteProxy = await publicClient.waitForTransactionReceipt({
    hash: hashSatelliteProxy,
  })

  const addressSatelliteEmissionsController =
    receiptSatelliteProxy.contractAddress!

  // Deploy TrustBonding implementation
  const hashTrustBondingImpl = await walletClient.deployContract({
    abi: TrustBondingAbi,
    bytecode: TrustBondingBytecode,
    account: ALICE,
    args: [],
  })

  const receiptTrustBondingImpl = await publicClient.waitForTransactionReceipt({
    hash: hashTrustBondingImpl,
  })

  const addressTrustBondingImpl = receiptTrustBondingImpl.contractAddress!

  // Deploy TrustBonding proxy
  const hashTrustBondingProxy = await walletClient.deployContract({
    abi: TransparentUpgradeableProxyAbi,
    bytecode: TransparentUpgradeableProxyBytecode,
    account: ALICE,
    args: [addressTrustBondingImpl, ALICE, '0x'],
  })

  const receiptTrustBondingProxy = await publicClient.waitForTransactionReceipt(
    {
      hash: hashTrustBondingProxy,
    },
  )

  const addressTrustBonding = receiptTrustBondingProxy.contractAddress!

  // Deploy AtomWalletFactory implementation
  const hashAtomWalletFactoryImpl = await walletClient.deployContract({
    abi: AtomWalletFactoryAbi,
    bytecode: AtomWalletFactoryBytecode,
    account: ALICE,
    args: [],
  })

  const receiptAtomWalletFactoryImpl =
    await publicClient.waitForTransactionReceipt({
      hash: hashAtomWalletFactoryImpl,
    })

  const addressAtomWalletFactoryImpl =
    receiptAtomWalletFactoryImpl.contractAddress!

  // Deploy AtomWalletFactory proxy
  const hashAtomWalletFactoryProxy = await walletClient.deployContract({
    abi: TransparentUpgradeableProxyAbi,
    bytecode: TransparentUpgradeableProxyBytecode,
    account: ALICE,
    args: [addressAtomWalletFactoryImpl, ALICE, '0x'],
  })

  const receiptAtomWalletFactoryProxy =
    await publicClient.waitForTransactionReceipt({
      hash: hashAtomWalletFactoryProxy,
    })

  const addressAtomWalletFactory =
    receiptAtomWalletFactoryProxy.contractAddress!

  const hashLinearCurve = await walletClient.deployContract({
    abi: LinearCurveAbi,
    bytecode: LinearCurveBytecode,
    account: ALICE,
    args: ['Linear'],
  })

  const receiptLinearCurve = await publicClient.waitForTransactionReceipt({
    hash: hashLinearCurve,
  })

  const addressLinearCurve = receiptLinearCurve.contractAddress!

  const hashOPCurve = await walletClient.deployContract({
    abi: OffsetProgressiveCurveAbi,
    bytecode: OffsetProgressiveCurveBytecode,
    account: ALICE,
    args: ['OffsetProgresive', 2n, BigInt(5e35)],
  })

  const receiptOPCurve = await publicClient.waitForTransactionReceipt({
    hash: hashOPCurve,
  })

  const addressOffsetProgressiveCurve = receiptOPCurve.contractAddress!

  const hashBondingCurveRegistry = await walletClient.deployContract({
    abi: BondingCurveRegistryAbi,
    bytecode: BondingCurveRegistryBytecode,
    account: ALICE,
    args: [ALICE],
  })

  const receiptBondingCurveRegistry =
    await publicClient.waitForTransactionReceipt({
      hash: hashBondingCurveRegistry,
    })

  const addressBondingCurveRegistry =
    receiptBondingCurveRegistry.contractAddress!

  await walletClient.writeContract({
    abi: BondingCurveRegistryAbi,
    address: addressBondingCurveRegistry,
    functionName: 'addBondingCurve',
    args: [addressLinearCurve],
  })

  await walletClient.writeContract({
    abi: BondingCurveRegistryAbi,
    address: addressBondingCurveRegistry,
    functionName: 'addBondingCurve',
    args: [addressOffsetProgressiveCurve],
  })

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
            admin: ALICE,
            protocolMultisig: ALICE,
            feeDenominator: 10000n, // Common denominator for fee
            minDeposit: parseEther('0.001'), // Minimum deposit amount in wei
            minShare: 1000000n, // Minimum share amount (e.g., for vault initialization)
            atomDataMaxLength: 1000n, // Maximum length of the atom URI data that can be passed when creating atom vaultsj
            decimalPrecision: 18n, // decimal precision used for calculating share prices
            trustBonding: addressTrustBonding,
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
            permit2: '0x0000000000000000000000000000000000000000', // Permit2 not deployed in test
            entryPoint: '0x0000000000000000000000000000000000000000', // EntryPoint not deployed in test
            atomWarden: '0x0000000000000000000000000000000000000000', // AtomWarden not deployed in test
            atomWalletBeacon: '0x0000000000000000000000000000000000000000', // AtomWalletBeacon not deployed in test
            atomWalletFactory: addressAtomWalletFactory,
          },
          {
            exitFee: 500n,
            entryFee: 500n,
            protocolFee: 100n,
          },
          {
            registry: addressBondingCurveRegistry,
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

  // Initialize AtomWalletFactory with the MultiVault proxy address
  await walletClient.writeContract({
    abi: AtomWalletFactoryAbi,
    address: addressAtomWalletFactory,
    functionName: 'initialize',
    args: [address],
    account: ALICE,
  })

  // Initialize SatelliteEmissionsController with proper configuration
  const metaERC20DispatchInit: MetaERC20DispatchInit = {
    recipientAddress: '0x0000000000000000000000000000000000000000', // Base emissions controller placeholder
    hubOrSpoke: '0x007700aa28A331B91219Ffa4A444711F0D9E57B5', // MetaLayer hub/spoke address
    recipientDomain: 8453, // Base chain domain
    gasLimit: 200000,
    finalityState: 1, // FINALIZED
  }

  const coreEmissionsInit: CoreEmissionsControllerInit = {
    startTimestamp: BigInt(Math.floor(Date.now() / 1000) + 100), // Start in 100 seconds
    emissionsLength: 86400n, // 1 day
    emissionsPerEpoch: parseEther('1000'), // 1000 TRUST per epoch
    emissionsReductionCliff: 1n, // 1 epoch
    emissionsReductionBasisPoints: 1000n, // 10%
  }

  await walletClient.writeContract({
    abi: SatelliteEmissionsControllerAbi,
    address: addressSatelliteEmissionsController,
    functionName: 'initialize',
    args: [
      ALICE, // owner
      addressTrustBonding, // trustBonding
      '0x0000000000000000000000000000000000000000', // base emissions controller placeholder
      metaERC20DispatchInit,
      coreEmissionsInit,
    ],
    account: ALICE,
  })

  // Initialize TrustBonding with required parameters
  await walletClient.writeContract({
    abi: TrustBondingAbi,
    address: addressTrustBonding,
    functionName: 'initialize',
    args: [
      ALICE, // owner
      addressTrust, // trust token
      1209600n, // epochLength (2 weeks in seconds)
      address, // multiVault
      addressSatelliteEmissionsController, // emissions controller
      5000n, // systemUtilizationLowerBound (50%)
      2500n, // personalUtilizationLowerBound (25%)
    ],
    account: ALICE,
  })

  return address
}
