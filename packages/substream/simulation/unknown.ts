import { toHex } from 'viem'
import { getIntuition } from './lib/utils'
import { faker } from '@faker-js/faker'

async function main() {
  const count = 500

  const user = await getIntuition(0)
  const costWithDeposit = await user.multivault.getAtomCost()
  for (let i = 1; i < count; i++) {
    const uri = faker.lorem.words(3)

    const hash = await user.multivault.contract.write.createAtom([toHex(uri)], {
      value: costWithDeposit,
    })

    console.log(`Created atom: ${hash} ${uri} `)
  }
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
