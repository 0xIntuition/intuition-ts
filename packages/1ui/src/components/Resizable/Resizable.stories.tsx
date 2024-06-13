// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './Resizable'

// Setup meta for the Storybook
const meta: Meta<typeof ResizablePanel> = {
  title: 'Components/Resizable',
  component: ResizablePanel,
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof ResizablePanel>

// Example story for the default state
export const BasicUsage: Story = {
  // eslint-disable-next-line
  render: (args) => (
    <div className="w-[500px]">
      <ResizablePanelGroup
        direction="horizontal"
        className="border-border/30 max-w-lg rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-[200px] items-center justify-center p-6">
            <span className="font-semibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

// Example story for the default state
export const Vertical: Story = {
  // eslint-disable-next-line
  render: (args) => (
    <div className="w-[500px]">
      <ResizablePanelGroup
        direction="vertical"
        className="border-border/30 min-h-[200px] max-w-lg rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Top</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Bottom</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

// Example story for the default state
export const Sidebar: Story = {
  // eslint-disable-next-line
  render: (args) => (
    <div className="w-[500px]">
      <ResizablePanelGroup
        direction="horizontal"
        className="border-border/30 min-h-[200px] rounded-lg border"
      >
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}
