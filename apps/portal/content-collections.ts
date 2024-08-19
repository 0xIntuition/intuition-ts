import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import logger from '@lib/utils/logger'

const quests = defineCollection({
  name: 'quests',
  directory: '/app/routes/app+/quest+/content',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
  }),
  typeName: 'QuestContentType',
  // we can exclude the content from the data
  // because remix will load the content for us
  transform: async (document, context) => {
    const { _meta } = document
    const slug = _meta.path.replace('quests.', '')
    const body = await compileMDX(context, document)
    return {
      ...document,
      body,
      slug,
    }
  },
  onSuccess: (docs) => {
    logger(`generated quest collection with ${docs.length}`)
  },
})

export default defineConfig({
  collections: [quests],
})
