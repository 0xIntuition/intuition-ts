import { faker } from '@faker-js/faker'
import {
  FollowAction,
  Organization,
  Person,
  Thing,
  WithContext,
} from 'schema-dts'
import { parseEther } from 'viem'

import { getIntuition, getOrCreateAtom } from '../lib/utils'
import { pinataPinJSON } from '../lib/pinata'

async function main() {
  const admin = await getIntuition(0)

  const followPredicate = await getOrCreateAtom(
    admin.multivault,
    'https://schema.org/FollowAction',
  )
  const keywortsPredicate = await getOrCreateAtom(
    admin.multivault,
    'https://schema.org/keywords',
  )

  const organizationPredicate = await getOrCreateAtom(
    admin.multivault,
    'https://schema.org/Organization',
  )
  const personPredicate = await getOrCreateAtom(
    admin.multivault,
    'https://schema.org/Person',
  )

  const adminAccountAtom = await admin.multivault.createAtom({
    uri: admin.account.address,
  })
  const adminOrganizationJson: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Intion Systems with a typo in the name',
    image: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    email: 'info@intuition.systems',
    url: 'https://intuition.systems',
  }

  const ipfs0 = await pinataPinJSON(adminOrganizationJson)
  const adminOrganizationAtom = await admin.multivault.createAtom({
    uri: `ipfs://${ipfs0}`,
  })

  console.log(
    `Created atom: ${adminOrganizationAtom.vaultId} ${adminOrganizationJson.name} `,
  )

  const adminOrganizationTriple = await admin.multivault.createTriple({
    subjectId: adminAccountAtom.vaultId,
    objectId: organizationPredicate,
    predicateId: adminOrganizationAtom.vaultId,
  })
  console.log(
    `Created triple: ${adminOrganizationTriple.vaultId} https://schema.org/Organization ${adminOrganizationJson.name} `,
  )


  const adminOrganizationJson2: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Intuition Systems',
    image: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    email: 'info@intuition.systems',
    url: 'https://intuition.systems',
  }

  const ipfs02 = await pinataPinJSON(adminOrganizationJson2)
  const adminOrganizationAtom2 = await admin.multivault.createAtom({
    uri: `ipfs://${ipfs02}`,
  })

  console.log(
    `Created atom: ${adminOrganizationAtom2.vaultId} ${adminOrganizationJson2.name} `,
  )

  const adminOrganizationTriple2 = await admin.multivault.createTriple({
    subjectId: adminAccountAtom.vaultId,
    predicateId: organizationPredicate,
    objectId: adminOrganizationAtom2.vaultId,
  })
  console.log(
    `Created triple: ${adminOrganizationTriple2.vaultId} https://schema.org/Organization ${adminOrganizationJson2.name} `,
  )

  const alice = await getIntuition(1)
  const aliceAccountAtom = await alice.multivault.createAtom({
    uri: alice.account.address,
  })
  const alicePersonJson: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alice',
    image: faker.image.avatar(),
    email: faker.internet.email(),
    url: faker.internet.url(),
  }

  const ipfs1 = await pinataPinJSON(alicePersonJson)
  const alicePersonAtom = await alice.multivault.createAtom({
    uri: `ipfs://${ipfs1}`,
  })

  console.log(
    `Created atom: ${alicePersonAtom.vaultId} ${alicePersonJson.name} `,
  )

  const alicePersonTriple = await alice.multivault.createTriple({
    subjectId: aliceAccountAtom.vaultId,
    predicateId: personPredicate,
    objectId: alicePersonAtom.vaultId,
  })
  console.log(
    `Created triple: ${alicePersonTriple.vaultId} https://schema.org/Person ${alicePersonJson.name} `,
  )

  const res = await alice.multivault.depositTriple(
    alicePersonTriple.vaultId,
    parseEther('0.01'),
  )
  const res2 = await alice.multivault.redeemTriple(
    alicePersonTriple.vaultId,
    parseEther('0.003'),
  )

  // const allShares = await alice.multivault.getVaultStateForUser(alicePersonTriple.vaultId, alice.account.address)
  // const res2 = await alice.multivault.redeemTriple(alicePersonTriple.vaultId, allShares.shares)

  const bob = await getIntuition(2)
  const bobAccountAtom = await bob.multivault.createAtom({
    uri: bob.account.address
  })

  const bobPersonJson: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bob',
    image: faker.image.avatar(),
    email: faker.internet.email(),
    url: faker.internet.url(),
  }

  const ipfs2 = await pinataPinJSON(bobPersonJson)
  const bobPersonAtom = await bob.multivault.createAtom({
    uri: `ipfs://${ipfs2}`
  })

  console.log(`Created atom: ${bobPersonAtom.vaultId} ${bobPersonJson.name} `)

  const bobPersonTriple = await bob.multivault.createTriple({
    subjectId: bobAccountAtom.vaultId,
    predicateId: personPredicate,
    objectId: bobPersonAtom.vaultId,
  })
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

  const tagJson: WithContext<Thing> = {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: 'ethereum',
  }

  const ipfs3 = await pinataPinJSON(tagJson)
  const tagAtom = await bob.multivault.createAtom({
    uri: `ipfs://${ipfs3}`
  })
  console.log(`Created atom: ${tagAtom.vaultId} ${tagJson.name} `)

  const tagTriple = await bob.multivault.createTriple({
    subjectId: bobAccountAtom.vaultId,
    predicateId: keywortsPredicate,
    objectId: tagAtom.vaultId,
  })
  console.log(
    `Created triple: ${tagTriple.vaultId} https://schema.org/keywords ${tagJson.name} `,
  )
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
