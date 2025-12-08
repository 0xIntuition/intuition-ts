# CLAUDE Rules for Intuition Protocol (TypeScript Monorepo)

## Protocol Overview

The Intuition protocol is a decentralized knowledge system built on Ethereum. This repository (`intuition-ts`) is a TypeScript monorepo containing the SDK, protocol wrappers, and frontend applications.

- **Stack**: TypeScript, React, Next.js, Viem, Wagmi, TanStack Query.
- **Build System**: Turborepo, pnpm.
- **Testing**: Vitest.
- **State Management**: React Context, TanStack Query (server state).

## Development Guidelines

### 1. Monorepo Structure

- `apps/`: Frontend applications (Next.js).
- `packages/`: Shared libraries.
  - `packages/protocol`: Low-level smart contract interactions (Viem).
  - `packages/sdk`: High-level logic combining on-chain and off-chain data.
  - `packages/1ui`: UI component library.
  - `packages/graphql`: GraphQL queries and mutations.

### 2. Package Management (pnpm)

- **Install dependencies**: `pnpm install`
- **Add dependency**: `pnpm add <pkg> --filter <workspace>`
- **Run script**: `pnpm <script> --filter <workspace>` or `pnpm <workspace>:<script>` (e.g., `pnpm portal:dev`)

### 3. Build & Test (Turbo)

- **Build**: `pnpm build` (runs `turbo build`)
- **Test**: `pnpm test` (runs `turbo test`)
- **Lint**: `pnpm lint`
- **Typecheck**: `pnpm typecheck`

### 4. Coding Standards

- **TypeScript**: Strict mode enabled. No `any`. Use `unknown` with narrowing if necessary.
- **Functional Style**: Prefer pure functions, immutability, and `const`.
- **Async**: Use `async/await`. Avoid raw `.then()`.
- **Validation**: Use Zod for runtime validation of external data (API responses, user input).
- **Error Handling**: Use typed error handling where possible.
- **Styling**: Tailwind CSS.

### 5. Testing (Vitest)

- Write unit tests for all utility functions.
- Use `vi.mock` for external dependencies.
- Colocate tests with source files or use a `__tests__` directory.

## Commit Messages

- Follow Conventional Commits: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

## Important Commands

- `pnpm dev`: Start development servers.
- `pnpm changeset`: Generate a changeset for versioning.
- `pnpm format`: Format code with Prettier.
