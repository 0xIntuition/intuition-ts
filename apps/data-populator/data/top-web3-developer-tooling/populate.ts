import { Thing, WithContext } from 'schema-dts'

import { populateAndTagAtoms } from '../lib/populate'
import { loadCsvToSchemaType } from '../lib/schema'

const filepath =
  'src/top-web3-developer-tooling/data/top-web3-developer-tooling.csv'

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath)

const topWeb3DeveloperToolingTagJSON: WithContext<Thing> = {
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: 'Top Web3 Developer Tooling',
  description: 'Big brain toolbox',
  image:
    'https://gateway.pinata.cloud/ipfs/QmbbhfvHsG6DpNbZ5TsYVk3yorcEsso5WzQkDtky36D7An',
}

// Tag all atoms defined in the CSV with the above tag as the keyword
await populateAndTagAtoms(topWeb3DeveloperToolingTagJSON, things)
