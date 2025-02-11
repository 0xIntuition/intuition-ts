#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

import * as search from './operations/search.js'
import * as triples from './operations/triples.js'

const server = new Server(
  {
    name: 'intuition-mcp-server',
    version: '0.0.1',
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'extract_triples',
        description: 'Extract triples from user input',
        inputSchema: zodToJsonSchema(triples.ExtractTriplesSchema),
      },
      {
        name: 'search_intuition',
        description: 'Search intuition graph for given triples',
        inputSchema: zodToJsonSchema(search.SearchIntuitionSchema),
      },
    ],
  }
})

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params.arguments) {
      throw new Error('Arguments are required')
    }

    switch (request.params.name) {
      case 'extract_triples': {
        const args = triples.ExtractTriplesSchema.parse(
          request.params.arguments,
        )

        const triplesExtracted = await triples.extractTriples(args.input)

        return {
          content: [
            {
              type: 'text',
              text: `I extracted the following triples from  your statement ${JSON.stringify(triplesExtracted)}`,
              data: triplesExtracted,
            },
          ],
        }
      }
      case 'search_intuition': {
        const args = search.SearchIntuitionSchema.parse(
          request.params.arguments,
        )

        const triplesFound = await search.searchIntuition(args.triples)

        return {
          content: [
            {
              type: 'text',
              text: `I searched intuition and found the following triples: ${JSON.stringify(triplesFound)}`,
              data: triplesFound,
            },
          ],
        }
      }

      default:
        throw new Error(`Unknown tool: ${request.params.name}`)
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${JSON.stringify(error.errors)}`)
    }
    throw error
  }
})

async function runServer() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('GitHub MCP Server running on stdio')
}

runServer().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
