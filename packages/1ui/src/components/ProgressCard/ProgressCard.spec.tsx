import { render } from '@testing-library/react'

import { ProgressCard } from './ProgressCard'

describe('ProgressCard', () => {
  it('should render the appropriate elements', () => {
    const { asFragment } = render(
      <ProgressCard numberTotal={10} numberCompleted={5} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="relative p-5 w-full theme-border rounded-lg bg-background/60 shadow-md backdrop-blur-lg overflow-hidden"
        >
          <div
            class="absolute top-0 left-14"
          >
            <svg
              class="overflow-visible blur-[75px] fill-muted-foreground/70"
              fill="none"
              height="110"
              viewBox="0 0 458 110"
              width="458"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="currentColor"
                d="M322.494 41.6458L278.681 4.9424C278.665 4.92897 278.65 4.91391 278.637 4.89746L274.89 0.114968C274.833 0.0423948 274.746 0 274.654 0H0.3C0.134315 0 0 0.134312 0 0.299998V49.5968C0 49.7551 0.123012 49.8862 0.281004 49.8962L113.74 57.0953C113.764 57.0968 113.789 57.1014 113.812 57.1088L203.399 85.6306C203.432 85.6411 203.466 85.6458 203.5 85.6446L289.221 82.6945C289.249 82.6936 289.277 82.6965 289.304 82.7034L421.738 115.974C421.805 115.991 421.876 115.984 421.939 115.954L457.393 99.2227C457.628 99.1121 457.621 98.7761 457.382 98.6751L322.57 41.6922C322.542 41.6806 322.517 41.665 322.494 41.6458Z"
              />
            </svg>
          </div>
          <div
            class="space-y-8"
          >
            <div
              class="flex w-full justify-between align-items"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Progress
              </h6>
              <div
                class="flex gap-1 items-center"
              >
                <div
                  class="text-primary text-lg font-normal"
                >
                  5
                </div>
                <div
                  class="text-lg font-normal text-muted-foreground"
                >
                  /
                </div>
                <div
                  class="text-lg font-normal text-muted-foreground"
                >
                  10
                </div>
              </div>
            </div>
            <div
              class="space-y-2.5"
            >
              <div
                class="text-base font-normal text-muted-foreground"
              >
                50% Complete
              </div>
              <div
                class="flex items-center h-[6px] mb-4"
              >
                <span
                  class="h-full block rounded-l-sm bg-primary"
                  style="min-width: 50%;"
                />
                <span
                  class="h-full w-full block rounded-r-sm bg-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render correctly when numberCompleted is 0', () => {
    const { asFragment } = render(
      <ProgressCard numberTotal={10} numberCompleted={0} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="relative p-5 w-full theme-border rounded-lg bg-background/60 shadow-md backdrop-blur-lg overflow-hidden"
        >
          <div
            class="absolute top-0 left-14"
          >
            <svg
              class="overflow-visible blur-[75px] fill-muted-foreground/70"
              fill="none"
              height="110"
              viewBox="0 0 458 110"
              width="458"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="currentColor"
                d="M322.494 41.6458L278.681 4.9424C278.665 4.92897 278.65 4.91391 278.637 4.89746L274.89 0.114968C274.833 0.0423948 274.746 0 274.654 0H0.3C0.134315 0 0 0.134312 0 0.299998V49.5968C0 49.7551 0.123012 49.8862 0.281004 49.8962L113.74 57.0953C113.764 57.0968 113.789 57.1014 113.812 57.1088L203.399 85.6306C203.432 85.6411 203.466 85.6458 203.5 85.6446L289.221 82.6945C289.249 82.6936 289.277 82.6965 289.304 82.7034L421.738 115.974C421.805 115.991 421.876 115.984 421.939 115.954L457.393 99.2227C457.628 99.1121 457.621 98.7761 457.382 98.6751L322.57 41.6922C322.542 41.6806 322.517 41.665 322.494 41.6458Z"
              />
            </svg>
          </div>
          <div
            class="space-y-8"
          >
            <div
              class="flex w-full justify-between align-items"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Progress
              </h6>
              <div
                class="flex gap-1 items-center"
              >
                <div
                  class="text-primary text-lg font-normal"
                >
                  0
                </div>
                <div
                  class="text-lg font-normal text-muted-foreground"
                >
                  /
                </div>
                <div
                  class="text-lg font-normal text-muted-foreground"
                >
                  10
                </div>
              </div>
            </div>
            <div
              class="space-y-2.5"
            >
              <div
                class="text-base font-normal text-muted-foreground"
              >
                0% Complete
              </div>
              <div
                class="flex items-center h-[6px] mb-4"
              >
                <span
                  class="h-full block rounded-l-sm bg-primary"
                  style="min-width: 0%;"
                />
                <span
                  class="h-full w-full block rounded-r-sm bg-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render correctly when numberCompleted equals numberTotal', () => {
    const { asFragment } = render(
      <ProgressCard numberTotal={10} numberCompleted={10} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="relative p-5 w-full theme-border rounded-lg bg-background/60 shadow-md backdrop-blur-lg overflow-hidden"
        >
          <div
            class="absolute top-0 left-14"
          >
            <svg
              class="overflow-visible blur-[75px] fill-muted-foreground/70"
              fill="none"
              height="110"
              viewBox="0 0 458 110"
              width="458"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="currentColor"
                d="M322.494 41.6458L278.681 4.9424C278.665 4.92897 278.65 4.91391 278.637 4.89746L274.89 0.114968C274.833 0.0423948 274.746 0 274.654 0H0.3C0.134315 0 0 0.134312 0 0.299998V49.5968C0 49.7551 0.123012 49.8862 0.281004 49.8962L113.74 57.0953C113.764 57.0968 113.789 57.1014 113.812 57.1088L203.399 85.6306C203.432 85.6411 203.466 85.6458 203.5 85.6446L289.221 82.6945C289.249 82.6936 289.277 82.6965 289.304 82.7034L421.738 115.974C421.805 115.991 421.876 115.984 421.939 115.954L457.393 99.2227C457.628 99.1121 457.621 98.7761 457.382 98.6751L322.57 41.6922C322.542 41.6806 322.517 41.665 322.494 41.6458Z"
              />
            </svg>
          </div>
          <div
            class="space-y-8"
          >
            <div
              class="flex w-full justify-between align-items"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Progress
              </h6>
              <div
                class="flex gap-1 items-center"
              >
                <div
                  class="text-primary text-lg font-normal"
                >
                  10
                </div>
                <div
                  class="text-lg font-normal text-muted-foreground"
                >
                  /
                </div>
                <div
                  class="text-lg font-normal text-muted-foreground"
                >
                  10
                </div>
              </div>
            </div>
            <div
              class="space-y-2.5"
            >
              <div
                class="text-base font-normal text-muted-foreground"
              >
                100% Complete
              </div>
              <div
                class="flex items-center h-[6px] mb-4"
              >
                <span
                  class="h-full block rounded-l-sm bg-primary"
                  style="min-width: 100%;"
                />
                <span
                  class="h-full w-full block rounded-r-sm bg-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render correctly when numberTotal is 0', () => {
    const { asFragment } = render(
      <ProgressCard numberTotal={0} numberCompleted={0} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="relative p-5 w-full theme-border rounded-lg bg-background/60 shadow-md backdrop-blur-lg overflow-hidden"
        >
          <div
            class="absolute top-0 left-14"
          >
            <svg
              class="overflow-visible blur-[75px] fill-muted-foreground/70"
              fill="none"
              height="110"
              viewBox="0 0 458 110"
              width="458"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="currentColor"
                d="M322.494 41.6458L278.681 4.9424C278.665 4.92897 278.65 4.91391 278.637 4.89746L274.89 0.114968C274.833 0.0423948 274.746 0 274.654 0H0.3C0.134315 0 0 0.134312 0 0.299998V49.5968C0 49.7551 0.123012 49.8862 0.281004 49.8962L113.74 57.0953C113.764 57.0968 113.789 57.1014 113.812 57.1088L203.399 85.6306C203.432 85.6411 203.466 85.6458 203.5 85.6446L289.221 82.6945C289.249 82.6936 289.277 82.6965 289.304 82.7034L421.738 115.974C421.805 115.991 421.876 115.984 421.939 115.954L457.393 99.2227C457.628 99.1121 457.621 98.7761 457.382 98.6751L322.57 41.6922C322.542 41.6806 322.517 41.665 322.494 41.6458Z"
              />
            </svg>
          </div>
          <div
            class="space-y-8"
          >
            <div
              class="flex w-full justify-between align-items"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Progress
              </h6>
              <div
                class="flex gap-1 items-center"
              >
                <div
                  class="text-primary text-lg font-normal"
                >
                  0
                </div>
                <div
                  class="text-lg font-normal text-muted-foreground"
                >
                  /
                </div>
                <div
                  class="text-lg font-normal text-muted-foreground"
                >
                  0
                </div>
              </div>
            </div>
            <div
              class="space-y-2.5"
            >
              <div
                class="text-base font-normal text-muted-foreground"
              >
                0% Complete
              </div>
              <div
                class="flex items-center h-[6px] mb-4"
              >
                <span
                  class="h-full block rounded-l-sm bg-primary"
                  style="min-width: 0%;"
                />
                <span
                  class="h-full w-full block rounded-r-sm bg-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
