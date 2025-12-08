# Welcome to the Intuition TypeScript Monorepo

Intuition is the **trust protocol** bringing human trust to trustless systems. We are an ecosystem of technologies composing a universal and permissionless knowledge graph.

We're using a monorepo to organize the development of our ecosystem. Our monorepo will eventually be open to community contributors, but right now we're focusing on scaffolding, architecture, and establishing patterns.

## Monorepo Structure

Our monorepo uses [pnpm](https://pnpm.io/) and is organized into `apps` and `packages`. Our `apps` folder contains our core applications. Our `packages` folder contains our utilities and libraries that will eventually be published and available to the community and larger ecosystem.

Each app and package has it's own README with instructions for getting up and running.

### Packages

- [graphql](./packages/graphql/) is the SDK for the GraphQL interaction layer of Intuition containing hooks, queries, and other utilities.
- [protocol](./packages/protocol/) is the onchain interactions (ABIs, bytecode) SDK.
- [sdk](./packages/sdk/) contains high level logic that combines both on-chain and off-chain interactions.

## Getting Started

### Prerequisites

We recommended using [Node.js](https://nodejs.org/) >= 18.0, preferably v20+.

We also recommend using [NPM](https://www.npmjs.com/) >= 9.8.

You can also optionally install pnpnm globally by following their [installation instructions](https://pnpm.io/installation).

Each package will have more detailed instructions, but you should clone the entire monorepo and work from the root:

- Clone the monorepo from the root: `git@github.com:0xIntuition/intuition-ts.git`
- Follow individual instructions for each app and package

## Migration Guide

If you're upgrading from v1.x to v2.0.0, please see the [Migration Guide](./MIGRATION.md) for detailed information about breaking changes and how to update your code.

## Contributing

Please read the [contributing guide](./CONTRIBUTING.md).
