import { TypedMap, JSONValue } from '@graphprotocol/graph-ts'
import { Atom } from '../../generated/schema'

export function createLikeAction(
  atom: Atom,
  obj: TypedMap<string, JSONValue>,
): void {
  atom.emoji = '👍'
  atom.type = 'LikeAction'
  atom.label = 'Likes'
}
