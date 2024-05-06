# Contributing

Thanks for your interest in contributing to 0xIntuition. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to [reach out to us](https://docs.intuition.systems/learn-more/contact-us).

Please read the core [CONTRIBUTING.md](../../CONTRIBUTING.md) before proceeding.

## About this package

- We use [React](https://react.dev/) for component creation.
- We use [Tailwind](https://tailwindcss.com/) to style the components.
- We use [Storybook](https://storybook.js.org/) for documenting and displaying the components.
- We use [ShadCN](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/) as our base component layer.

## Structure

This package is structured as follows:

```
1ui
└── src
    ├── components
    ├── styles
    └── stories
```

## Component structure

Components are structured within `1ui/src/components/` as follows:

```
ComponentName
├── ComponentName.tsx
├── ComponentName.spec.tsx
├── utils.ts (as required)
├── utils.spec.ts (as required)
├── types.ts
├── ComponentName.stories.ts
├── ComponentName.mdx
└── index.ts
```

### What are all these files for?

`ComponentName.tsx` - the main component file

`ComponentName.spec.tsx` - snapshot test for the component

`utils.ts` - any methods that can be extracted from the main component file _(optional)_

`utils.spec.ts` - unit tests for the utilities _(optional)_

`types.ts` - any unique interfaces, enums or types the component requires

`ComponentName.stories.mdx` - Storybook stories for the component

`index.ts` - the component export

### Creating components with the Generator

To streamline the process of creating new components, you can use our provided generator script. This script sets up all necessary files following the structure outlined above.

Run the following command in your terminal:

```bash
pnpm 1ui:component:create
```

This command will prompt you for the component name and generate all the associated files in the correct directories, ensuring everything is set up according to project standards.
