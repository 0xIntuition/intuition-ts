# Welcome to the Intuition Data Populator

The Data Populator app is built with Remix/Vite.
📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/guides/vite) for details on supported features.

You can use the Data Populator to load CSV files which contain long lists of atom data. The user interface will allow you to perform some basic proofreading of the data, and when you’re ready you can submit it to the Intuition System in one fell swoop. This works by batching all of the atom data together into very large EVM transactions, after automatically pinning and filtering the metadata onto IPFS. This is very similar to the behavior in the Portal App, except it’s designed to work with much larger volumes of data.

## Getting Started

Once you've cloned the `intuition-ts` monorepo you can run Data Populator from the monorepo root.

Install all packages from the monorepo root by running `pnpm install`.

Copy the `.env.example` and create a `.env` file:

`cp .env.example .env`

Note: To run locally you'll need to populate the environment variables with your own API keys and values.

## Development

Run the Vite dev server:

`pnpm data-populator:dev`
