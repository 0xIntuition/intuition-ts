import { Address } from 'viem'
import { base, baseSepolia } from 'viem/chains'

const intuitionDeployments: {
  [key: string]: {
    [chainId: number]: Address
  }
} = {
  EthMultiVault: {
    [base.id]: '0x430BbF52503Bd4801E51182f4cB9f8F534225DE5',
    [baseSepolia.id]: '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665',
  },
  BondingCurveRegistry: {
    [base.id]: '0x0Bb6F224E6055cA90c2f6FD8693E721a3aDe9e70',
    [baseSepolia.id]: '0xe7A8cE54279020139AA7beEB035A9274b35BfcD9',
  },
  OffsetProgressiveCurve: {
    [base.id]: '0xA4Be907e82Db1C0e60bbab2263659B0738DC501e',
    [baseSepolia.id]: '0x5F11f6eDA9f6904C35377230D37D004464CeF162',
  },
}

export { intuitionDeployments }
