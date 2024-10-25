import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.VITE_HASURA_PROJECT_ENDPOINT
    ? [process.env.VITE_HASURA_PROJECT_ENDPOINT]
    : [],
  // [`${process.env.HASURA_PROJECT_ENDPOINT}`]: {
  //   headers: {
  //     'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
  //   },
  // },
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: ["**/*.ts", "**/*.tsx"],
  generates: {
    './src/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        config: {
          enumsAsTypes: false,
          exportFragmentSpreadSubTypes: true,
          dedupeFragments: true,
          strictScalars: true,
        },
      }
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  },
  watch: true,
  hooks: { afterAllFileWrite: ['prettier --write'] },
}

export default config
