import { defineChain, type Address } from 'viem'
import { base } from 'viem/chains'

const intuitionTestnet = defineChain({
  id: 13579,
  name: 'intuition-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Test Trust',
    symbol: 'tTRUST',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.intuition.systems/http'],
      webSocket: ['wss://testnet.rpc.intuition.systems/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Intuition Testnet Explorer',
      url: 'https://testnet.explorer.intuition.systems',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
})

const intuitionMainnet = defineChain({
  id: 1155,
  name: 'Intuition Network',
  nativeCurrency: {
    decimals: 18,
    name: 'Intuition',
    symbol: 'TRUST',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.intuition.systems/http'],
      webSocket: ['wss://rpc.intuition.systems/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Intuition Explorer',
      url: 'https://explorer.intuition.systems',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
})

const intuitionDeployments: {
  [key: string]: {
    [chainId: number]: Address
  }
} = {
  Trust: {
    [base.id]: '0x6cd905dF2Ed214b22e0d48FF17CD4200C1C6d8A3',
  },
  WrappedTrust: {
    [intuitionTestnet.id]: '0xDE80b6EE63f7D809427CA350e30093F436A0fe35',
    [intuitionMainnet.id]: '0x81cFb09cb44f7184Ad934C09F82000701A4bF672',
  },
  MultiVault: {
    [intuitionTestnet.id]: '0x2Ece8D4dEdcB9918A398528f3fa4688b1d2CAB91',
    [intuitionMainnet.id]: '0x6E35cF57A41fA15eA0EaE9C33e751b01A784Fe7e',
  },
  TrustBonding: {
    [intuitionTestnet.id]: '0x75dD32b522c89566265eA32ecb50b4Fc4d00ADc7',
    [intuitionMainnet.id]: '0x635bBD1367B66E7B16a21D6E5A63C812fFC00617',
  },
  BondingCurveRegistry: {
    [intuitionTestnet.id]: '0x419fdc0d56c3fc27592bf887b5be3184effdfa73',
    [intuitionMainnet.id]: '0xd0E488Fb32130232527eedEB72f8cE2BFC0F9930',
  },
  LinearCurve: {
    [intuitionTestnet.id]: '0x006C022b854022C1646dA5094F1D77A17D3897AB',
    [intuitionMainnet.id]: '0xc3eFD5471dc63d74639725f381f9686e3F264366',
  },
  OffsetProgressiveCurve: {
    [intuitionTestnet.id]: '0x778f87476f266817f1D715fC172E51C4B85FBb16',
    [intuitionMainnet.id]: '0x23afF95153aa88D28B9B97Ba97629E05D5fD335d',
  },
}

export { intuitionDeployments, intuitionTestnet }
