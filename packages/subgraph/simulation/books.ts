import { getIntuition } from './utils'
import { faker } from '@faker-js/faker'
import { Book, WithContext } from 'schema-dts'
import { ipfs } from './ipfs'

async function main() {
  const bookCount = 500

  for (let i = 1; i < bookCount; i++) {
    const user = await getIntuition(i)

    const book: WithContext<Book> = {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: faker.lorem.words(5),
      genre: 'Science Fiction',
      url: faker.internet.url(),
    }

    const { cid } = await ipfs.add(JSON.stringify(book))

    const atom = await user.multivault.createAtom(`ipfs://${cid}`)

    console.log(`Created atom: ${atom.vaultId} ${book.name} `)
  }
}

main()
  .catch(console.error)
  .finally(() => console.log('done'))
