import * as path from 'path'

import { formatFiles, generateFiles, names, Tree } from '@nx/devkit'

import { uiComponentGeneratorSchema } from './schema'

export async function uiComponentGenerator(
  tree: Tree,
  options: uiComponentGeneratorSchema,
) {
  function isPascalCase(str: string): boolean {
    return /^[A-Z][a-zA-Z0-9]*$/.test(str)
  }

  const componentName = options.name

  if (!isPascalCase(componentName)) {
    throw new Error(
      `The component name "${componentName}" is not in PascalCase. Please use PascalCase naming (e.g., "MyComponent").`,
    )
  }

  // Convert the name to a proper directory name if needed
  const projectRoot = `packages/1ui/src/components/${componentName}`

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    // Spread other transformed names if needed, this allows for template customization
    ...names(componentName),
  })

  // Add export to root index file
  const indexFilePath = `packages/1ui/src/components/index.tsx`
  let contents = tree.read(indexFilePath)?.toString()
  const newContents = (contents += `export * from './${componentName}'`)
  if (newContents) {
    tree.write(indexFilePath, newContents)
  }

  await formatFiles(tree)
}

export default uiComponentGenerator
