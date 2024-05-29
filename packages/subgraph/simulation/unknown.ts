import { getIntuition } from './utils'
import { faker } from '@faker-js/faker'

async function main() {
  const count = 5

  for (let i = 1; i < count; i++) {
    const user = await getIntuition(i)

    const uri = faker.lorem.words(5)
    const atom = await user.multivault.createAtom(uri)

    console.log(`Created atom: ${atom.vaultId} ${uri} `)
  }
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
