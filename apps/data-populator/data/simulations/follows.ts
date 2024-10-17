import { FollowAction, WithContext } from 'schema-dts'

import { ipfs } from '../lib/ipfs'
import { getIntuition, getOrCreateAtom } from '../lib/utils'

async function main() {
  const user = await getIntuition(0)

  const followAction: WithContext<FollowAction> = {
    '@context': 'https://schema.org',
    '@type': 'FollowAction',
  }

  const { cid } = await ipfs.add(JSON.stringify(followAction))
  const actionId = await getOrCreateAtom(user.multivault, `ipfs://${cid}`)

  await user.multivault.createTriple({
    subjectId: 1n,
    predicateId: actionId,
    objectId: 2n,
  })

  const user1 = await getIntuition(1)
  await user1.multivault.createTriple({
    subjectId: 3n,
    predicateId: actionId,
    objectId: 4n,
  })
}

main().catch(console.error)
