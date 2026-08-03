#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve, sep } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = resolve(scriptDirectory, '../../..')
const graphqlDirectory = join(repositoryRoot, 'packages/graphql')
const sdkDirectory = join(repositoryRoot, 'packages/sdk')
const temporaryRoot = mkdtempSync(
  join(tmpdir(), 'intuition-packed-consumer-audit-'),
)
const packDirectory = join(temporaryRoot, 'packs')
const consumerDirectory = join(temporaryRoot, 'consumer')
const npmCacheDirectory = join(temporaryRoot, 'npm-cache')

mkdirSync(packDirectory)
mkdirSync(consumerDirectory)

try {
  run('pnpm', [
    '--dir',
    graphqlDirectory,
    'pack',
    '--pack-destination',
    packDirectory,
  ])
  run('pnpm', [
    '--dir',
    sdkDirectory,
    'pack',
    '--pack-destination',
    packDirectory,
  ])

  const graphqlTarball = findTarball('0xintuition-graphql-')
  const sdkTarball = findTarball('0xintuition-sdk-')
  const packedGraphqlPackage = JSON.parse(
    output('tar', ['-xOf', graphqlTarball, 'package/package.json']),
  )

  if (
    packedGraphqlPackage.dependencies?.[
      '@graphql-codegen/typescript-document-nodes'
    ]
  ) {
    throw new Error(
      'Packed GraphQL package exposes typescript-document-nodes as a runtime dependency',
    )
  }

  writeFileSync(
    join(consumerDirectory, 'package.json'),
    `${JSON.stringify(
      {
        name: 'intuition-packed-consumer-audit',
        version: '1.0.0',
        private: true,
        type: 'module',
        dependencies: {
          '@0xintuition/graphql': fileDependency(graphqlTarball),
          '@0xintuition/sdk': fileDependency(sdkTarball),
          viem: '^2.0.0',
        },
        overrides: {
          '@0xintuition/sdk': {
            '@0xintuition/graphql': '$@0xintuition/graphql',
          },
        },
      },
      null,
      2,
    )}\n`,
  )

  run('npm', ['install'], { cwd: consumerDirectory })
  run(
    process.execPath,
    [
      '--input-type=module',
      '--eval',
      "import * as graphql from '@0xintuition/graphql'; import * as sdk from '@0xintuition/sdk'; if (typeof graphql.PinThingDocument !== 'string' || !graphql.PinThingDocument.includes('mutation pinThing')) throw new Error('generated PinThingDocument export changed'); if (typeof sdk.configureSdk !== 'function') throw new Error('SDK configureSdk export missing'); console.log('Packed exports smoke passed')",
    ],
    { cwd: consumerDirectory },
  )
  run('npm', ['audit', '--omit=dev'], { cwd: consumerDirectory })

  console.log(
    `Packed GraphQL runtime dependencies: ${Object.keys(
      packedGraphqlPackage.dependencies ?? {},
    ).join(', ')}`,
  )
  console.log('Packed consumer audit passed')
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true })
}

function findTarball(prefix) {
  const filename = readdirSync(packDirectory).find(
    (entry) => entry.startsWith(prefix) && entry.endsWith('.tgz'),
  )

  if (!filename) {
    throw new Error(`Missing packed tarball with prefix ${prefix}`)
  }

  return join(packDirectory, filename)
}

function fileDependency(tarball) {
  return `file:${relative(consumerDirectory, tarball).split(sep).join('/')}`
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repositoryRoot,
    env: {
      ...process.env,
      npm_config_cache: npmCacheDirectory,
    },
    stdio: 'inherit',
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(`${command} exited with status ${result.status}`)
  }
}

function output(command, args) {
  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    encoding: 'utf8',
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(
      `${command} exited with status ${result.status}: ${result.stderr}`,
    )
  }

  return result.stdout
}
