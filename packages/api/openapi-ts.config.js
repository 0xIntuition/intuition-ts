import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: 'axios',
  input: 'http://localhost:3002/api-docs/openapi.json',
  output: {
    format: 'prettier',
    path: './api-client',
  },
  types: {
    enums: 'javascript',
  },
  schemas: false,
})
