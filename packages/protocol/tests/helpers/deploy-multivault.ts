import {
  encodeDeployData,
  encodeFunctionData,
  isAddress,
  parseEther,
  type Abi,
  type Address,
} from 'viem'
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
  TrustBondingAbi,
  TrustBondingBytecode,
} from '../../src/contracts'
import { ALICE } from './constants.js'
import { publicClient, walletClient } from './utils.js'

// ============================================================================
// HELPER FUNCTIONS - Modular deployment utilities
// ============================================================================

/**
 * Deploy a contract implementation
 * @param abi - Contract ABI
 * @param bytecode - Contract bytecode
 * @param constructorArgs - Constructor arguments
 * @param account - Deployer account address
 * @returns Implementation contract address
 */
async function deployImplementation(
  abi: Abi,
  bytecode: `0x${string}`,
  constructorArgs: readonly unknown[],
  account: Address,
): Promise<Address> {
  const deployConfig: Parameters<typeof walletClient.deployContract>[0] = {
    abi,
    bytecode,
    account,
    args: constructorArgs,
  }

  const hash = await walletClient.deployContract(deployConfig)

  const receipt = await publicClient.waitForTransactionReceipt({ hash })

  if (receipt.status === 'reverted') {
    console.error('Deployment failed receipt:', receipt)

    // Try to get the revert reason by simulating the call
    let revertReason = 'Unknown revert reason'
    try {
      await publicClient.call({
        account,
        data: deployConfig.bytecode
          ? (`${deployConfig.bytecode}${deployConfig.args ? encodeDeployData({ abi: deployConfig.abi, bytecode: deployConfig.bytecode, args: deployConfig.args }).slice(deployConfig.bytecode.length) : ''}` as `0x${string}`)
          : undefined,
      })
    } catch (error: any) {
      console.error('Revert reason found during simulation:', error)
      revertReason =
        error.message || error.shortMessage || JSON.stringify(error)
    }

    throw new Error(
      `Implementation deployment failed - transaction reverted. Reason: ${revertReason}`,
    )
  }

  if (!receipt.contractAddress) {
    throw new Error('Implementation deployment failed - no contract address')
  }

  return receipt.contractAddress
}

/**
 * Deploy a TransparentUpgradeableProxy
 * @param implementation - Implementation contract address
 * @param admin - Proxy admin address
 * @param initData - Initialization data (encoded function call)
 * @param account - Deployer account address
 * @returns Proxy contract address
 */
async function deployTransparentProxy(
  implementation: Address,
  admin: Address,
  initData: `0x${string}`,
  account: Address,
): Promise<Address> {
  const hash = await walletClient.deployContract({
    abi: TransparentUpgradeableProxyAbi,
    bytecode: TransparentUpgradeableProxyBytecode,
    account,
    args: [implementation, admin, initData],
  })

  const receipt = await publicClient.waitForTransactionReceipt({ hash })

  if (!receipt.contractAddress) {
    throw new Error('Proxy deployment failed - no contract address')
  }

  return receipt.contractAddress
}

/**
 * Deploy implementation + proxy with initialization in one step
 * @param abi - Contract ABI
 * @param bytecode - Contract bytecode
 * @param constructorArgs - Constructor arguments for implementation
 * @param initData - Initialization data for proxy
 * @param admin - Proxy admin address
 * @param account - Deployer account address
 * @returns Proxy contract address (pointing to implementation)
 */
async function deployProxyWithInit(
  abi: Abi,
  bytecode: `0x${string}`,
  constructorArgs: readonly unknown[],
  initData: `0x${string}`,
  admin: Address,
  account: Address,
): Promise<Address> {
  // Deploy implementation
  const implementation = await deployImplementation(
    abi,
    bytecode,
    constructorArgs,
    account,
  )

  // Deploy proxy with initialization
  const proxy = await deployTransparentProxy(
    implementation,
    admin,
    initData,
    account,
  )

  return proxy
}

// ============================================================================
// CONTRACT-SPECIFIC DEPLOYMENT FUNCTIONS
// ============================================================================

/**
 * Deploy BondingCurveRegistry with transparent proxy
 * @param admin - Admin address for initialization
 * @param proxyAdmin - Proxy admin address (for upgrades)
 * @param account - Deployer account address
 * @returns BondingCurveRegistry proxy address
 */
