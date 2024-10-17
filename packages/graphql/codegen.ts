import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.HASURA_PROJECT_ENDPOINT
    ? [process.env.HASURA_PROJECT_ENDPOINT]
    : [],
  // [`${process.env.HASURA_PROJECT_ENDPOINT}`]: {
  //   headers: {
  //     'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
  //   },
  // },
  documents: 'src/**/*.graphql',
  generates: {
    './src/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
}

export default config
