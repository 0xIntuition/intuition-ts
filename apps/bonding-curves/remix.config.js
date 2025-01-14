/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'esm',
  tailwind: true,
  postcss: true,
  watchPaths: ['../../packages/**/*'],
  serverDependenciesToBundle: [/^@0xintuition\/.*/],
  future: {
    v2_routeConvention: true,
    v2_meta: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_dev: true,
  },
}
