import { ResizablePanelGroup } from '..'

export const SidebarLayout = ({ ...props }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      {...props}
    ></ResizablePanelGroup>
  )
}
