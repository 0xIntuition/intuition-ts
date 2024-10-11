import { loadCsvToSchemaType } from "../lib/schema"
import { populateAndTagAtoms } from "../lib/populate";

import { Thing, WithContext } from "schema-dts"

const filepath = 'src/top-100-series/data/imdb_top_100_series.csv';

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath);

const topSeriesJSON: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": "TV Series",
    "description": "A TV series that captivates audiences with engaging storylines, compelling characters, and high-quality production. This series has garnered widespread acclaim and continues to be a favorite among viewers.",
    "image": "https://www.the-sun.com/wp-content/uploads/sites/6/2021/04/NINTCHDBPICT000377559478.jpg?w=620",
    "url": ""
}

// Tag all atoms defined in the CSV with the above tag as the keyword
await populateAndTagAtoms(topSeriesJSON, things);