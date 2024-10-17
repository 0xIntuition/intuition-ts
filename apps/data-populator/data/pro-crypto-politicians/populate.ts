import { Multivault } from '@0xintuition/protocol'

import { Person, Thing, WithContext } from 'schema-dts'

import { pinataPinJSON } from '../lib/pinata'
import { populateAndTagAtoms } from '../lib/populate'
import { getTestnetMultivault } from '../lib/public-testnet'
import { loadCsvToSchemaType, writeSchemaToCsv } from '../lib/schema'
import { getIntuition, getOrCreateAtom } from '../lib/utils'
import { people } from './data/all-people.json'

// Filter out anyone below 90% computed stance score
const proCryptoPoliticians = people.filter(
  (person) =>
    person.computedStanceScore !== null && person.computedStanceScore > 90,
)

const antiCryptoPoliticians = people.filter(
  (person) =>
    person.computedStanceScore !== null && person.computedStanceScore < 10,
)

const proCryptoPeople: WithContext<Person>[] = proCryptoPoliticians
  .map((person) => {
    let description = `${person.primaryRole.primaryCountryCode} politician`
    if (person.primaryRole.primaryState !== '') {
      description += ` in the state of ${person.primaryRole.primaryState}`
    }

    const result: WithContext<Person> = {
      '@context': 'https://schema.org',
      '@type': 'Person', // This is not being used by the Portal - we should try to use this when dealing with people as it may be supported in the future.

      name:
        person.firstNickname !== ''
          ? `${person.firstNickname} ${person.lastName}`
          : `${person.firstName} ${person.lastName}`,

      description,
    }

    if (person.profilePictureUrl !== '') {
      result.image = person.profilePictureUrl
    }

    return result
  })
  .slice(0, 100)

const antiCryptoPeople: WithContext<Person>[] = antiCryptoPoliticians
  .map((person) => {
    const result: WithContext<Person> = {
      '@context': 'https://schema.org',
      '@type': 'Person', // This is not being used by the Portal - we should try to use this when dealing with people as it may be supported in the future.

      name:
        person.firstNickname !== ''
          ? `${person.firstNickname} ${person.lastName}`
          : `${person.firstName} ${person.lastName}`,

      description: `${person.primaryRole.primaryCountryCode} politician in the state of ${person.primaryRole.primaryState}`,
    }

    if (person.profilePictureUrl !== '') {
      result.image = person.profilePictureUrl
    }

    return result
  })
  .slice(0, 100)

const proCryptoTagJSON: WithContext<Thing> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: 'Pro Crypto Politicians',
  description: 'The suits who like our coins',
  image:
    'https://aquamarine-tragic-mockingbird-747.mypinata.cloud/ipfs/QmdWhNLe5ETvpihqrSFX4ZWbmYrFjm1BKhvwnHP9cS7f1c?pinataGatewayToken=zMgvWfPgK7kmuF-Y4AbaoZIVC-ZYyi_-4nULxwS2oKdo0aypV_InkY36tlyvVt_w',
}

const antiCryptoTagJSON: WithContext<Thing> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: 'Anti Crypto Politicians',
  description: 'The suits who hate our coins',
  image:
    'https://aquamarine-tragic-mockingbird-747.mypinata.cloud/ipfs/QmU9w4JG9iiGngTiF3rqXBxUjXR4gt7UuGMxhYk14DDnZc?pinataGatewayToken=zMgvWfPgK7kmuF-Y4AbaoZIVC-ZYyi_-4nULxwS2oKdo0aypV_InkY36tlyvVt_w',
}

const proFilepath = 'src/pro-crypto-politicians/data/pro-crypto-politicians.csv'
// For preview purposes, we already have the list from parsing the JSON file
writeSchemaToCsv<Person>(proCryptoPeople, proFilepath)

const antiFilepath =
  'src/pro-crypto-politicians/data/anti-crypto-politicians.csv'
// For preview purposes, we already have the list from parsing the JSON file
writeSchemaToCsv<Person>(antiCryptoPeople, antiFilepath)

await populateAndTagAtoms(proCryptoTagJSON, proCryptoPeople)
await populateAndTagAtoms(antiCryptoTagJSON, antiCryptoPeople)

// const cid = await pinataPinJSON(proCryptoTagJSON)

// let multivault: Multivault;

// if (process.argv.includes('public-testnet')) {
//   multivault = getTestnetMultivault()
// } else {
//   const user = await getIntuition(3)
//   multivault = user.multivault
// }

// const proCryptoTag = await getOrCreateAtom(
//   multivault,
//   `ipfs://${cid}`,
// )

// const keywordsPredicate = await getOrCreateAtom(
//   multivault,
//   'https://schema.org/keywords',
// )

// for (let i = 0; i < persons.length; i++) {
//   console.log(`Creating person ${i + 1} of ${persons.length}`)

//   const person = persons[i]
//   const cid = await pinataPinJSON(person)

//   const personAtom = await getOrCreateAtom(
//     multivault,
//     `ipfs://${cid}`,
//   )

//   // check if triple already exists
//   const tripleId = await multivault.getTripleIdFromAtoms(
//     personAtom,
//     keywordsPredicate,
//     proCryptoTag,
//   )
//   if (tripleId === null) {
//     try {
//       const personTriple = await multivault.createTriple({
//         subjectId: personAtom,
//         predicateId: keywordsPredicate,
//         objectId: proCryptoTag,
//       })
//       console.log(
//         `Created triple: ${personTriple.vaultId} `,
//       )
//     } catch (e) {
//       console.error(e.message)
//     }
//   }
// }
