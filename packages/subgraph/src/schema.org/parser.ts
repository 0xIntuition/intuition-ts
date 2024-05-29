import { ipfs, json, TypedMap, JSONValue } from '@graphprotocol/graph-ts'
import { Atom } from '../../generated/schema'
import { createPerson } from './Person'
import { createBook } from './Book'
import { createLikeAction } from './LikeAction'

export function parseAtomData(atom: Atom): void {
  atom.data = atom.uri
  atom.type = 'Unknown'

  if (atom.uri.startsWith('ipfs://')) {
    const cid = atom.uri.slice(7)
    const data = ipfs.cat(cid)
    if (data !== null) {
      atom.data = data.toString()
    }
  }

  const result = json.try_fromString(atom.data)
  if (result.isOk) {
    atom.type = 'JSON'
    const obj = result.value.toObject()
    const context = obj.get('@context')
    if (context !== null && context.toString() == 'https://schema.org') {
      resolveSchemaOrgProperties(atom, obj)
    }
  }
}

function resolveSchemaOrgProperties(
  atom: Atom,
  obj: TypedMap<string, JSONValue>,
): void {
  const typeVal = obj.get('@type')
  if (typeVal !== null) {
    const type = typeVal.toString()

    if (type == 'Person') {
      createPerson(atom, obj)
    }
    if (type == 'Book') {
      createBook(atom, obj)
    }
    if (type == 'LikeAction') {
      createLikeAction(atom, obj)
    }
  }
}
