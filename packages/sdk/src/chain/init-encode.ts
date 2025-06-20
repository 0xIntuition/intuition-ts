import { encodeFunctionData } from 'viem'

type Arguments = {
  generalConfig: {
    admin: `0x${string}`
    protocolMultisig: `0x${string}`
    feeDenominator: bigint
    minDeposit: bigint
    minShare: bigint
    atomUriMaxLength: bigint
    decimalPrecision: bigint
    minDelay: bigint
  }
  atomConfig: {
    atomWalletInitialDepositAmount: bigint
    atomCreationProtocolFee: bigint
  }
  tripleConfig: {
    tripleCreationProtocolFee: bigint
    totalAtomDepositsOnTripleCreation: bigint
    atomDepositFractionForTriple: bigint
  }
  walletConfig: {
    permit2: `0x${string}`
    entryPoint: `0x${string}`
    atomWarden: `0x${string}`
    atomWalletBeacon: `0x${string}`
  }
  defaultVaultFees: {
    entryFee: bigint
    exitFee: bigint
    protocolFee: bigint
  }
  bondingCurveConfig: {
    registry: `0x${string}`
    defaultCurveId: bigint
  }
}

export function initEncode(args: Arguments) {
  return encodeFunctionData({
    abi: [
      {
        type: 'function',
        name: 'init',
        inputs: [
          {
            name: '_generalConfig',
            type: 'tuple',
            internalType: 'struct IEthMultiVault.GeneralConfig',
            components: [
              { name: 'admin', type: 'address', internalType: 'address' },
              {
                name: 'protocolMultisig',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'feeDenominator',
                type: 'uint256',
                internalType: 'uint256',
              },
              { name: 'minDeposit', type: 'uint256', internalType: 'uint256' },
              { name: 'minShare', type: 'uint256', internalType: 'uint256' },
              {
                name: 'atomUriMaxLength',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'decimalPrecision',
                type: 'uint256',
                internalType: 'uint256',
              },
              { name: 'minDelay', type: 'uint256', internalType: 'uint256' },
            ],
          },
          {
            name: '_atomConfig',
            type: 'tuple',
            internalType: 'struct IEthMultiVault.AtomConfig',
            components: [
              {
                name: 'atomWalletInitialDepositAmount',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'atomCreationProtocolFee',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: '_tripleConfig',
            type: 'tuple',
            internalType: 'struct IEthMultiVault.TripleConfig',
            components: [
              {
                name: 'tripleCreationProtocolFee',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'totalAtomDepositsOnTripleCreation',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'atomDepositFractionForTriple',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: '_walletConfig',
            type: 'tuple',
            internalType: 'struct IEthMultiVault.WalletConfig',
            components: [
              {
                name: 'permit2',
                type: 'address',
                internalType: 'contract IPermit2',
              },
              { name: 'entryPoint', type: 'address', internalType: 'address' },
              { name: 'atomWarden', type: 'address', internalType: 'address' },
              {
                name: 'atomWalletBeacon',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: '_defaultVaultFees',
            type: 'tuple',
            internalType: 'struct IEthMultiVault.VaultFees',
            components: [
              { name: 'entryFee', type: 'uint256', internalType: 'uint256' },
              { name: 'exitFee', type: 'uint256', internalType: 'uint256' },
              { name: 'protocolFee', type: 'uint256', internalType: 'uint256' },
            ],
          },
          {
            name: '_bondingCurveConfig',
            type: 'tuple',
            internalType: 'struct IEthMultiVault.BondingCurveConfig',
            components: [
              { name: 'registry', type: 'address', internalType: 'address' },
              {
                name: 'defaultCurveId',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
      },
    ],
    args: [
      args.generalConfig,
      args.atomConfig,
      args.tripleConfig,
      args.walletConfig,
      args.defaultVaultFees,
      args.bondingCurveConfig,
    ],
  })
}
