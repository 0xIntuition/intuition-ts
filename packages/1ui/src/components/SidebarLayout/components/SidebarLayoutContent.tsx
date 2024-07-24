import { ResizablePanel } from '../../../'

export const SidebarLayoutContent = ({ ...props }) => {
  return (
    <ResizablePanel defaultSize={70}>
      <div
        className="flex h-full items-center justify-center py-3 px-1"
        {...props}
      ></div>
    </ResizablePanel>
  )
}
