import { getIntuition, getOrCreateAtom } from '../lib/utils'
import { faker } from '@faker-js/faker'
import { Person, WithContext } from 'schema-dts'
import { ipfs } from '../lib/ipfs'

async function main() {
  const accountCount = 5

  const admin = await getIntuition(0)
  const personPredicate = await getOrCreateAtom(admin.multivault, 'https://schema.org/Person')

  for (let i = 1; i < accountCount; i++) {
    const user = await getIntuition(i)

    const userAccountAtom = await user.multivault.createAtom({
      uri: user.account.address
    })

    console.log(`Created atom: ${userAccountAtom.vaultId} ${user.account.address} `)
    const person: WithContext<Person> = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: faker.person.firstName() + ' ' + faker.person.lastName(),
      image: faker.image.avatar(),
      email: faker.internet.email(),
      url: faker.internet.url(),
    }

    const { cid } = await ipfs.add(JSON.stringify(person))

    const atom = await user.multivault.createAtom({
      uri: `ipfs://${cid}`
    })
    console.log(`Created atom: ${atom.vaultId} ${person.name} `)


    const triple = await user.multivault.createTriple({
      subjectId: userAccountAtom.vaultId,
      predicateId: personPredicate,
      objectId: atom.vaultId
    })
    console.log(`Created triple: ${triple.vaultId} https://schema.org/Person ${person.name} `)
  }
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
