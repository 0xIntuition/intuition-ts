# Contributing

Thanks for your interest in contributing to 0xIntuition. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@0xintuition](https://twitter.com/0xintuition).

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [Nx](https://nx.dev/getting-started/intro) as our build system.
- We use [changesets](https://github.com/changesets/changesets) for managing releases.

## Structure

This repository is structured as follows:

```
apps
└── portal
packages
├── 1ui
└── protocol
```

| Path                | Description                               |
| ------------------- | ----------------------------------------- |
| `apps/portal`       | The Remix application for the playground. |
| `packages/1ui`      | Our design system.                        |
| `packages/protocol` | protocol SDK.                             |

## Contributing To `0xIntuition` Packages

Please read the corresponding `CONTIBUTING.md` file for the app/package you wish to contribute to:

- [1ui - CONTRIBUTING.md](./packages/1ui/CONTRIBUTING.md)
- [protocol - CONTRIBUTING.md]()

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/0xIntuition/intuition-ts.git
```

### Navigate to project directory

```bash
cd intuition-ts
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm install
```

### Run a workspace

You can use the `pnpm [WORKSPACE]:dev` command to start the development process for a workspace.

#### Examples

1. To run the `portal` web app:

```bash
pnpm portal:dev
```

2. To run the `1ui` storybook:

```bash
pnpm 1ui:storybook
```

## Documentation

The documentation for this project is located in the `docs` workspace. You can run the documentation locally by running the following command:

```bash
pnpm docs
```

Documentation is written using [MDX](https://mdxjs.com). You can find the documentation files in the `docs` directory.

## Requests for new components

If you have a request for a new component, please open a discussion on GitHub. We'll be happy to help you out.

## Testing

Tests are written using [Vitest](https://vitest.dev). You can run all the tests from the root of the repository.

```bash
pnpm test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.
