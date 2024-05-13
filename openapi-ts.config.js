import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: 'axios',
  input: './swagger.json',
  output: {
    format: 'prettier',
    path: 'libs/api-client',
  },
  types: {
    enums: 'javascript',
  },
  schemas: false,
})
