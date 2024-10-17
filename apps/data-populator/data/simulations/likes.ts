import { LikeAction, WithContext } from 'schema-dts'

import { ipfs } from '../lib/ipfs'
import { getIntuition, getOrCreateAtom } from '../lib/utils'

async function main() {
  const user = await getIntuition(0)

  const likeAction: WithContext<LikeAction> = {
    '@context': 'https://schema.org',
    '@type': 'LikeAction',
  }

  const { cid } = await ipfs.add(JSON.stringify(likeAction))
  const likeActionId = await getOrCreateAtom(user.multivault, `ipfs://${cid}`)

  user.multivault.createTriple({
    subjectId: 1n,
    predicateId: likeActionId,
    objectId: 6n,
  })

  const user1 = await getIntuition(1)
  user1.multivault.createTriple({
    subjectId: 2n,
    predicateId: likeActionId,
    objectId: 6n,
  })
}

main().catch(console.error)
