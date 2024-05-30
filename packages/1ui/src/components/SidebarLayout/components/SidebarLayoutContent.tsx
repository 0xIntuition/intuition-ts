import { ResizablePanel } from '@components/Resizable'

export const SidebarLayoutContent = ({ ...props }) => {
  return (
    <ResizablePanel defaultSize={70}>
      <div
        className="flex h-full items-center justify-center p-3"
        {...props}
      ></div>
    </ResizablePanel>
  )
}
