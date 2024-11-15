import React from 'react'

import { render } from '@testing-library/react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table'

describe('Table', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell className="text-right">Credit Card</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full overflow-auto"
        >
          <table
            class="w-full caption-bottom text-sm"
          >
            <caption
              class="mt-4 text-sm text-foreground/70"
            >
              A list of your recent invoices.
            </caption>
            <thead
              class="[&_tr]:border-b"
            >
              <tr
                class="border-b border-primary/20 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <th
                  class="h-12 p-4 text-left align-middle font-medium text-foreground/70 [&:has([role=checkbox])]:pr-0 hover:bg-primary-800 w-[100px]"
                >
                  Invoice
                </th>
                <th
                  class="h-12 p-4 text-left align-middle font-medium text-foreground/70 [&:has([role=checkbox])]:pr-0 hover:bg-primary-800"
                >
                  Status
                </th>
                <th
                  class="h-12 p-4 text-left align-middle font-medium text-foreground/70 [&:has([role=checkbox])]:pr-0 hover:bg-primary-800"
                >
                  Method
                </th>
                <th
                  class="h-12 p-4 align-middle font-medium text-foreground/70 [&:has([role=checkbox])]:pr-0 hover:bg-primary-800 text-right"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody
              class="[&_tr:last-child]:border-0"
            >
              <tr
                class="border-b border-primary/20 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td
                  class="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium"
                >
                  INV001
                </td>
                <td
                  class="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                >
                  Paid
                </td>
                <td
                  class="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                >
                  $250.00
                </td>
                <td
                  class="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right"
                >
                  Credit Card
                </td>
              </tr>
            </tbody>
            <tfoot
              class="bg-primary font-medium text-primary-foreground"
            >
              <tr
                class="border-b border-primary/20 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td
                  class="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                  colspan="3"
                >
                  Total
                </td>
                <td
                  class="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right"
                >
                  $2,500.00
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </DocumentFragment>
    `)
  })
})
