import React from 'react'

import { render } from '@testing-library/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

describe('Tabs', () => {
  it('should render appropriate elements', () => {
    const { asFragment } = render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one" label="One " totalCount={69} />
          <TabsTrigger value="two" label="Two" totalCount={69} />
          <TabsTrigger disabled value="three" label="Three" totalCount={69} />
        </TabsList>
        <div className="bg-primary/10 p-4 rounded-lg">
          <TabsContent value="one">
            <p>One</p>
          </TabsContent>
          <TabsContent value="two">
            <p>Two</p>
          </TabsContent>
        </div>
      </Tabs>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          data-orientation="horizontal"
          dir="ltr"
        >
          <div
            aria-orientation="horizontal"
            class="flex items-center mb-2 last:mr-0"
            data-orientation="horizontal"
            role="tablist"
            style="outline: none;"
            tabindex="0"
          >
            <button
              aria-controls="radix-:r0:-content-one"
              aria-selected="true"
              class="group inline-flex items-center py-1 px-4 border border-border/20 whitespace-nowrap ring-offset-background transition-all disabled:border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none rounded-2xl w-[180px] hover:bg-primary/5 hover:border-border/10 data-[state=active]:bg-primary/10 mr-2 justify-between"
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-state="active"
              id="radix-:r0:-trigger-one"
              role="tab"
              tabindex="-1"
              type="button"
            >
              <p
                class="text-primary text-lg font-normal group-disabled:text-muted"
              >
                One 
              </p>
              <p
                class="text-base font-normal text-muted-foreground group-disabled:text-muted"
              >
                69
              </p>
            </button>
            <button
              aria-controls="radix-:r0:-content-two"
              aria-selected="false"
              class="group inline-flex items-center py-1 px-4 border border-border/20 whitespace-nowrap ring-offset-background transition-all disabled:border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none rounded-2xl w-[180px] hover:bg-primary/5 hover:border-border/10 data-[state=active]:bg-primary/10 mr-2 justify-between"
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-state="inactive"
              id="radix-:r0:-trigger-two"
              role="tab"
              tabindex="-1"
              type="button"
            >
              <p
                class="text-primary text-lg font-normal group-disabled:text-muted"
              >
                Two
              </p>
              <p
                class="text-base font-normal text-muted-foreground group-disabled:text-muted"
              >
                69
              </p>
            </button>
            <button
              aria-controls="radix-:r0:-content-three"
              aria-selected="false"
              class="group inline-flex items-center py-1 px-4 border border-border/20 whitespace-nowrap ring-offset-background transition-all disabled:border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none rounded-2xl w-[180px] hover:bg-primary/5 hover:border-border/10 data-[state=active]:bg-primary/10 mr-2 justify-between"
              data-disabled=""
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-state="inactive"
              disabled=""
              id="radix-:r0:-trigger-three"
              role="tab"
              tabindex="-1"
              type="button"
            >
              <p
                class="text-primary text-lg font-normal group-disabled:text-muted"
              >
                Three
              </p>
              <p
                class="text-base font-normal text-muted-foreground group-disabled:text-muted"
              >
                69
              </p>
            </button>
          </div>
          <div
            class="bg-primary/10 p-4 rounded-lg"
          >
            <div
              aria-labelledby="radix-:r0:-trigger-one"
              class="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              data-orientation="horizontal"
              data-state="active"
              id="radix-:r0:-content-one"
              role="tabpanel"
              style="animation-duration: 0s;"
              tabindex="0"
            >
              <p>
                One
              </p>
            </div>
            <div
              aria-labelledby="radix-:r0:-trigger-two"
              class="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              data-orientation="horizontal"
              data-state="inactive"
              hidden=""
              id="radix-:r0:-content-two"
              role="tabpanel"
              tabindex="0"
            />
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `alternate` variant', () => {
    const { asFragment } = render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger
            variant="alternate"
            value="one"
            label="One "
            totalCount={69}
          />
          <TabsTrigger
            variant="alternate"
            value="two"
            label="Two"
            totalCount={69}
          />
          <TabsTrigger
            disabled
            variant="alternate"
            value="three"
            label="Three"
            totalCount={0}
          />
        </TabsList>
        <div className="bg-primary/10 p-4 rounded-lg">
          <TabsContent value="one">
            <p>One</p>
          </TabsContent>
          <TabsContent value="two">
            <p>Two</p>
          </TabsContent>
        </div>
      </Tabs>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          data-orientation="horizontal"
          dir="ltr"
        >
          <div
            aria-orientation="horizontal"
            class="flex items-center mb-2 last:mr-0"
            data-orientation="horizontal"
            role="tablist"
            style="outline: none;"
            tabindex="0"
          >
            <button
              aria-controls="radix-:r4:-content-one"
              aria-selected="true"
              class="group inline-flex items-center py-1 px-4 border-border/20 whitespace-nowrap ring-offset-background transition-all disabled:border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none w-full border-0 border-b-2 data-[state=active]:border-border justify-between"
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-state="active"
              id="radix-:r4:-trigger-one"
              role="tab"
              tabindex="-1"
              type="button"
            >
              <p
                class="text-lg font-normal group-disabled:text-muted text-primary/30 group-data-[state=active]:text-primary"
              >
                One 
              </p>
              <p
                class="text-base font-normal text-muted-foreground group-disabled:text-muted"
              >
                69
              </p>
            </button>
            <button
              aria-controls="radix-:r4:-content-two"
              aria-selected="false"
              class="group inline-flex items-center py-1 px-4 border-border/20 whitespace-nowrap ring-offset-background transition-all disabled:border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none w-full border-0 border-b-2 data-[state=active]:border-border justify-between"
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-state="inactive"
              id="radix-:r4:-trigger-two"
              role="tab"
              tabindex="-1"
              type="button"
            >
              <p
                class="text-lg font-normal group-disabled:text-muted text-primary/30 group-data-[state=active]:text-primary"
              >
                Two
              </p>
              <p
                class="text-base font-normal text-muted-foreground group-disabled:text-muted"
              >
                69
              </p>
            </button>
            <button
              aria-controls="radix-:r4:-content-three"
              aria-selected="false"
              class="group inline-flex items-center py-1 px-4 border-border/20 whitespace-nowrap ring-offset-background transition-all disabled:border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none w-full border-0 border-b-2 data-[state=active]:border-border justify-between"
              data-disabled=""
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-state="inactive"
              disabled=""
              id="radix-:r4:-trigger-three"
              role="tab"
              tabindex="-1"
              type="button"
            >
              <p
                class="text-lg font-normal group-disabled:text-muted text-primary/30 group-data-[state=active]:text-primary"
              >
                Three
              </p>
              <p
                class="text-base font-normal text-muted-foreground group-disabled:text-muted"
              >
                0
              </p>
            </button>
          </div>
          <div
            class="bg-primary/10 p-4 rounded-lg"
          >
            <div
              aria-labelledby="radix-:r4:-trigger-one"
              class="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              data-orientation="horizontal"
              data-state="active"
              id="radix-:r4:-content-one"
              role="tabpanel"
              style="animation-duration: 0s;"
              tabindex="0"
            >
              <p>
                One
              </p>
            </div>
            <div
              aria-labelledby="radix-:r4:-trigger-two"
              class="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              data-orientation="horizontal"
              data-state="inactive"
              hidden=""
              id="radix-:r4:-content-two"
              role="tabpanel"
              tabindex="0"
            />
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
