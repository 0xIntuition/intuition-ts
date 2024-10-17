import { Thing, WithContext } from 'schema-dts'

import { populateAndTagAtoms } from '../lib/populate'
import { loadCsvToSchemaType } from '../lib/schema'

const filepath = 'src/top-anime-series/data/top-anime-series.csv'

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath)

const mostUsedPredicates: WithContext<Thing> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
  description:
    'A collection of top-rated anime series known for their outstanding storytelling and animation. Explore highly recommended shows across various genres.',
  name: 'Top Anime Series',
  image:
    'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1724857515/remix/dntjoxelebxxoifagfjf.webp',
}

// Tag all atoms defined in the CSV with the above tag as the keyword
await populateAndTagAtoms(mostUsedPredicates, things)
