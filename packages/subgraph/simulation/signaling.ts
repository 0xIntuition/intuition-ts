import { faker } from '@faker-js/faker'
import { FollowAction, Organization, Person, WithContext } from 'schema-dts'
import { parseEther } from 'viem'

import { ipfs } from './ipfs'
import { getIntuition, getOrCreateAtom } from './utils'

async function main() {
  const admin = await getIntuition(0)

  // const followPredicate = await getOrCreateAtom(admin.multivault, 'https://schema.org/FollowAction')
  const organizationPredicate = await getOrCreateAtom(
    admin.multivault,
    'https://schema.org/Organization',
  )
  const personPredicate = await getOrCreateAtom(
    admin.multivault,
    'https://schema.org/Person',
  )

  const adminAccountAtom = await admin.multivault.createAtom(
    admin.account.address,
  )
  const adminOrganizationJson: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Intuition Foundation',
    image: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    email: 'info@intuition.systems',
    url: 'https://intuition.systems',
  }

  const ipfs0 = await ipfs.add(JSON.stringify(adminOrganizationJson))
  const adminOrganizationAtom = await admin.multivault.createAtom(
    `ipfs://${ipfs0.cid}`,
  )

  console.log(
    `Created atom: ${adminOrganizationAtom.vaultId} ${adminOrganizationJson.name} `,
  )

  const adminOrganizationTriple = await admin.multivault.createTriple(
    adminAccountAtom.vaultId,
    organizationPredicate,
    adminOrganizationAtom.vaultId,
  )
  console.log(
    `Created triple: ${adminOrganizationTriple.vaultId} https://schema.org/Organization ${adminOrganizationJson.name} `,
  )

  const alice = await getIntuition(1)
  const aliceAccountAtom = await alice.multivault.createAtom(
    alice.account.address,
  )
  const alicePersonJson: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alice',
    image: faker.image.avatar(),
    email: faker.internet.email(),
    url: faker.internet.url(),
  }

  const ipfs1 = await ipfs.add(JSON.stringify(alicePersonJson))
  const alicePersonAtom = await alice.multivault.createAtom(
    `ipfs://${ipfs1.cid}`,
  )

  console.log(
    `Created atom: ${alicePersonAtom.vaultId} ${alicePersonJson.name} `,
  )

  const alicePersonTriple = await alice.multivault.createTriple(
    aliceAccountAtom.vaultId,
    personPredicate,
    alicePersonAtom.vaultId,
  )
  console.log(
    `Created triple: ${alicePersonTriple.vaultId} https://schema.org/Person ${alicePersonJson.name} `,
  )

  const res = await alice.multivault.depositTriple(
    alicePersonTriple.vaultId,
    parseEther('1'),
  )
  const res2 = await alice.multivault.redeemTriple(
    alicePersonTriple.vaultId,
    parseEther('0.3'),
  )

  // const allShares = await alice.multivault.getVaultStateForUser(alicePersonTriple.vaultId, alice.account.address)
  // const res2 = await alice.multivault.redeemTriple(alicePersonTriple.vaultId, allShares.shares)

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
    bobPersonAtom.vaultId,
  )
  console.log(
    `Created triple: ${bobPersonTriple.vaultId} https://schema.org/Person ${bobPersonJson.name} `,
  )

  // Bob disagrees with alice. Her name is actually Alison

  const counterVault = await bob.multivault.getCounterIdFromTriple(
    alicePersonTriple.vaultId,
  )

  const downvote = await bob.multivault.depositTriple(
    counterVault,
    parseEther('0.001'),
  )
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
