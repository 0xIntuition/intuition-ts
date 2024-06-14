import { getIntuition } from './utils'
import { FollowAction, WithContext } from 'schema-dts'
import { ipfs } from './ipfs'
import { Multivault } from '@0xintuition/protocol'

async function main() {
  const user = await getIntuition(0)

  const followAction: WithContext<FollowAction> = {
    '@context': 'https://schema.org',
    '@type': 'FollowAction',
  }

  const { cid } = await ipfs.add(JSON.stringify(followAction))
  const actionId = await getOrCreateAtom(user.multivault, `ipfs://${cid}`)

  await user.multivault.createTriple(1n, actionId, 2n)

  const user1 = await getIntuition(1)
  await user1.multivault.createTriple(3n, actionId, 4n)
}
async function getOrCreateAtom(multivault: Multivault, atomUri: string) {
  const atomId = await multivault.getVaultIdFromUri(atomUri)
  if (atomId) {
    return atomId
  } else {
    console.log(`Creating atom: ${atomUri}`)
    const { vaultId } = await multivault.createAtom(atomUri)
    return vaultId
  }
}
main().catch(console.error)
