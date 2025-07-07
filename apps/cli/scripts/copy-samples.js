import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    // eslint-disable-next-line no-await-in-loop
    await (entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFile(srcPath, destPath));
  }
}

async function main() {
  const src = path.resolve(__dirname, '../src/commands/atom/batch/samples')
  const dest = path.resolve(__dirname, '../dist/commands/atom/batch/samples')
  await copyDir(src, dest)
  console.log(`Copied samples from ${src} to ${dest}`)
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main().catch((error) => {
  console.error('Failed to copy samples:', error)
  // eslint-disable-next-line n/no-process-exit
  process.exit(1)
}) 