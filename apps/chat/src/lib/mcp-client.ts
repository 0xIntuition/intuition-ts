import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

import { MCP_SERVER_ARGS, MCP_SERVER_COMMAND } from './env.ts'

const transport = new StdioClientTransport({
  command: 'node',
  args: ['../intuition-mcp-server/index.js'],
})

const mcpClient = new Client(
  {
    name: 'intuition-client',
    version: '1.0.0',
  },
  {
    capabilities: {},
  },
)

await mcpClient.connect(transport)

const callTool = async (
  toolName: string,
  args: any,
): Promise<{ type: string; text: string; data: any }[]> => {
  try {
    console.log('calling tool:', toolName, 'with args:', args)
    const resourceContent = await mcpClient.callTool({
      name: toolName,
      arguments: args,
    })
    console.log('result tool call:', resourceContent)

    return resourceContent
  } catch (error) {
    // console.error("Error parsing arguments:", error);
    return [(error as Error).message, null]
  }
}

export { mcpClient, callTool }
