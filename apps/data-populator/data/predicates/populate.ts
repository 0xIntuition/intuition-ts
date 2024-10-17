import { Thing, WithContext } from 'schema-dts'

import { populateAndTagAtoms } from '../lib/populate'
import { loadCsvToSchemaType } from '../lib/schema'

const filepath = 'src/predicates/data/predicates.csv'

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath)

const mostUsedPredicates: WithContext<Thing> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: 'Recommended Predicates',
  description:
    'Predicates facilitate powerful, condition-based querying by defining specific criteria for data retrieval and access within the system. Predicates denote the kind of information or relationship being expressed by a Semantic Triple.',
  image:
    'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1724346399/remix/tn2ic4mfh2xjyw68dnf2.png',
  url: ' https://en.wikipedia.org/wiki/Predicate_(grammar)',
}

// Tag all atoms defined in the CSV with the above tag as the keyword
await populateAndTagAtoms(mostUsedPredicates, things)
