import { TypedMap, JSONValue } from '@graphprotocol/graph-ts'
import { Atom, AtomValue, Person } from '../../generated/schema'

export function createPerson(
  atom: Atom,
  obj: TypedMap<string, JSONValue>,
): void {
  const person = new Person(atom.id)

  const identifier = obj.get('identifier')
  if (identifier !== null) {
    person.identifier = identifier.toString()
  }

  const name = obj.get('name')
  if (name !== null) {
    person.name = name.toString()
  }
  const email = obj.get('email')
  if (email !== null) {
    person.email = email.toString()
  }

  const image = obj.get('image')
  if (image !== null) {
    person.image = image.toString()
  }

  const url = obj.get('url')
  if (url !== null) {
    person.url = url.toString()
  }

  person.save()

  const value = new AtomValue(atom.id)

  value.person = person.id
  value.save()

  atom.emoji = '👤'
  atom.type = 'Person'
  atom.value = value.id
  atom.label = person.name
  atom.image = person.image
}
