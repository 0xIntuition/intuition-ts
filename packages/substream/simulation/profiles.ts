import { faker } from '@faker-js/faker'
import { Person, WithContext } from 'schema-dts'
import { ipfs } from './lib/ipfs'
import { getIntuition } from './lib/utils'

async function main() {
  const accountCount = 5

  for (let i = 1; i < accountCount; i++) {
    const user = await getIntuition(i)

    const person: WithContext<Person> = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      identifier: user.account.address,
      name: faker.person.firstName() + ' ' + faker.person.lastName(),
      image: faker.image.avatar(),
      email: faker.internet.email(),
      url: faker.internet.url(),
    }

    const { cid } = await ipfs.add(JSON.stringify(person))

    const atom = await user.multivault.createAtom(`ipfs://${cid}`)

    console.log(`Created atom: ${atom.vaultId} ${person.name} `)
  }
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
