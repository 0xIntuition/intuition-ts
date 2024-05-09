import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree, names } from '@nx/devkit'

import { uiComponentGenerator } from './generator'
import { uiComponentGeneratorSchema } from './schema'

describe('ui-component generator', () => {
  let tree: Tree
  const options: uiComponentGeneratorSchema = { name: 'HelloWorld' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should create the correct files and directory structure', async () => {
    await uiComponentGenerator(tree, options)
    // Adjust the directoryName to use the format the generator produces, e.g., hello-world
    const directoryName = names(options.name).fileName
    const pascalCaseName = names(options.name).className // This will be 'HelloWorld'
    const componentDirectory = `packages/1ui/src/components/${directoryName}`

    expect(
      tree.exists(`${componentDirectory}/${pascalCaseName}.tsx`),
    ).toBeTruthy()
    expect(tree.exists(`${componentDirectory}/index.ts`)).toBeTruthy()
    expect(
      tree.exists(`${componentDirectory}/${pascalCaseName}.spec.tsx`),
    ).toBeTruthy()
    expect(
      tree.exists(`${componentDirectory}/${pascalCaseName}.types.ts`),
    ).toBeTruthy()
    expect(
      tree.exists(`${componentDirectory}/${pascalCaseName}.mdx`),
    ).toBeTruthy()
    expect(
      tree.exists(`${componentDirectory}/${pascalCaseName}.stories.tsx`),
    ).toBeTruthy()
  })
})
