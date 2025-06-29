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
