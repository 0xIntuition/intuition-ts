import { getIntuition, getOrCreateAtom } from './utils'
import { faker } from '@faker-js/faker'
import { FollowAction, Person, WithContext } from 'schema-dts'
import { ipfs } from './ipfs'
import { parseEther } from 'viem'

async function main() {

  const admin = await getIntuition(0)

  const followPredicate = await getOrCreateAtom(admin.multivault, 'https://schema.org/FollowAction')
  const personPredicate = await getOrCreateAtom(admin.multivault, 'https://schema.org/Person')


  const alice = await getIntuition(1)
  const aliceAccountAtom = await alice.multivault.createAtom(alice.account.address)
  const alicePersonJson: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alice',
    image: faker.image.avatar(),
    email: faker.internet.email(),
    url: faker.internet.url(),
  }

  const ipfs1 = await ipfs.add(JSON.stringify(alicePersonJson))
  const alicePersonAtom = await alice.multivault.createAtom(`ipfs://${ipfs1.cid}`)

  console.log(`Created atom: ${alicePersonAtom.vaultId} ${alicePersonJson.name} `)


  const alicePersonTriple = await alice.multivault.createTriple(
    aliceAccountAtom.vaultId,
    personPredicate,
    alicePersonAtom.vaultId
  )
  console.log(`Created triple: ${alicePersonTriple.vaultId} https://schema.org/Person ${alicePersonJson.name} `)


  const bob = await getIntuition(2)
  const bobAccountAtom = await bob.multivault.createAtom(bob.account.address)


  const bobPersonJson: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bob',
    image: faker.image.avatar(),
    email: faker.internet.email(),
    url: faker.internet.url(),
  }

  const ipfs2 = await ipfs.add(JSON.stringify(bobPersonJson))
  const bobPersonAtom = await bob.multivault.createAtom(`ipfs://${ipfs2.cid}`)

  console.log(`Created atom: ${bobPersonAtom.vaultId} ${bobPersonJson.name} `)


  const bobPersonTriple = await bob.multivault.createTriple(
    bobAccountAtom.vaultId,
    personPredicate,
    bobPersonAtom.vaultId
  )
  console.log(`Created triple: ${bobPersonTriple.vaultId} https://schema.org/Person ${bobPersonJson.name} `)

  // Bob disagrees with alice. Her name is actually Alison

  const counterVault = await bob.multivault.getCounterIdFromTriple(alicePersonTriple.vaultId)

  const downvote = await bob.multivault.depositTriple(counterVault, parseEther('0.001'))
  console.log(downvote)

}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
