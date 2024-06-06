import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPageCounter,
  PaginationPrevious,
  PaginationRowSelection,
  PaginationSummary,
} from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
}

export default meta

type Story = StoryObj<typeof Pagination>

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <Pagination {...args} className="w-[800px] flex justify-between">
      <PaginationSummary totalEntries={100} label="users" />
      <div className="flex">
        <PaginationRowSelection defaultValue={10} />
        <PaginationPageCounter currentPage={1} totalPages={10} />
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href="#" disabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#" disabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast href="#" />
          </PaginationItem>
        </PaginationContent>
      </div>
    </Pagination>
  ),
}

export const AlternateSetup: Story = {
  args: {},
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}
