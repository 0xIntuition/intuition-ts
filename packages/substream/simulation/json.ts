import { getIntuition } from './utils'
import { faker } from '@faker-js/faker'
import { ipfs } from './ipfs'

async function main() {
  const count = 5

  for (let i = 1; i < count; i++) {
    const user = await getIntuition(i)

    const json = {
      lorem: faker.lorem.words(5),
    }

    const { cid } = await ipfs.add(JSON.stringify(json))

    const atom = await user.multivault.createAtom(`ipfs://${cid}`)

    console.log(`Created atom: ${atom.vaultId} ${json.lorem} `)
  }
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
