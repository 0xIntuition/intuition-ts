import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: 'axios',
  input: './swagger.json',
  output: {
    format: 'prettier',
    path: 'packages/api/api-client',
  },
  types: {
    enums: 'javascript',
  },
  schemas: false,
})
