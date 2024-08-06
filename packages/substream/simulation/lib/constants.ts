import { privateKeyToAccount } from 'viem/accounts'

export const MNEMONIC =
  'legal winner thank year wave sausage worth useful legal winner thank yellow'

export const CONTRACT_ADDRESS = '0x04056c43d0498b22f7a0c60d4c3584fb5fa881cc'

// 0x07baA707F61c89F6eB33c8Cb948c483c9b387084
export const ADMIN = privateKeyToAccount(
  '0x3c0afbd619ed4a8a11cfbd8c5794e08dc324b6809144a90c58bc0ff24219103b',
)
