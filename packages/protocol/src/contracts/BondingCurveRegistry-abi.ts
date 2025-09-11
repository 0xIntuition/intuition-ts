export const BondingCurveRegistryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_admin',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'acceptOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addBondingCurve',
    inputs: [
      {
        name: 'bondingCurve',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'convertToAssets',
    inputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalShares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertToShares',
    inputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalShares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'count',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'currentPrice',
    inputs: [
      {
        name: 'totalShares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'sharePrice',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'curveAddresses',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
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
    name: 'curveIds',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getCurveMaxAssets',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'maxAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getCurveMaxShares',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'maxShares',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getCurveName',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
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
    name: 'pendingOwner',
    inputs: [],
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
    name: 'previewDeposit',
    inputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalShares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewMint',
    inputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalShares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewRedeem',
    inputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalShares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewWithdraw',
    inputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalShares',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'registeredCurveNames',
    inputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'BondingCurveAdded',
    inputs: [
      {
        name: 'curveId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'curveAddress',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'curveName',
        type: 'string',
        indexed: true,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferStarted',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'BondingCurveRegistry_CurveAlreadyExists',
    inputs: [],
  },
  {
    type: 'error',
    name: 'BondingCurveRegistry_CurveNameNotUnique',
    inputs: [],
  },
  {
    type: 'error',
    name: 'BondingCurveRegistry_EmptyCurveName',
    inputs: [],
  },
  {
    type: 'error',
    name: 'BondingCurveRegistry_ZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
] as const
