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

    // Resolve configuration
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@0xintuition/1ui': join(process.cwd(), '../../packages/1ui/src'),
        '@0xintuition/1ui/src/components/Button': join(
          process.cwd(),
          '../../packages/1ui/src/components/Button',
        ),
        '@0xintuition/1ui/src/components': join(
          process.cwd(),
          '../../packages/1ui/src/components',
        ),
        '@0xintuition/1ui/src/styles': join(
          process.cwd(),
          '../../packages/1ui/src/styles',
        ),
        '@0xintuition/1ui/src/types': join(
          process.cwd(),
          '../../packages/1ui/src/types',
        ),
        '@0xintuition/1ui/src/utils': join(
          process.cwd(),
          '../../packages/1ui/src/utils',
        ),
        types: join(process.cwd(), '../../packages/1ui/src/types'),
        components: join(process.cwd(), '../../packages/1ui/src/components'),
        styles: join(process.cwd(), '../../packages/1ui/src/styles'),
        utils: join(process.cwd(), '../../packages/1ui/src/utils'),
      },
    }
    return config
  },
}

export default nextConfig
