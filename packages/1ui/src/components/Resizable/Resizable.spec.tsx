import React from 'react'
import { render } from '@testing-library/react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './Resizable'

describe('Resizable', () => {
  it('should render appropriate elements with a horizontal and vertical layout', () => {
    const { asFragment } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div>1</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div>2</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div>3</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-full w-full data-[panel-group-direction=vertical]:flex-col"
          data-panel-group=""
          data-panel-group-direction="horizontal"
          data-panel-group-id=":r0:"
          style="display: flex; flex-direction: row; height: 100%; overflow: hidden; width: 100%;"
        >
          <div
            class=""
            data-panel=""
            data-panel-group-id=":r0:"
            data-panel-id=":r1:"
            data-panel-size="50.0"
            style="flex-basis: 0px; flex-grow: 50; flex-shrink: 1; overflow: hidden;"
          >
            <div>
              1
            </div>
          </div>
          <div
            class="border-border/30 focus-visible:ring-ring relative flex w-px items-center justify-center border border-solid after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"
            data-panel-group-direction="horizontal"
            data-panel-group-id=":r0:"
            data-panel-resize-handle-enabled="true"
            data-panel-resize-handle-id=":r2:"
            data-resize-handle=""
            data-resize-handle-state="inactive"
            role="separator"
            style="user-select: none;"
            tabindex="0"
          />
          <div
            class=""
            data-panel=""
            data-panel-group-id=":r0:"
            data-panel-id=":r3:"
            data-panel-size="50.0"
            style="flex-basis: 0px; flex-grow: 50; flex-shrink: 1; overflow: hidden;"
          >
            <div
              class="flex h-full w-full data-[panel-group-direction=vertical]:flex-col"
              data-panel-group=""
              data-panel-group-direction="vertical"
              data-panel-group-id=":r4:"
              style="display: flex; flex-direction: column; height: 100%; overflow: hidden; width: 100%;"
            >
              <div
                class=""
                data-panel=""
                data-panel-group-id=":r4:"
                data-panel-id=":r5:"
                data-panel-size="25.0"
                style="flex-basis: 0px; flex-grow: 25; flex-shrink: 1; overflow: hidden;"
              >
                <div>
                  2
                </div>
              </div>
              <div
                class="border-border/30 focus-visible:ring-ring relative flex w-px items-center justify-center border border-solid after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"
                data-panel-group-direction="vertical"
                data-panel-group-id=":r4:"
                data-panel-resize-handle-enabled="true"
                data-panel-resize-handle-id=":r6:"
                data-resize-handle=""
                data-resize-handle-state="inactive"
                role="separator"
                style="user-select: none;"
                tabindex="0"
              />
              <div
                class=""
                data-panel=""
                data-panel-group-id=":r4:"
                data-panel-id=":r7:"
                data-panel-size="75.0"
                style="flex-basis: 0px; flex-grow: 75; flex-shrink: 1; overflow: hidden;"
              >
                <div>
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements with a vertical layout', () => {
    const { asFragment } = render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={50}>
          <div>1</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div>2</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-full w-full data-[panel-group-direction=vertical]:flex-col"
          data-panel-group=""
          data-panel-group-direction="vertical"
          data-panel-group-id=":r8:"
          style="display: flex; flex-direction: column; height: 100%; overflow: hidden; width: 100%;"
        >
          <div
            class=""
            data-panel=""
            data-panel-group-id=":r8:"
            data-panel-id=":r9:"
            data-panel-size="50.0"
            style="flex-basis: 0px; flex-grow: 50; flex-shrink: 1; overflow: hidden;"
          >
            <div>
              1
            </div>
          </div>
          <div
            class="border-border/30 focus-visible:ring-ring relative flex w-px items-center justify-center border border-solid after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"
            data-panel-group-direction="vertical"
            data-panel-group-id=":r8:"
            data-panel-resize-handle-enabled="true"
            data-panel-resize-handle-id=":ra:"
            data-resize-handle=""
            data-resize-handle-state="inactive"
            role="separator"
            style="user-select: none;"
            tabindex="0"
          />
          <div
            class=""
            data-panel=""
            data-panel-group-id=":r8:"
            data-panel-id=":rb:"
            data-panel-size="50.0"
            style="flex-basis: 0px; flex-grow: 50; flex-shrink: 1; overflow: hidden;"
          >
            <div>
              2
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements with a horizontal layout and a handle', () => {
    const { asFragment } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <div>1</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div>2</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-full w-full data-[panel-group-direction=vertical]:flex-col"
          data-panel-group=""
          data-panel-group-direction="horizontal"
          data-panel-group-id=":rc:"
          style="display: flex; flex-direction: row; height: 100%; overflow: hidden; width: 100%;"
        >
          <div
            class=""
            data-panel=""
            data-panel-group-id=":rc:"
            data-panel-id=":rd:"
            data-panel-size="25.0"
            style="flex-basis: 0px; flex-grow: 25; flex-shrink: 1; overflow: hidden;"
          >
            <div>
              1
            </div>
          </div>
          <div
            class="border-border/30 focus-visible:ring-ring relative flex w-px items-center justify-center border border-solid after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"
            data-panel-group-direction="horizontal"
            data-panel-group-id=":rc:"
            data-panel-resize-handle-enabled="true"
            data-panel-resize-handle-id=":re:"
            data-resize-handle=""
            data-resize-handle-state="inactive"
            role="separator"
            style="user-select: none;"
            tabindex="0"
          >
            <div
              class="bg-background border-border/30 z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-solid"
            >
              <svg
                class="lucide lucide-grip-vertical h-2.5 w-2.5"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9"
                  cy="12"
                  r="1"
                />
                <circle
                  cx="9"
                  cy="5"
                  r="1"
                />
                <circle
                  cx="9"
                  cy="19"
                  r="1"
                />
                <circle
                  cx="15"
                  cy="12"
                  r="1"
                />
                <circle
                  cx="15"
                  cy="5"
                  r="1"
                />
                <circle
                  cx="15"
                  cy="19"
                  r="1"
                />
              </svg>
            </div>
          </div>
          <div
            class=""
            data-panel=""
            data-panel-group-id=":rc:"
            data-panel-id=":rf:"
            data-panel-size="75.0"
            style="flex-basis: 0px; flex-grow: 75; flex-shrink: 1; overflow: hidden;"
          >
            <div>
              2
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
