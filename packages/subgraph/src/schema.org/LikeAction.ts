import { Atom } from '../../generated/schema'

export const LikeActionUri = 'https://schema.org/LikeAction'

export function createLikeAction(
  atom: Atom,
): void {
  atom.emoji = '👍'
  atom.type = 'LikeAction'
  atom.label = 'Likes'
}
