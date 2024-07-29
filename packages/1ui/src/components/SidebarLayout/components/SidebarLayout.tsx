import { ResizablePanelGroup, useSidebarLayoutContext } from '../../../'

export const SidebarLayout = ({ ...props }) => {
  const { isMobileView } = useSidebarLayoutContext()
  return isMobileView ? (
    <div {...props} />
  ) : (
    <ResizablePanelGroup
      direction="horizontal"
      {...props}
    ></ResizablePanelGroup>
  )
}
