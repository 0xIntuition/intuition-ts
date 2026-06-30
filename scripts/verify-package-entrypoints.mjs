import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const packageJsonPath = resolve(process.cwd(), 'package.json')
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

const entrypoints = new Set()

function addEntrypoint(value) {
  if (typeof value === 'string') {
    entrypoints.add(value)
    return
  }

  if (!value || typeof value !== 'object') {
    return
  }

  for (const nestedValue of Object.values(value)) {
    addEntrypoint(nestedValue)
  }
}

addEntrypoint(pkg.main)
addEntrypoint(pkg.module)
addEntrypoint(pkg.types)
addEntrypoint(pkg.exports)
addEntrypoint(pkg.bin)

const missingEntrypoints = [...entrypoints]
  .filter((entrypoint) => !entrypoint.includes('*'))
  .filter((entrypoint) => !/^[a-z][a-z+.-]*:/i.test(entrypoint))
  .filter((entrypoint) => !existsSync(resolve(process.cwd(), entrypoint)))

if (missingEntrypoints.length > 0) {
  console.error(
    `Missing package entrypoints for ${pkg.name}@${pkg.version}:\n${missingEntrypoints
      .map((entrypoint) => `- ${entrypoint}`)
      .join('\n')}`,
  )
  process.exit(1)
}

console.log(`Verified package entrypoints for ${pkg.name}@${pkg.version}`)
