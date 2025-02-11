import Anthropic from '@anthropic-ai/sdk'
import { NextApiRequest, NextApiResponse } from 'next'

import { callTool, mcpClient } from '../../lib/mcp-client.ts'
import * as prompts from '../../lib/prompts'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_KEY })

const mcpToolsList = await mcpClient.listTools()
console.log(JSON.stringify(mcpToolsList, 0, 2))

const toolsToAnthropic = []

for (const tool of mcpToolsList.tools) {
  toolsToAnthropic.push({
    name: tool.name,
    description: tool.description,
    input_schema: tool.inputSchema,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { text: input } = req.body

  if (!input) {
    return res.status(400).json({ message: 'Text is required' })
  }

  try {
    // Maximum number of autonomous steps
    const maxIterations = 10
    const messages = [{ role: 'user', content: input }]
    for (let i = 0; i < maxIterations; i++) {
      console.log('calling anthropic:', messages)
      // Call to LLM through OpenRouter
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-latest',
        system:
          prompts.aboutYou + prompts.prompts.defaultCompletionSystemPrompt,
        messages: messages,
        max_tokens: 1024, // Adjust based on your need
        tools: toolsToAnthropic,
      })
      console.log('response from anthropic:', response)

      if (response.content.length <= 0) {
        throw new Error('no response from anthropic')
      }

      // the response is a stream of JSON objects
      // one JSON object per line
      req.on('close', () => {
        res.end()
      })

      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')

      for (const content of response.content) {
        switch (content.type) {
          // whenever we have some text we send it to the user
          case 'text':
            res.write(`${JSON.stringify({ text: content.text })}\n`)
            messages.push({ role: 'assistant', content: [content] })
            break

          // execute tool when required
          case 'tool_use':
            messages.push({ role: 'assistant', content: [content] })
            const toolsResponse = await callTool(content.name, content.input)
            res.write(
              `${JSON.stringify({ text: toolsResponse.content[0].text })}\n`,
            )
            messages.push({
              role: 'user',
              content: [
                {
                  type: 'tool_result',
                  tool_use_id: content.id,
                  content: toolsResponse.content[0].text,
                },
              ],
            })
            break
        }
      }

      // if end_turn, we're done
      if (response.stop_reason === 'end_turn') {
        break
      }
    }

    res.status(200).end()
  } catch (error) {
    console.error('Error:', error)
    res
      .status(500)
      .json({ message: 'An error occurred while processing your request' })
  }
}
