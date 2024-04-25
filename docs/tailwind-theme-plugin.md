# Theme Plugin and Preset Documentation

This documentation explains the purpose and usage of our in-house Tailwind plugin called theme-plugin and theme-preset. These tools allow us to reuse shadcn components effectively across our monorepo while supporting multi-themed applications.

## Why We Created This

We implemented `theme-plugin` and `theme-preset` to streamline the integration of themes across multiple projects within our monorepo. Inspired by the structure of shadcn themes, these plugins enable us to maintain a consistent style and behavior across our applications without duplicating effort.

## Benefits

- **Reusability:** The plugin enables developers to reuse theming settings across different projects within a monorepo.
- **Customization:** It simplifies the customization process, allowing changes in a single place to propagate across all implementations.
- **Efficiency:** Developers save time by not having to repeatedly write or customize basic theming code.
- **Consistency:** Ensures UI consistency across different parts of the project or between projects.
- **DX:** Enhances developer experience by providing a clear structure for theme and design-system style management.
- **Maintenance:** Centralizes theming configuration, making it easier to maintain and update.
- **Scalability:** Supports scalability in project design and development without losing control over the visual experience.
- **Brand Flexibility:** Supporting multiple themes can accommodate different branding requirements, making the application versatile for various deployments or client-specific branding needs.

## Drawbacks

- **Learning Curve:** There's an initial learning curve involved in understanding and using the plugin effectively.
- **Integration:** Requires careful integration into existing projects to avoid conflicts with other CSS settings.

> **Note:** - We do not have a clear idea of how builders will leverage this to restyle components/widgets in their projects. High level idea is providing it similar to how wallet providers like Rainbowkit and Privy enable users to customize their wallet UI.

## Future Improvements

Currently, `theme-plugin` and `theme-preset` only manage color schemes and border radii. Future improvements may include:

- **Extended Theme Attributes**: Incorporating typography, elevation, and more detailed theme specifications inspired by shadcn's theme configs and our design system.
- **Enhanced Mode Handling**: Adding robust support for switching between light and dark modes for each theme.

> **Note:** This implementation is still in progress and does not yet include complete support for all planned features.

## Code

The code for the theme plugin and preset can be found in the `packages/1ui` directory of the monorepo.
