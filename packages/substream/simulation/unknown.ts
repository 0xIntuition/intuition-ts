import { toHex } from 'viem'
import { getIntuition } from './lib/utils'
import { faker } from '@faker-js/faker'

async function main() {
  const count = 400

  const costWithDeposit = await (await getIntuition(0)).multivault.getAtomCost()
  for (let i = 1; i < count; i++) {
    const uri = faker.lorem.words(3)

    const rnd = Math.floor(Math.random() * 100)
    const user = await getIntuition(rnd)

    const hash = await user.multivault.contract.write.createAtom([toHex(uri)], {
      value: costWithDeposit,
    })

    console.log(`Created atom: ${hash} ${uri} `)
  }
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
