import { Atom } from '../../generated/schema'

export const FollowActionUri = 'https://schema.org/FollowAction'

export function createFollowAction(
  atom: Atom,
): void {
  atom.emoji = '🔔'
  atom.type = 'FollowAction'
  atom.label = 'Follows'
}
