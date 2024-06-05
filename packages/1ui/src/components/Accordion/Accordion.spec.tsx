import React from 'react'

import { render } from '@testing-library/react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion'

describe('Accordion', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <Accordion type="single" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full"
          data-orientation="vertical"
        >
          <div
            class="border-0 border-b border-solid border-border/30"
            data-orientation="vertical"
            data-state="closed"
          >
            <h3
              class="flex"
              data-orientation="vertical"
              data-state="closed"
            >
              <button
                aria-controls="radix-:r1:"
                aria-expanded="false"
                class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
                data-orientation="vertical"
                data-radix-collection-item=""
                data-state="closed"
                id="radix-:r0:"
                type="button"
              >
                Is it accessible?
                <svg
                  class="h-5 w-5 shrink-0 transition-transform duration-200"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#chevron-down-small"
                  />
                </svg>
              </button>
            </h3>
            <div
              aria-labelledby="radix-:r0:"
              class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
              data-orientation="vertical"
              data-state="closed"
              hidden=""
              id="radix-:r1:"
              role="region"
              style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
            />
          </div>
          <div
            class="border-0 border-b border-solid border-border/30"
            data-orientation="vertical"
            data-state="closed"
          >
            <h3
              class="flex"
              data-orientation="vertical"
              data-state="closed"
            >
              <button
                aria-controls="radix-:r3:"
                aria-expanded="false"
                class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
                data-orientation="vertical"
                data-radix-collection-item=""
                data-state="closed"
                id="radix-:r2:"
                type="button"
              >
                Is it styled?
                <svg
                  class="h-5 w-5 shrink-0 transition-transform duration-200"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#chevron-down-small"
                  />
                </svg>
              </button>
            </h3>
            <div
              aria-labelledby="radix-:r2:"
              class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
              data-orientation="vertical"
              data-state="closed"
              hidden=""
              id="radix-:r3:"
              role="region"
              style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
            />
          </div>
          <div
            class="border-0 border-b border-solid border-border/30"
            data-orientation="vertical"
            data-state="closed"
          >
            <h3
              class="flex"
              data-orientation="vertical"
              data-state="closed"
            >
              <button
                aria-controls="radix-:r5:"
                aria-expanded="false"
                class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
                data-orientation="vertical"
                data-radix-collection-item=""
                data-state="closed"
                id="radix-:r4:"
                type="button"
              >
                Is it animated?
                <svg
                  class="h-5 w-5 shrink-0 transition-transform duration-200"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#chevron-down-small"
                  />
                </svg>
              </button>
            </h3>
            <div
              aria-labelledby="radix-:r4:"
              class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
              data-orientation="vertical"
              data-state="closed"
              hidden=""
              id="radix-:r5:"
              role="region"
              style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
            />
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
