import { names, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'

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
    const pascalCaseName = names(options.name).className
    const componentDirectory = `packages/1ui/src/components/${pascalCaseName}`

    expect(
      tree.exists(`${componentDirectory}/${pascalCaseName}.tsx`),
    ).toBeTruthy()
    expect(tree.exists(`${componentDirectory}/index.ts`)).toBeTruthy()
    expect(
      tree.exists(`${componentDirectory}/${pascalCaseName}.spec.tsx`),
    ).toBeTruthy()
    expect(
      tree.exists(`${componentDirectory}/${pascalCaseName}.stories.tsx`),
    ).toBeTruthy()
  })
})
