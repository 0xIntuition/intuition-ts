# Welcome to the Intuition 1ui Component Library

This is our initial `1ui` component library. This will eventually become a published package, but right now we're developing it and running it from within the monorepo structure. We're importing this into our `apps` such as Portal while we're building.

## Getting Started

Once you've cloned the `intuition-ts` monorepo you can run 1ui from the monorepo root. Install all packages from the monorepo root by running `pnpm install`.

## Installing Components in Apps

Once you add components to the component library you'll need to run `pnpm --filter 1ui build` before they'll be ready for importing. The build is powered by Vite, so this is typically a quick process.
Once `1ui` successfully builds, you can import components into apps directly from the 1ui package:
`import { Button, Label, Input } from '@0xintuition/1ui';`
These components are fully type safe and have the styles/variants/etc. injected.

## Adding Components to the Component Library

To create a new component in 1ui run the command `pnpm 1ui:component:create` and follow the prompts.
We leverage the Shadcn/ui stack whenever possible:

- Shadcn/ui: [Shadcn/ui Documentation](https://tailwindcss.com/docs/installation)
- Tailwind: [Tailwind Documentation](https://tailwindcss.com/docs/installation)
- Radix: [Radix Documentation](https://www.radix-ui.com/)

## Running Storybook

This package also contains a [Storybook](https://storybook.js.org/) instance that is using the [Vite builder](https://storybook.js.org/docs/builders/vite).

Storybook runs on port 6006. You're able to run Storybook and Portal at the same time since they're on unique ports.

You can run Storybook with `pnpm run --filter 1ui ui`. This opens a window with your default browser.
You can also run Storybook without opening in your default browser with `pnpm run --filter 1ui ui --ci` -- this is helpful if you already have a tab open.

## Publishing

### Version Management

We follow semantic versioning (SemVer):

- `pnpm version:patch` - Bug fixes (0.0.X)
- `pnpm version:minor` - New features (0.X.0)
- `pnpm version:major` - Breaking changes (X.0.0)
- `pnpm version:beta` - Pre-release versions (X.X.X-beta.0)

### Publishing Workflow

1. Bump the version:

```bash
# For bug fixes
pnpm version:patch

# For new features
pnpm version:minor

# For breaking changes
pnpm version:major

# For beta releases
pnpm version:beta
```

2. Verify package contents:

```bash
pnpm publish-dry
```

3. Publish the package:

```bash
# For stable releases
pnpm publish-latest

# For beta/development releases
pnpm publish-next
```

### Publishing Notes

- Always run `publish-dry` before publishing to verify package contents
- Use `--tag next` for development/beta versions
- Use `--tag latest` for production versions
- The package will be published to npm as `@0xintuition/1ui`

## Local Development Testing

To test changes without publishing to npm, you can use the local registry (Verdaccio). This is useful for testing changes in other apps within the monorepo or in external projects.

> **Setup**: Copy `.npmrc.example` from the root to `.npmrc` to configure the local registry.

### Testing in Monorepo Apps (Recommended)

1. Start the local registry:

```bash
pnpm nx local-registry
```

2. Make changes to the package and build:

```bash
cd packages/1ui
pnpm build
```

3. Publish to local registry:

```bash
npm publish --registry http://localhost:4873
```

4. In your test app (e.g., apps/template), update the package version:

```json
{
  "dependencies": {
    "@0xintuition/1ui": "^x.x.x" // Use the version you just published
  }
}
```

5. Install the updated package:

```bash
pnpm install
```

### Testing in External Projects

If you need to test in a project outside the monorepo:

```bash
# Create and set up test project
mkdir ~/1ui-test
cd ~/1ui-test
pnpm init

# Install dependencies
pnpm add @0xintuition/1ui --registry http://localhost:4873
pnpm add react react-dom @types/react typescript

# Create a test file (test.tsx)
echo 'import React from "react";
import { Button } from "@0xintuition/1ui";
export default function Test() {
  return <Button>Test Button</Button>;
}' > test.tsx

# Verify types work
pnpm tsc test.tsx --noEmit
```

### Notes

- The local registry persists packages in `tmp/local-registry/storage`
- Clear storage by stopping and restarting the registry
- First-time publishing requires creating a user (any username/password works)
- The registry runs on port 4873 by default
