import { getIntuition } from './utils'
import { faker } from '@faker-js/faker'

async function main() {
  const alice = await getIntuition(0)

  const nameAtom = await alice.multivault.createAtom('https://schema.org/name')

  const addressAtom = await alice.multivault.createAtom(
    `eip155:1:${alice.account.address}`,
  )
  const aliceAtom = await alice.multivault.createAtom('Alice')

  await alice.multivault.createTriple(
    addressAtom.vaultId,
    nameAtom.vaultId,
    aliceAtom.vaultId,
  )

  const accountCount = 5
  for (let i = 1; i < accountCount; i++) {
    const user = await getIntuition(i)

    const addressAtom = await user.multivault.createAtom(
      `eip155:1:${user.account.address}`,
    )
    const name = faker.person.firstName()
    let vaultId = await user.multivault.getVaultIdFromUri(name)
    if (vaultId == null) {
      console.log(`Creating atom: ${name}`)
      const nameAtomValue = await user.multivault.createAtom(name)
      vaultId = nameAtomValue.vaultId
    }

    console.log(`Creating triple: ${addressAtom.vaultId} ${name} ${vaultId}`)
    await user.multivault.createTriple(
      addressAtom.vaultId,
      nameAtom.vaultId,
      vaultId,
    )
    // await new Promise(resolve => setTimeout(resolve, 500))
  }
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
