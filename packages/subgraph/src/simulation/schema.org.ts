import { getIntuition } from './utils'
import p from 'rdf-parse'
import fs from 'fs'
import { Multivault } from '@0xintuition/protocol'
async function main() {
  const alice = await getIntuition(0)

  const nt_file = 'src/simulation/schemaorg-current-https.nt'
  const fileStream = fs.createReadStream(nt_file)
  const quads: any[] = []
  //@ts-ignore
  p.default
    .parse(fileStream, { contentType: 'application/n-triples' })
    .on('data', async (quad: any) => {
      quads.push(quad)
    })
    .on('end', async () => {
      for (const quad of quads) {
        const subjectId = await getOrCreateAtom(
          alice.multivault,
          quad.subject.id,
        )
        const predicateId = await getOrCreateAtom(
          alice.multivault,
          quad.predicate.id,
        )
        const objectId = await getOrCreateAtom(alice.multivault, quad.object.id)

        console.log(
          `Creating triple: ${quad.subject.id} ${quad.predicate.id} ${quad.object.id}`,
        )
        await alice.multivault.createTriple(subjectId, predicateId, objectId)

        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    })
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

main()
  .catch(console.error)
  .finally(() => console.log('done'))
