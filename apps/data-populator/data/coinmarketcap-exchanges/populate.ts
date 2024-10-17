// import { populateAllAndTagAll } from "../lib/populate";

import { Thing, WithContext } from 'schema-dts'

import { populateAndTagAtoms } from '../lib/populate'
import { loadCsvToSchemaType } from '../lib/schema'

const filepath =
  'src/coinmarketcap-exchanges/data/coinmarketcap_exchanges_data.csv'

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath)

const exchangeTag: WithContext<Thing> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: 'Best Crypto Exchanges',
  description:
    'Crypto exchanges are online platforms where users can buy, sell, and trade cryptocurrencies. These exchanges facilitate transactions between buyers and sellers and often provide features like wallet services, advanced trading options, and real-time market data.',
  image:
    'https://calbizjournal.com/wp-content/uploads/2023/06/107077551-1655476053660-gettyimages-1304093999-dsc00601-2048x1330.jpeg',
  url: '',
}

// Tag all atoms defined in the CSV with the above tag as the keyword
// await populateAllAndTagAll(exchangeTag, things, 10, 3);
await populateAndTagAtoms(exchangeTag, things)
