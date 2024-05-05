import { formatFiles, generateFiles, Tree, names } from '@nx/devkit'
import * as path from 'path'
import { uiComponentGeneratorSchema } from './schema'

export async function uiComponentGenerator(
  tree: Tree,
  options: uiComponentGeneratorSchema,
) {
  // Convert the name to a proper directory name if needed
  const directoryName = names(options.name).fileName
  const projectRoot = `packages/1ui/src/components/ui/${directoryName}`

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    // Spread other transformed names if needed, this allows for template customization
    ...names(options.name),
  })
  await formatFiles(tree)
}

export default uiComponentGenerator
