import { getIntuition } from './utils'
import { ipfs } from './ipfs'

async function main() {
  const alice = await getIntuition(0)

  const { cid } = await ipfs.add('hello')
  await alice.createAtom(`ipfs://${cid}`)

  await alice.createAtom('world')

  const bob = await getIntuition(1)

  await bob.createAtom('lorem')
  await bob.createAtom('ipsum')
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
