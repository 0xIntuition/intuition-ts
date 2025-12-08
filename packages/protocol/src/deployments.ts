import type { Address } from 'viem'
import { base } from 'viem/chains'

import { intuitionMainnet, intuitionTestnet } from './networks'

export const intuitionDeployments: {
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
    [intuitionTestnet.id]: '0x2AFC4949Dd3664219AA2c20133771658E93892A1',
    [intuitionMainnet.id]: '0xd0E488Fb32130232527eedEB72f8cE2BFC0F9930',
  },
  LinearCurve: {
    [intuitionTestnet.id]: '0x6df5eecd9B14E31C98A027b8634876E4805F71B0',
    [intuitionMainnet.id]: '0xc3eFD5471dc63d74639725f381f9686e3F264366',
  },
  OffsetProgressiveCurve: {
    [intuitionTestnet.id]: '0xE65EcaAF5964aC0d94459A66A59A8B9eBCE42CbB',
    [intuitionMainnet.id]: '0x23afF95153aa88D28B9B97Ba97629E05D5fD335d',
  },
}