async function deployBondingCurveRegistry(
  admin: Address,
  proxyAdmin: Address,
  account: Address,
): Promise<Address> {
  const initData = encodeFunctionData({
    abi: BondingCurveRegistryAbi,
    functionName: 'initialize',
    args: [admin],
  })

  return deployProxyWithInit(
    BondingCurveRegistryAbi,
    BondingCurveRegistryBytecode,
    [], // No constructor args
    initData,
    proxyAdmin,
    account,
  )
}

/**
 * Deploy LinearCurve with transparent proxy
 * @param name - Curve name
 * @param proxyAdmin - Proxy admin address (for upgrades)
 * @param account - Deployer account address
 * @returns LinearCurve proxy address
 */
export async function deployLinearCurve(
  name: string,
  proxyAdmin: Address,
  account: Address,
): Promise<Address> {
  const initData = encodeFunctionData({
    abi: LinearCurveAbi,
    functionName: 'initialize',
    args: [name],
  })

  return deployProxyWithInit(
    LinearCurveAbi,
    LinearCurveBytecode,
    [], // No constructor args
    initData,
    proxyAdmin,
    account,
  )
}

/**
 * Deploy OffsetProgressiveCurve (non-proxy version for compatibility)
 * Note: This follows the original deployment pattern without proxy
 * @param name - Curve name
 * @param exponent - Curve exponent
 * @param offset - Curve offset
 * @param account - Deployer account address
 * @returns OffsetProgressiveCurve address
 */
export async function deployOffsetProgressiveCurve(
  name: string,
  exponent: bigint,
  offset: bigint,
  proxyAdmin: Address,
  account: Address,
): Promise<Address> {
  const initData = encodeFunctionData({
    abi: OffsetProgressiveCurveAbi,
    functionName: 'initialize',
    args: [name, exponent, offset],
  })

  return deployProxyWithInit(
    OffsetProgressiveCurveAbi,
    OffsetProgressiveCurveBytecode,
    [], // No constructor args
    initData,
    proxyAdmin,
    account,
  )
}

/**
 * Deploy TrustBonding with transparent proxy
 * @param owner - Owner address
 * @param timelock - Timelock address
 * @param trustToken - Trust token address
 * @param epochLength - Epoch length in seconds
 * @param satelliteEmissionsController - Satellite emissions controller address
 * @param systemUtilizationLowerBound - System utilization lower bound
 * @param personalUtilizationLowerBound - Personal utilization lower bound
 * @param proxyAdmin - Proxy admin address (for upgrades)
 * @param account - Deployer account address
 * @returns TrustBonding proxy address
 */
export async function deployTrustBonding(
  owner: Address,
  timelock: Address,
  trustToken: Address,
  epochLength: bigint,
  satelliteEmissionsController: Address,
  systemUtilizationLowerBound: bigint,
  personalUtilizationLowerBound: bigint,
  proxyAdmin: Address,
  account: Address,
): Promise<Address> {
  const initData = encodeFunctionData({
    abi: TrustBondingAbi,
    functionName: 'initialize',
    args: [
      owner,
      timelock,
      trustToken,
      epochLength,
      satelliteEmissionsController,
      systemUtilizationLowerBound,
      personalUtilizationLowerBound,
    ],
  })

  return deployProxyWithInit(
    TrustBondingAbi,
    TrustBondingBytecode,
    [], // No constructor args
    initData,
    proxyAdmin,
    account,
  )
}

/**
 * Deploy SatelliteEmissionsController with transparent proxy
 * @param admin - Admin address
 * @param baseEmissionsController - Base emissions controller address
 * @param metaERC20DispatchInit - MetaERC20 dispatch initialization config
 * @param checkpointInit - Checkpoint initialization config
 * @param proxyAdmin - Proxy admin address (for upgrades)
 * @param account - Deployer account address
 * @returns SatelliteEmissionsController proxy address
 */
export async function deploySatelliteEmissionsController(
  admin: Address,
  baseEmissionsController: Address,
  metaERC20DispatchInit: {
    hubOrSpoke: Address
    recipientDomain: number
    gasLimit: bigint
    finalityState: number
  },
  checkpointInit: {
    startTimestamp: bigint
    emissionsLength: bigint
    emissionsPerEpoch: bigint
    emissionsReductionCliff: bigint
    emissionsReductionBasisPoints: bigint
  },
  proxyAdmin: Address,
  account: Address,
): Promise<Address> {
  const initData = encodeFunctionData({
    abi: SatelliteEmissionsControllerAbi,
    functionName: 'initialize',
    args: [
      admin,
      baseEmissionsController,
      metaERC20DispatchInit,
      checkpointInit,
    ],
  })

  return deployProxyWithInit(
    SatelliteEmissionsControllerAbi,
    SatelliteEmissionsControllerBytecode,
    [], // No constructor args
    initData,
    proxyAdmin,
    account,
  )
}

