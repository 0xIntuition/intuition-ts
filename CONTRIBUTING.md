# Contributing

Thanks for your interest in contributing to 0xIntuition. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@0xintuition](https://twitter.com/0xintuition).

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [changesets](https://github.com/changesets/changesets) for managing releases.

## Structure

This repository is structured as follows:

```
apps
└── cli
└── nextjs-template
packages
└── graphql
└── protocol
└── sdk
```

| Path                | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `apps/cli`          | CLI for interacting with the protocol                      |
| `packages/graphql`  | Module containing GraphQL queries and mutations            |
| `packages/protocol` | Module low-level smart contract interactions               |
| `packages/sdk`      | High level logic that combines both on-chain and off-chain |

## Contributing To `0xIntuition` Packages

Please read the corresponding `CONTRIBUTING.md` file for the app/package you wish to contribute to:

- [1ui - CONTRIBUTING.md](./packages/1ui/CONTRIBUTING.md)
- [protocol - CONTRIBUTING.md](./packages/protocol/CONTRIBUTING.md)

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/0xIntuition/intuition-ts.git
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm install
```

## Testing

Tests are written using [Vitest](https://vitest.dev). You can run all the tests from the root of the repository.

```bash
pnpm test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.
