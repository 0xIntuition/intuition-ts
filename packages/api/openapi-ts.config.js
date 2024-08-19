/**
 * This file is intended to set all configs for OpenAPI Codegen
 * DO NOT edit any files in the `src/api-client` folder directly - it is generated using these settings
 */
import { defineConfig } from '@hey-api/openapi-ts'

const openApiUrl = process.env.API_URL || 'https://dev.api.intuition.systems'

export default defineConfig({
  client: 'fetch',
  input: `${openApiUrl}/api-docs/openapi.json`,
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
