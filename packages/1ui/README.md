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

We leverage the Shadcn/ui stack whenever possible:

- Shadcn/ui: [Shadcn/ui Documentation](https://tailwindcss.com/docs/installation)
- Tailwind: [Tailwind Documentation](https://tailwindcss.com/docs/installation)
- Radix: [Radix Documentation](https://www.radix-ui.com/)

## Running Storybook

This package also contains aa [Storybook](https://storybook.js.org/) instance that is using the [Vite builder](https://storybook.js.org/docs/builders/vite).

Storybook runs on port 6006. You're able to run Storybook and Portal at the same time since they're on unique ports.

You can run Storybook with `pnpm run --filter 1ui ui`. This opens a window with your default browser.
You can also run Storybook without opening in your default browser with `pnpm run --filter 1ui ui --ci` -- this is helpful if you already have a tab open.
