// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

import { animeNodes } from './csv-example'
// Import your actual component
import { FileExplorerItem } from './FileExplorer'

// Setup meta for the Storybook
const meta: Meta<typeof FileExplorerItem> = {
  title: 'Components/FileExplorer',
  component: FileExplorerItem,
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof FileExplorerItem>

type Node = {
  name: string
  nodes?: Node[]
}

const nodes: Node[] = [
  {
    name: 'jojikun',
    nodes: [
      {
        name: 'Movies',
        nodes: [
          {
            name: 'Romantic Comedies',
            nodes: [
              {
                name: '2000s',
                nodes: [
                  { name: 'Gladiator.atom' },
                  { name: 'The-Dark-Knight.atom' },
                ],
              },
              { name: '2010s', nodes: [] },
            ],
          },
          {
            name: 'Dark Comedy',
            nodes: [{ name: '2000s', nodes: [{ name: 'Superbad.atom' }] }],
          },
          {
            name: 'Thriller',
            nodes: [
              { name: '2000s', nodes: [{ name: 'American-Beauty.atom' }] },
            ],
          },
        ],
      },
      {
        name: 'Music',
        nodes: [
          { name: 'Rock', nodes: [] },
          { name: 'Classical', nodes: [] },
        ],
      },
      { name: 'Pictures', nodes: [] },
      {
        name: 'General',
        nodes: [],
      },
      { name: 'jojikun.atom' },
    ],
  },
]

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    // Define default props here, if any
  },
  render: (args) => (
    <ul>
      {animeNodes.map((node) => (
        <FileExplorerItem node={node} key={node.name} />
      ))}
    </ul>
  ),
}
