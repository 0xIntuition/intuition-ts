import { formatFiles, generateFiles, Tree, names } from '@nx/devkit'
import * as path from 'path'
import { uiComponentGeneratorSchema } from './schema'

export async function uiComponentGenerator(
  tree: Tree,
  options: uiComponentGeneratorSchema,
) {
  function isPascalCase(str: string): boolean {
    return /^[A-Z][a-zA-Z0-9]*$/.test(str)
  }

  if (!isPascalCase(options.name)) {
    throw new Error(
      `The component name "${options.name}" is not in PascalCase. Please use PascalCase naming (e.g., "MyComponent").`,
    )
  }

  // Convert the name to a proper directory name if needed
  const directoryName = names(options.name).fileName
  const projectRoot = `packages/1ui/src/components/${directoryName}`

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    // Spread other transformed names if needed, this allows for template customization
    ...names(options.name),
  })
  await formatFiles(tree)
}

export default uiComponentGenerator
