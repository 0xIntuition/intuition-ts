export const AtomWalletFactoryAbi = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'computeAtomWalletAddr',
    inputs: [
      {
        name: 'atomId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'deployAtomWallet',
    inputs: [
      {
        name: 'atomId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        name: '_multiVault',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'multiVault',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IMultiVault',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'AtomWalletDeployed',
    inputs: [
      {
        name: 'atomId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'atomWallet',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AtomWalletFactory_DeployAtomWalletFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AtomWalletFactory_ZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidInitialization',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MultiVault_TermDoesNotExist',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotInitializing',
    inputs: [],
  },
] as const
