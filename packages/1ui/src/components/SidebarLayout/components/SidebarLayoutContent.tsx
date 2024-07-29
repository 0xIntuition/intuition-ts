import { ResizablePanel, useSidebarLayoutContext } from '../../../'

export const SidebarLayoutContent = ({ ...props }) => {
  const { isMobileView } = useSidebarLayoutContext()
  return isMobileView ? (
    <div {...props} />
  ) : (
    <ResizablePanel defaultSize={70}>
      <div
        className="flex h-full items-center justify-center py-3 px-1"
        {...props}
      ></div>
    </ResizablePanel>
  )
}
