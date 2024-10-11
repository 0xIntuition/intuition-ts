import { Person, Thing, WithContext } from 'schema-dts'
import { loadCsvToSchemaType } from '../lib/schema'
import { populateAndTagAtoms, populateAtoms } from '../lib/populate'

const superscrypt = await loadCsvToSchemaType<Thing>('src/portcos/data/superscrypt.csv');
const polymorphic = await loadCsvToSchemaType<Thing>('src/portcos/data/polymorphic.csv');
const spaceship = await loadCsvToSchemaType<Thing>('src/portcos/data/spaceship.csv');

const superscryptTag: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": "Superscrypt Portfolio Companies",
    "description": "Superscrypt is an early stage crypto-native VC whose mission is to onboard the next wave of builders and users into web3. We invest in category-defining web3 teams, and partner with them to scale their business. Our focus is on infrastructure and emerging use cases; including identity & credentials, developer tools, data indexing & search, scaling and privacy. Superscrypt is made up of founders who have decades of experience building and scaling technology businesses, and we leverage this experience to help our teams with GTM, product, technology, tokenomics, strategy & community building.",
    "image": "https://www.superscrypt.xyz/wp-content/uploads/2022/05/Superscrypt-Logo-normal.png",
    "url": "https://www.superscrypt.xyz/"
}

const polymorphicTag: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": "Polymorphic Capital Portfolio Companies",
    "description": "Polymorphic Capital is the application-centric Web3 VC, with a keen focus on fostering practical use cases that build upon Web3's infrastructure. Polymorphic offers long-term support to exceptional teams around the world that leverage Web3's innovative technology and foundational principles to drive significant transformations across extensive markets.",
    "image": "https://crypto-fundraising.info/wp-content/uploads/funds/2022/04/Polymorphic-Capital.png",
    "url": "https://polymorphic.capital/"
}

const spaceshipTag: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": "Spaceship Capital Portfolio Companies",
    "description": "At Spaceship DAO, we discover and invest in early-stage projects building at the edges of DeFi, NFTs, staking, re-staking, privacy, and Web3 social applications. Crypto and Web3 technologies are catalyzing new opportunities to upgrade how we interact online, making way for a more decentralized and equitable future. In the Crypto Anarchist Manifesto, Timothy May states that the goal of the cypherpunk movement is to 'create a world where each individual is sovereign over their own lives and no one may threaten or rule over any other.' This vision is at the core of everything we do at Spaceship.",
    "image": "https://icoanalytics.org/wp-content/uploads/2023/01/Spaceship-Dao.png",
    "url": "https://spaceshipdao.xyz/"
}

// Don't tag these, let the investors tag them.
// await populateAndTagAtoms(superscryptTag, superscrypt);
// await populateAndTagAtoms(polymorphicTag, polymorphic);
// await populateAndTagAtoms(spaceshipTag, spaceship);

await populateAtoms(superscrypt);
await populateAtoms(polymorphic);
await populateAtoms(spaceship);