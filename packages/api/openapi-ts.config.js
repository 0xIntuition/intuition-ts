import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: 'fetch',
  input: 'https://dev.api.intuition.systems/api-docs/openapi.json',
  output: {
    format: 'prettier',
    path: './src/api-client',
  },
  exportCore: true,
  types: {
    enums: 'javascript',
  },
  schemas: false,
})
