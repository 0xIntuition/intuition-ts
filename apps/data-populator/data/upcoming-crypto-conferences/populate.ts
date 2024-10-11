import { loadCsvToSchemaType } from "../lib/schema"
import { populateAndTagAtoms } from "../lib/populate";

import { Thing, WithContext } from "schema-dts"

const filepath = 'src/upcoming-crypto-conferences/data/upcoming-crypto-conferences.csv';

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath);

const upcomingCryptoConferences: WithContext<Thing> = {
  "@context": "https://schema.org",
  "@type": "Thing",
  "name": "Upcoming Crypto Conferences",
  "description": "Your next overpriced weekend abroad",
  "image": "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2022/04/720/405/IMG_3119-1.jpg"
}

// Tag all atoms defined in the CSV with the above tag as the keyword
await populateAndTagAtoms(things, upcomingCryptoConferences);