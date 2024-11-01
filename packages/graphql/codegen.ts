import { CodegenConfig } from '@graphql-codegen/cli'
import type { Types } from '@graphql-codegen/plugin-helpers'

const commonGenerateOptions: Types.ConfiguredOutput = {
  config: {
    reactQueryVersion: 5,
    fetcher: '../client#fetcher',
    exposeDocument: true,
    exposeFetcher: true,
    exposeQueryKeys: true,
    exposeMutationKeys: true,
    addInfiniteQuery: true,
    enumsAsTypes: true,
    dedupeFragments: true,
    documentMode: 'documentNode',
    scalars: {
      Date: 'Date',
      JSON: 'Record<string, any>',
      ID: 'string',
      Void: 'void',
    },
  },
  plugins: [
    'typescript',
    '@graphql-codegen/typescript-operations',
    '@graphql-codegen/typescript-react-query',
    'typescript-document-nodes',
  ],
}

const config: CodegenConfig = {
  overwrite: true,
  hooks: { afterAllFileWrite: ['prettier --write'] },
  schema: process.env.HASURA_PROJECT_ENDPOINT
    ? [process.env.HASURA_PROJECT_ENDPOINT]
    : ['./schema.graphql'],
  ignoreNoDocuments: true,
  documents: ['**/*.graphql'],
  generates: {
    './src/generated/index.ts': {
      config: {
        ...commonGenerateOptions.config,
      },
      plugins: commonGenerateOptions.plugins,
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
  watch: true,
}

export default config
