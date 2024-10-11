import { loadCsvToSchemaType } from "../lib/schema"
import { populateAtoms, tagAtoms } from "../lib/populate";

import { Thing, WithContext } from "schema-dts"

const filepath = 'src/csv/testData/CSVTest3.csv';

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath);

const garbageTestDataTagJSON: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": "Garbage Test Data",
    "description": "This is garbage test data",
    "image": "https://gateway.pinata.cloud/ipfs/QmXQ9muamWqrXRyE1fdiQsJWDHrfXrSh8gjL7wC2wceE44"
}

// Tag all atoms defined in the CSV with the above tag as the keyword
const atomIDs = await populateAtoms(things);
await tagAtoms(garbageTestDataTagJSON, atomIDs.existingAtomIDs);