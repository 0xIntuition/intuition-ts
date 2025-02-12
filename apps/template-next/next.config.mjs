import { join } from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@0xintuition/1ui',
    '@0xintuition/api',
    '@0xintuition/graphql',
  ],
  reactStrictMode: true,
  webpack: (config) => {
    // Simpler SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })
    return config
  },
  experimental: {
    // Enable Turbopack features
    turbo: {
      resolveAlias: {
        '@0xintuition/1ui': {
          type: 'package-dir',
          root: '../../packages/1ui/src',
        },
        '@0xintuition/1ui/src/components': {
          type: 'package-dir',
          root: '../../packages/1ui/src/components',
        },
        '@0xintuition/1ui/src/styles': {
          type: 'package-dir',
          root: '../../packages/1ui/src/styles',
        },
        '@0xintuition/1ui/src/types': {
          type: 'package-dir',
          root: '../../packages/1ui/src/types',
        },
        '@0xintuition/1ui/src/utils': {
          type: 'package-dir',
          root: '../../packages/1ui/src/utils',
        },
        '@0xintuition/api': {
          type: 'package-dir',
          root: '../../packages/api',
        },
        '@0xintuition/graphql': {
          type: 'package-dir',
          root: '../../packages/graphql',
        },
      },
    },
  },
}

export default nextConfig
