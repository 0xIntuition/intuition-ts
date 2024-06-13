import { getIntuition } from './utils'
import { faker } from '@faker-js/faker'
import { Person, WithContext } from 'schema-dts'
import { ipfs } from './ipfs'

async function main() {

  const user = await getIntuition(1)

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

main()
  .catch(console.error)
  .finally(() => console.log('done'))
