import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree, names } from '@nx/devkit'

import { uiComponentGenerator } from './generator'
import { uiComponentGeneratorSchema } from './schema'

describe('ui-component generator', () => {
  let tree: Tree
  const options: uiComponentGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should create the correct files and directory structure', async () => {
    await uiComponentGenerator(tree, options)
    // Check if the directory with the component's name was created
    const directoryName = names(options.name).fileName
    const componentDirectory = `packages/1ui/src/components/ui/${directoryName}`

    expect(
      tree.exists(`${componentDirectory}/${directoryName}.tsx`),
    ).toBeTruthy()
    expect(tree.exists(`${componentDirectory}/index.ts`)).toBeTruthy()
    expect(
      tree.exists(`${componentDirectory}/${directoryName}.spec.tsx`),
    ).toBeTruthy()
    expect(tree.exists(`${componentDirectory}/utils.ts`)).toBeTruthy()
    expect(tree.exists(`${componentDirectory}/types.ts`)).toBeTruthy()
    expect(
      tree.exists(`${componentDirectory}/${directoryName}.stories.mdx`),
    ).toBeTruthy()
  })
})
