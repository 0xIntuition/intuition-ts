import { parseEther } from 'viem'

import { multivault } from './utils'

async function main() {
  console.log('Depositing 0.0003 ETH to the 4 triple vault')

  const result = await multivault.depositTriple(4n, parseEther('0.0003'))

  console.log(result)
}

main().catch(console.error)