/**
 * Deploy AtomWalletFactory with transparent proxy
 * @param multiVault - MultiVault address
 * @param proxyAdmin - Proxy admin address (for upgrades)
 * @param account - Deployer account address
 * @returns AtomWalletFactory proxy address
 */
export async function deployAtomWalletFactory(
  multiVault: Address,
  proxyAdmin: Address,
  account: Address,
): Promise<Address> {
  const initData = encodeFunctionData({
    abi: AtomWalletFactoryAbi,
    functionName: 'initialize',
    args: [multiVault],
  })

  return deployProxyWithInit(
    AtomWalletFactoryAbi,
    AtomWalletFactoryBytecode,
    [], // No constructor args
    initData,
    proxyAdmin,
    account,
  )
}

/**
 * Deploy MultiVault with transparent proxy
 * @param generalConfig - General configuration
 * @param atomConfig - Atom configuration
 * @param tripleConfig - Triple configuration
 * @param walletConfig - Wallet configuration
 * @param vaultFees - Vault fees configuration
 * @param bondingCurveConfig - Bonding curve configuration
 * @param proxyAdmin - Proxy admin address (for upgrades)
 * @param account - Deployer account address
 * @returns MultiVault proxy address
 */
async function deployMultiVault(
  generalConfig: {
    admin: Address
    protocolMultisig: Address
    feeDenominator: bigint
    minDeposit: bigint
    minShare: bigint
    atomDataMaxLength: bigint
    decimalPrecision: bigint
    trustBonding: Address
    feeThreshold: bigint
  },
  atomConfig: {
    atomWalletDepositFee: bigint
    atomCreationProtocolFee: bigint
  },
  tripleConfig: {
    tripleCreationProtocolFee: bigint
    atomDepositFractionForTriple: bigint
    totalAtomDepositsOnTripleCreation: bigint
  },
  walletConfig: {
    permit2: Address
    entryPoint: Address
    atomWarden: Address
    atomWalletBeacon: Address
    atomWalletFactory: Address
  },
  vaultFees: {
    exitFee: bigint
    entryFee: bigint
    protocolFee: bigint
  },
  bondingCurveConfig: {
    registry: Address
    defaultCurveId: bigint
  },
  proxyAdmin: Address,
  account: Address,
): Promise<Address> {
  const initData = encodeFunctionData({
    abi: MultiVaultAbi,
    functionName: 'initialize',
    args: [
      generalConfig,
      atomConfig,
      tripleConfig,
      walletConfig,
      vaultFees,
      bondingCurveConfig,
    ],
  })

  return deployProxyWithInit(
    MultiVaultAbi,
    MultiVaultBytecode,
    [], // No constructor args
    initData,
    proxyAdmin,
    account,
  )
}

// ============================================================================
// MAIN DEPLOYMENT FUNCTION
// ============================================================================

/**
 * Deploy and initialize the complete MultiVault system
 * This includes:
 * - Bonding curves (LinearCurve, OffsetProgressiveCurve)
 * - BondingCurveRegistry (with transparent proxy)
 * - MultiVault (with transparent proxy)
 *
 * @returns MultiVault proxy address
 */
