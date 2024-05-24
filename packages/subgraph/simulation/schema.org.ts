import { getIntuition } from './utils'
import p from 'rdf-parse'
import fs from 'fs'
import { Multivault } from '@0xintuition/protocol'
import { ipfs } from './ipfs'
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
      const total = quads.length
      for (let i = 0; i < total; i++) {
        const quad = quads[i]
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
          `Creating triple: ${i}/${total} ${quad.subject.id} ${quad.predicate.id} ${quad.object.id}`,
        )
        await alice.multivault.createTriple(subjectId, predicateId, objectId)

        // await new Promise((resolve) => setTimeout(resolve, 50))
      }
    })
}

function removeQuotes(str: string) {
  return str.replace(/^['"]+|['"]+$/g, '')
}

async function getOrCreateAtom(multivault: Multivault, uri: string) {
  let atomUri = removeQuotes(uri)
  if (atomUri.length > 250) {
    const { cid } = await ipfs.add(atomUri)
    atomUri = `ipfs://${cid}`
  }

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
