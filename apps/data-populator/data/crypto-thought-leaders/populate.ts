import { Thing, WithContext } from 'schema-dts'

import { populateAndTagAtoms } from '../lib/populate'
import { loadCsvToSchemaType } from '../lib/schema'

const filepath = 'src/crypto-thought-leaders/data/crypto-thought-leaders.csv'

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath)

const thoughtLeadersTag: WithContext<Thing> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: 'Crypto Thought Leaders',
  description: 'The digital aristocracy',
  image: 'https://ipfs.io/ipfs/QmS6hPet4hFbx1QAqmp9PoXC2MvwpUzkyhfaMxbMZYQSxf',
  url: '',
}

// Tag all atoms defined in the CSV with the above tag as the keyword
await populateAndTagAtoms(thoughtLeadersTag, things)
