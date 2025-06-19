# Intuition GraphQL Package

This package provides the GraphQL client, generated types, and query/mutation definitions for interacting with the Intuition API. It serves as the core data fetching layer used by other packages in the monorepo.

## Getting Started

Once you've cloned the `intuition-ts` monorepo you can run the GraphQL package from the monorepo root. Install all packages from the monorepo root by running `pnpm install`.

## Features

- Type-safe GraphQL operations using code generation
- React Query hooks for data fetching
- Reusable GraphQL fragments
- Built-in authentication handling
- Automatic error handling

## Development

### GraphQL Code Generation

This package uses GraphQL Code Generator to create TypeScript types and React Query hooks from GraphQL operations. To run the code generator:

```bash
pnpm run codegen
```

You can also run this from the monorepo root:

```bash
pnpm graphql:codegen
```

### Testing

Run unit tests with:

```bash
pnpm run test
```

You can also run this from the monorepo root:

```bash
pnpm graphql:test
```

### Testing with Local Registry

#### Setup

1. Copy `.npmrc.example` from the root to `.npmrc` to configure the local registry.

2. Start the local registry:

```bash
pnpm nx local-registry
```

#### Version Management

Before publishing, you may need to update the package version. Use one of these commands:

```bash
pnpm version:patch  # For bug fixes (0.0.x)
pnpm version:minor  # For new features (0.x.0)
pnpm version:major  # For breaking changes (x.0.0)
pnpm version:beta   # For beta releases
```

#### Testing in Monorepo Apps (Recommended)

1. Make changes to the package and build:

```bash
cd packages/graphql
# This will run codegen first (prebuild) and then build
pnpm build
```

2. Test the build before publishing (optional):

```bash
pnpm publish-dry
```

3. Publish to local registry using one of these commands:

```bash
# For local testing only
npm publish --registry http://localhost:4873

# For publishing to npm registry with tags (when ready)
pnpm publish-latest  # Publishes with 'latest' tag
pnpm publish-next   # Publishes with 'next' tag
```

4. In your test app, update the package version in package.json:

```json
{
  "dependencies": {
    "@0xintuition/graphql": "^x.x.x" // Use the version from package.json
  }
}
```

5. Install the updated package:

```bash
pnpm install
```

#### Notes

- The local registry persists packages in `tmp/local-registry/storage`
- Clear storage by stopping and restarting the registry
- First-time publishing requires creating a user (any username/password works)
- The registry runs on port 4873 by default
- The build process automatically runs codegen before building

## Usage

### Client Setup

The package exports a GraphQL client that can be used to make authenticated requests:

```typescript
import { createServerClient } from '@0xintuition/graphql'

const client = createServerClient({
  token: 'your-auth-token', // Optional
})
```

### Using Generated Hooks

The generated React Query hooks can be imported directly:

```typescript
import { useGetStats } from '@0xintuition/graphql'

function StatsComponent() {
  const { data, isLoading } = useGetStats()
  // ...
}
```

## Project Structure

```
graphql
├── src
│   ├── client.ts        # GraphQL client configuration
│   ├── fragments/       # Reusable GraphQL fragments
│   ├── queries/         # GraphQL queries
│   ├── mutations/       # GraphQL mutations
│   └── generated/       # Generated TypeScript types and hooks
├── tests/              # Unit tests
└── codegen.ts         # Code generation configuration
```

## Configuration

The package can be configured through the following files:

- `codegen.ts` - GraphQL code generation settings
- `tsconfig.json` - TypeScript configuration
- `vitest.config.ts` - Test configuration

## Contributing

Please read the core [CONTRIBUTING.md](../../CONTRIBUTING.md) before proceeding.
