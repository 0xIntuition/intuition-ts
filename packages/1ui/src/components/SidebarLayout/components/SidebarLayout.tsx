import { ResizablePanelGroup } from 'components/Resizable'

export const SidebarLayout = ({ ...props }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      {...props}
    ></ResizablePanelGroup>
  )
}