export async function deployAndInit(): Promise<Address> {
  // ========================================================================
  // Deploy Bonding Curves
  // ========================================================================

  // Deploy LinearCurve with transparent proxy
  const addressLinearCurve = await deployLinearCurve(
    'Linear',
    ALICE, // Proxy admin
    ALICE, // Deployer
  )

  // Deploy OffsetProgressiveCurve with transparent proxy
  const addressOffsetProgressiveCurve = await deployOffsetProgressiveCurve(
    'OffsetProgresive',
    BigInt(2e18),
    BigInt(5e35),
    ALICE, // Proxy admin
    ALICE, // Deployer
  )

  // ========================================================================
  // Deploy BondingCurveRegistry
  // ========================================================================

  const addressBondingCurveRegistry = await deployBondingCurveRegistry(
    ALICE, // Admin for initialization
    ALICE, // Proxy admin
    ALICE, // Deployer
  )

  // ========================================================================
  // Register Bonding Curves
  // ========================================================================

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

  // ========================================================================
  // Deploy SatelliteEmissionsController
  // ========================================================================

  const addressSatelliteEmissionsController =
    await deploySatelliteEmissionsController(
      ALICE, // Admin
      '0x000000000000000000000000000000000000dEaD', // Base emissions controller (placeholder for tests)
      {
        hubOrSpoke: '0x000000000000000000000000000000000000dEaD', // MetaERC20 hub/spoke (placeholder for tests)
        recipientDomain: 0, // Recipient domain
        gasLimit: BigInt(200000), // Gas limit
        finalityState: 0, // Finality state
      },
      {
        startTimestamp: BigInt(Math.floor(Date.now() / 1000) + 6000), // Current timestamp
        emissionsLength: BigInt(604800 * 2), // 3 weeks in seconds (matching epoch length)
        emissionsPerEpoch: parseEther('1000'), // 1000 tokens per epoch
        emissionsReductionCliff: BigInt(26), // 52 epochs (1 year)
        emissionsReductionBasisPoints: BigInt(500), // 5% reduction
      },
      ALICE, // Proxy admin
      ALICE, // Deployer
    )

  // ========================================================================
  // Deploy TrustBonding
  // ========================================================================

  const addressTrustBonding = await deployTrustBonding(
    ALICE, // Owner
    ALICE, // Timelock
    '0x000000000000000000000000000000000000dEaD', // Trust token (placeholder for tests)
    BigInt(604800 * 2), // Epoch length (3 weeks in seconds)
    addressSatelliteEmissionsController,
    BigInt(5000), // System utilization lower bound (50%)
    BigInt(5000), // Personal utilization lower bound (50%)
    ALICE, // Proxy admin
    ALICE, // Deployer
  )

  // ========================================================================
  // Deploy MultiVault with Transparent Proxy
  // ========================================================================

  const addressMultiVault = await deployMultiVault(
    // General configuration
    {
      admin: ALICE,
      protocolMultisig: ALICE,
      feeDenominator: BigInt(10000),
      minDeposit: parseEther('0.001'),
      minShare: BigInt(100000),
      atomDataMaxLength: BigInt(1000),
      feeThreshold: BigInt(10000),
      decimalPrecision: BigInt(18),
      trustBonding: addressTrustBonding,
    },
    // Atom configuration
    {
      atomWalletDepositFee: BigInt(100),
      atomCreationProtocolFee: BigInt(parseEther('0.001')),
    },
    // Triple configuration
    {
      tripleCreationProtocolFee: BigInt(parseEther('0.001')),
      atomDepositFractionForTriple: BigInt(300),
      totalAtomDepositsOnTripleCreation: BigInt(parseEther('0.001')),
    },
    // Wallet configuration
    {
      permit2: '0x000000000000000000000000000000000000dEaD',
      entryPoint: '0x000000000000000000000000000000000000dEaD',
      atomWarden: '0x000000000000000000000000000000000000dEaD',
      atomWalletBeacon: '0x000000000000000000000000000000000000dEaD',
      atomWalletFactory: '0x000000000000000000000000000000000000dEaD', // Will be updated after factory deployment
    },
    // Vault fees
    {
      exitFee: BigInt(500),
      entryFee: BigInt(500),
      protocolFee: BigInt(100),
    },
    // Bonding curve configuration
    {
      registry: addressBondingCurveRegistry,
      defaultCurveId: BigInt(1),
    },
    ALICE, // Proxy admin
    ALICE, // Deployer
  )

  // ========================================================================
  // Deploy AtomWalletFactory
  // ========================================================================

  const addressAtomWalletFactory = await deployAtomWalletFactory(
    addressMultiVault, // MultiVault address
    ALICE, // Proxy admin
    ALICE, // Deployer
  )

  // Update MultiVault with AtomWalletFactory address
  await walletClient.writeContract({
    abi: MultiVaultAbi,
    address: addressMultiVault,
    functionName: 'setWalletConfig',
    args: [
      {
        entryPoint: '0x000000000000000000000000000000000000dEaD',
        atomWarden: '0x000000000000000000000000000000000000dEaD',
        atomWalletBeacon: '0x000000000000000000000000000000000000dEaD',
        atomWalletFactory: addressAtomWalletFactory,
      },
    ],
  })

  // ========================================================================
  // Validation
  // ========================================================================

  expect(addressMultiVault).toBeDefined()
  expect(isAddress(addressMultiVault)).toBe(true)

  return addressMultiVault
}
