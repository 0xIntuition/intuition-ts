import { Person, Thing, WithContext } from 'schema-dts'

import { populateAndTagAtoms } from '../lib/populate'
import { loadCsvToSchemaType } from '../lib/schema'

const events = await loadCsvToSchemaType<Thing>(
  'src/token2049/data/token2049_2024.csv',
)

const token2049eventTag: WithContext<Thing> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: 'Token2049 2024 Singapore Events',
  description:
    'TOKEN2049 is the premier crypto event, organised annually in Dubai and Singapore, where founders and executives of the leading Web3 companies and projects share their view on the industry. We shine a light on the global developments, while taking a unique and widening perspective on the ecosystem and its vast opportunities.  TOKEN2049 brings together the global Web3 industry, uniting entrepreneurs, investors, developers, industry insiders and global media - and creates unparalleled networking opportunities.',
  image:
    'https://storage.tally.so/d28a3fea-7fde-4cf8-b433-66f1509be9f3/TOKEN2049-App-Icon-1-2-.png',
  url: 'https://www.asia.token2049.com/',
}

// TODO: Create helper function to tag data from schema instead of relying on atom ID
// const cryptoConferencesTag: WithContext<Thing> = {
//   "@context": "https://schema.org",
//   "@type": "Thing",
//   "name": "Crypto Conferences",
//   "description": "Your next overpriced weekend abroad",
//   "image": "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2022/04/720/405/IMG_3119-1.jpg?ve=1&tl=1",
//   "url": ""
// }

await populateAndTagAtoms(token2049eventTag, events)
