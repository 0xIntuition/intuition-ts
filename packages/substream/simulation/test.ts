import { toHex, formatEther, parseEther } from 'viem'
import { adminClient, publicClient } from './lib/utils'
import { mnemonicToAccount } from 'viem/accounts'
import { ADMIN } from './lib/constants'
import { getOrDeployAndInit } from './lib/deploy'

// const accountIndex = 1
// const account = mnemonicToAccount(
//   'legal winner thank year wave sausage worth useful legal winner thank yellow',
//   { accountIndex },
// )
//
//
// // Faucet
// const hash = await adminClient.sendTransaction({
//   account: ADMIN,
//   value: parseEther('0.1'),
//   to: account.address,
// })
//
// console.log(`Sent 0.1 ETH to ${account.address} with hash ${hash}`)

getOrDeployAndInit().then((a) => console.log(`Contract address: ${a}`))
publicClient.getBalance({ address: ADMIN.address }).then((balance) => {
  console.log(`Admin balance: ${formatEther(balance)} address ${ADMIN.address}`)
})
