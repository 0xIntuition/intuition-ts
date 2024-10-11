import { loadCsvToSchemaType } from "../lib/schema"
import { populateAndTagAtoms, tagAtoms } from "../lib/populate";

import { Thing, WithContext } from "schema-dts"

const filepath = 'src/dapp-list-base/data/dapp_list_base_nodes.csv';

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath);

const dappTag: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": "dApps",
    "description": "Decentralized applications (dApps) are open-source software applications that run on a peer-to-peer blockchain network rather than a centralized server. dApps are known for their transparency, security, and ability to operate autonomously without interference from third parties.",
    "image": "https://kingslanduniversity.com/wp-content/uploads/2019/06/dapps-1024x512.jpg",
    "url": ""
}

const builtOnBaseTag: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": "Built on Base",
    "description": "Projects building on top of the Ethereum L2 Base",
    "image": "https://pbs.twimg.com/profile_images/1729594296289173504/VFXjCIOn_400x400.jpg",
    "url": "https://www.base.org/ecosystem"
}

// Tag all atoms defined in the CSV with the above tag as the keyword
// await populateAndTagAtoms(dappTag, things);
await populateAndTagAtoms(builtOnBaseTag, things);