import { populateAndTagAtoms } from '@lib/services/populate'
import { Thing, WithContext } from 'schema-dts'

const filepath =
  'src/coinmarketcap-currencies/data/coinmarketcap_cryptocurrency_data.csv'

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath)

const cryptoTag: WithContext<Thing> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: 'Cryptocurrencies',
  description:
    'Digital or virtual currencies that use cryptography for security and operate on decentralized networks, typically based on blockchain technology. They enable peer-to-peer transactions without the need for intermediaries, and their value is often driven by market demand and investor sentiment.',
  image:
    'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/ca/wp-content/uploads/2022/06/top-cryptocurrencies.jpeg',
  url: '',
}

// Tag all atoms defined in the CSV with the above tag as the keyword
await populateAndTagAtoms(cryptoTag, things)
