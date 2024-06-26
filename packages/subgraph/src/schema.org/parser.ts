import { ipfs, json, JSONValue, TypedMap } from '@graphprotocol/graph-ts'

import { Atom } from '../../generated/schema'
import { createBook } from './Book'
import { createFollowAction, FollowActionUri } from './FollowAction'
import { createLikeAction, LikeActionUri } from './LikeAction'
import {
  createOrganization,
  createOrganizationPredicate,
  OrganizationUri,
} from './Organization'
import { createPerson, createPersonPredicate, PersonUri } from './Person'

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

  if (atom.data == OrganizationUri) {
    createOrganizationPredicate(atom)
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
    if (type == 'Organization') {
      createOrganization(atom, obj)
    }
    if (type == 'Book') {
      createBook(atom, obj)
    }
  }
}
