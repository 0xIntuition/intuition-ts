import { JSONValue, TypedMap } from '@graphprotocol/graph-ts'

import { Atom, AtomValue, Organization } from '../../generated/schema'

export const OrganizationUri = 'https://schema.org/Organization'

export function createOrganizationPredicate(atom: Atom): void {
  atom.emoji = '🏢'
  atom.type = 'OrganizationPredicate'
  atom.label = 'Is organization'
}

export function createOrganization(
  atom: Atom,
  obj: TypedMap<string, JSONValue>,
): void {
  const organization = new Organization(atom.id)
  organization.atom_id = atom.id

  const identifier = obj.get('identifier')
  if (identifier !== null) {
    organization.identifier = identifier.toString()
  }

  const name = obj.get('name')
  if (name !== null) {
    organization.name = name.toString()
  }
  const email = obj.get('email')
  if (email !== null) {
    organization.email = email.toString()
  }

  const image = obj.get('image')
  if (image !== null) {
    organization.image = image.toString()
  }

  const url = obj.get('url')
  if (url !== null) {
    organization.url = url.toString()
  }

  organization.save()

  const value = new AtomValue(atom.id)

  value.organization_id = organization.id
  value.save()

  atom.emoji = '🏢'
  atom.type = 'Organization'
  atom.value_id = value.id
  atom.label = organization.name
  atom.image = organization.image
}
