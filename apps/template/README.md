# Intuition App Template - Remix-Vite

Welcome to the Intuition App Template for Remix with a Vite development environment, designed to streamline your development process for building innovative, decentralized applications. This template provides out-of-the-box authentication, on-chain interactions, and efficient styling.

The integration of Vite with Remix in the Intuition App Template enhances the development experience by offering rapid hot module replacement (HMR), a streamlined plugin system for easy extensibility, and improved support for modern web technologies. This combination significantly accelerates development cycles, simplifies the integration of tools like Tailwind CSS, and optimizes the overall developer experience with faster feedback loops and build processes. Remix currently supports Vite as an alternative compiler. In the future, Vite will become the default compiler for Remix.

Learn more about Remix-Vite in the [Remix Documentation](https://remix.run/docs/en/main/future/vite).

## Getting Started

### Prerequisites

Node.js: Before anything else, Remix.run requires that you have either a Active or Maintenance version of Node.js installed.

Base and Base Sepolia: Intuition is currently deployed on both Base and Base Sepolia. You'll need Base Sepolia for any writes to the Intuition protocol. Consider using a faucet such as [Alchemy Base Sepolia Faucet](https://www.alchemy.com/faucets/base-sepolia).

## Template Stack

- **Remix (with Vite)**
  - Remix: [Remix with Vite Documentation](https://remix.run/docs/en/main/guides/vite)
  - Vite: [Vite Documentation](https://vitejs.dev/guide/)
  - Remix Flat Routes: [Flat Routes Documentation](https://github.com/kiliman/remix-flat-routes)
- **Web3:**
  - Privy: [Privy Documentation](https://docs.privy.io/)
  - Viem: [Viem Documentation](https://viem.sh/)
  - Wagmi: [Wagmi Documentation](https://wagmi.sh/)
- **Styling:**
  - Shadcn/ui: [Shadcn/ui Documentation](https://tailwindcss.com/docs/installation)
  - Tailwind: [Tailwind Documentation](https://tailwindcss.com/docs/installation)
  - Radix: [Radix Documentation](https://www.radix-ui.com/)
- **Forms and Data:**
  - Zod: [Zod Documentation](https://zod.dev/)
  - Conform: [Conform Documentation](https://conform.guide/)
- **State Management:**
  - Jotai: [Jotai Documentation](https://jotai.org/docs/introduction)
- **Data Fetching:**
  - Tanstack Query: [Tanstack Query Documentation](https://tanstack.com/query/latest)

## Development

If you're running a project using the template from within the monorepo, you can run the dev server directly from the monorepo root:

`pnpm run template:dev`

If you've cloned this template into a standalone project, you can run directly from the project root:

`pnpm run dev`
