import { loadCsvToSchemaType } from "../lib/schema"
import { populateAndTagAtoms } from "../lib/populate";

import { Thing, WithContext } from "schema-dts"

const filepath = 'src/top-100-movies/data/imdb_top_100_movies.csv';

const things: WithContext<Thing>[] = await loadCsvToSchemaType(filepath);

const topMoviesJSON: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": "Movies",
    "description": "A film that captivates audiences with engaging storylines, compelling characters, and high-quality production.",
    "image": "https://www.the-sun.com/wp-content/uploads/sites/6/2021/04/NINTCHDBPICT000377559478.jpg?w=620",
    "url": ""
}

// Tag all atoms defined in the CSV with the above tag as the keyword
await populateAndTagAtoms(topMoviesJSON, things);