/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverModuleFormat: 'cjs',
  serverPlatform: 'node',
  tailwind: true,
  postcss: true,
  watchPaths: ['../../packages/*/src/**/*'],
  ignoredRouteFiles: ['**/.*'],
}
