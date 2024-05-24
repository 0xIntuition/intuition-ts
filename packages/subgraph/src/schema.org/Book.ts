import { TypedMap, JSONValue } from '@graphprotocol/graph-ts'
import { Atom, AtomValue, Book } from '../../generated/schema'

export function createBook(
  atom: Atom,
  obj: TypedMap<string, JSONValue>,
): void {
  const book = new Book(atom.id)

  const name = obj.get('name')
  if (name !== null) {
    book.name = name.toString()
  }

  const genre = obj.get('genre')
  if (genre !== null) {
    book.genre = genre.toString()
  }

  const url = obj.get('url')
  if (url !== null) {
    book.url = url.toString()
  }

  book.save()

  const value = new AtomValue(atom.id)

  value.book = book.id
  value.save()

  atom.emoji = '📚'
  atom.type = 'Book'
  atom.value = value.id
  atom.label = book.name
}
