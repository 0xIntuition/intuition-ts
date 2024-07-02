import { Organization, WithContext } from 'schema-dts'

import { pinataPinJSON } from './pinata'
import { getIntuition, getOrCreateAtom } from './utils'

async function main() {
  const admin = await getIntuition(3)

  const organizationPredicate = await getOrCreateAtom(
    admin.multivault,
    'https://schema.org/Organization',
  )

  const adminAccountAtom = await admin.multivault.createAtom(
    admin.account.address,
  )
  const adminOrganizationJson: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AAAAAAACME Corporation',
    image: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    email: 'info@example.com',
    url: 'https://example.com',
  }

  const cid = await pinataPinJSON(adminOrganizationJson)
  console.log(`Pinned JSON: ${cid}`)
  const adminOrganizationAtom = await admin.multivault.createAtom(
    `ipfs://${cid}`,
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
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
