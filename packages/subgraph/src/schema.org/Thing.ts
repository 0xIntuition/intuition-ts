import { JSONValue, TypedMap } from '@graphprotocol/graph-ts'

import { Atom, AtomValue, Thing } from '../../generated/schema'

export const ThingUri = 'https://schema.org/Thing'

export function createThingPredicate(atom: Atom): void {
  atom.emoji = '🧩'
  atom.type = 'ThingPredicate'
  atom.label = 'Is thing'
}

export function createThing(
  atom: Atom,
  obj: TypedMap<string, JSONValue>,
): void {
  const thing = new Thing(atom.id)
  thing.atom_id = atom.id

  const name = obj.get('name')
  if (name !== null) {
    thing.name = name.toString()
  }
  const description = obj.get('description')
  if (description !== null) {
    thing.description = description.toString()
  }

  const image = obj.get('image')
  if (image !== null) {
    thing.image = image.toString()
  }

  const url = obj.get('url')
  if (url !== null) {
    thing.url = url.toString()
  }

  thing.save()

  const value = new AtomValue(atom.id)

  value.thing_id = thing.id
  value.save()

  atom.emoji = '🧩'
  atom.type = 'Thing'
  atom.value_id = value.id
  atom.label = thing.name
  atom.image = thing.image
}
