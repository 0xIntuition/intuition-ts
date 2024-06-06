import { TypedMap, JSONValue } from '@graphprotocol/graph-ts'
import { Atom } from '../../generated/schema'

export function createFollowAction(
  atom: Atom,
  obj: TypedMap<string, JSONValue>,
): void {
  atom.emoji = '🔔'
  atom.type = 'FollowAction'
  atom.label = 'Follows'
}
