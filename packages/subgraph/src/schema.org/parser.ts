import { ipfs, json, TypedMap, JSONValue } from '@graphprotocol/graph-ts'
import { Atom } from '../../generated/schema'
import { createPerson, createPersonPredicate, PersonUri } from './Person'
import { createBook } from './Book'
import { createLikeAction, LikeActionUri } from './LikeAction'
import { createFollowAction, FollowActionUri } from './FollowAction'

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

  if (atom.data == LikeActionUri) {
    createLikeAction(atom)
  }

  if (atom.data == FollowActionUri) {
    createFollowAction(atom)
  }

  if (atom.data == PersonUri) {
    createPersonPredicate(atom)
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

  }
}
