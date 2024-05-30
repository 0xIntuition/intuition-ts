/**
 * This file is intended to set all configs for OpenAPI Codegen
 * DO NOT edit any files in the `src/api-client` folder directly - it is generated using these settings
 */
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
