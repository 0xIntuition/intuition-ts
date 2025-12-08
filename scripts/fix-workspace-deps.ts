#!/usr/bin/env bun
/**
 * fix-workspace-deps.ts
 *
 * Replaces `workspace:*` and `workspace:^` references with actual version numbers
 * from the monorepo before publishing to npm.
 *
 * Usage:
 *   bun run scripts/fix-workspace-deps.ts            # Replace workspace:* with versions
 *   bun run scripts/fix-workspace-deps.ts --restore  # Restore workspace:* after publish
 */
import { readdir, readFile, unlink, writeFile } from 'fs/promises'
import { dirname, join } from 'path'

const SCRIPT_DIR = dirname(new URL(import.meta.url).pathname)
const PACKAGES_DIR = join(SCRIPT_DIR, '..', 'packages')
const BACKUP_SUFFIX = '.workspace-backup'

interface PackageJson {
  name: string
  version: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
}

async function getWorkspacePackages(): Promise<Map<string, string>> {
  const packages = new Map<string, string>()
  const entries = await readdir(PACKAGES_DIR, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const pkgPath = join(PACKAGES_DIR, entry.name, 'package.json')
    try {
      const content = await readFile(pkgPath, 'utf-8')
      const pkg: PackageJson = JSON.parse(content)
      if (pkg.name && pkg.version) {
        packages.set(pkg.name, pkg.version)
      }
    } catch {
      // Skip directories without package.json
    }
  }

  return packages
}

function replaceWorkspaceRefs(
  deps: Record<string, string> | undefined,
  workspacePackages: Map<string, string>,
): boolean {
  if (!deps) return false

  let modified = false
  for (const [name, version] of Object.entries(deps)) {
    if (version.startsWith('workspace:')) {
      const actualVersion = workspacePackages.get(name)
      if (actualVersion) {
        // workspace:* → ^x.y.z, workspace:^ → ^x.y.z
        deps[name] = `^${actualVersion}`
        modified = true
        console.log(`  ${name}: ${version} → ^${actualVersion}`)
      } else {
        console.warn(
          `  ⚠️  ${name}: workspace package not found, keeping ${version}`,
        )
      }
    }
  }
  return modified
}

async function fixWorkspaceDeps(): Promise<void> {
  console.log('🔧 Fixing workspace dependencies...\n')

  const workspacePackages = await getWorkspacePackages()
  console.log(`Found ${workspacePackages.size} workspace packages:\n`)
  for (const [name, version] of workspacePackages) {
    console.log(`  ${name}@${version}`)
  }
  console.log()

  const entries = await readdir(PACKAGES_DIR, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const pkgPath = join(PACKAGES_DIR, entry.name, 'package.json')
    const backupPath = pkgPath + BACKUP_SUFFIX

    try {
      const content = await readFile(pkgPath, 'utf-8')
      const pkg: PackageJson = JSON.parse(content)

      console.log(`📦 ${pkg.name}`)

      // Backup original
      await writeFile(backupPath, content)

      // Replace workspace refs in all dependency types
      let modified = false
      modified =
        replaceWorkspaceRefs(pkg.dependencies, workspacePackages) || modified
      modified =
        replaceWorkspaceRefs(pkg.devDependencies, workspacePackages) || modified
      modified =
        replaceWorkspaceRefs(pkg.peerDependencies, workspacePackages) ||
        modified
      modified =
        replaceWorkspaceRefs(pkg.optionalDependencies, workspacePackages) ||
        modified

      if (modified) {
        await writeFile(pkgPath, JSON.stringify(pkg, null, '\t') + '\n')
        console.log('  ✅ Updated\n')
      } else {
        console.log('  ⏭️  No workspace deps\n')
      }
    } catch {
      // Skip directories without package.json
    }
  }

  console.log('✅ Done! Workspace dependencies replaced with actual versions.')
  console.log(
    '   Run with --restore after publishing to restore workspace:* refs.\n',
  )
}

async function restoreWorkspaceDeps(): Promise<void> {
  console.log('🔄 Restoring workspace dependencies...\n')

  const entries = await readdir(PACKAGES_DIR, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const pkgPath = join(PACKAGES_DIR, entry.name, 'package.json')
    const backupPath = pkgPath + BACKUP_SUFFIX

    try {
      const backup = await readFile(backupPath, 'utf-8')
      await writeFile(pkgPath, backup)
      await unlink(backupPath)
      console.log(`✅ Restored ${entry.name}/package.json`)
    } catch {
      // No backup to restore
    }
  }

  console.log('\n✅ Done! Workspace dependencies restored.\n')
}

// Main
const args = process.argv.slice(2)
if (args.includes('--restore')) {
  await restoreWorkspaceDeps()
} else {
  await fixWorkspaceDeps()
}
