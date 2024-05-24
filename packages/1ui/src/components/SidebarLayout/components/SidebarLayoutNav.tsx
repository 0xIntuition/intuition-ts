import { useSidebarLayoutContext } from './SidebarLayoutProvider'
import { SIDEBAR_LOCAL_STORAGE_VARIABLE } from '../constants'
import { ResizablePanel, ResizableHandle } from '@components/Resizable'

import { cn } from '@styles'

export const SidebarLayoutNav = ({ ...props }) => {
  const { isCollapsed, setIsCollapsed } = useSidebarLayoutContext()

  const updateIsCollapsedValues = (newValue: boolean) => {
    setIsCollapsed(newValue)
    localStorage.setItem(SIDEBAR_LOCAL_STORAGE_VARIABLE, newValue.toString())
  }

  return (
    <>
      <ResizablePanel
        defaultSize={isCollapsed ? 7 : 30}
        minSize={20}
        maxSize={50}
        collapsible
        collapsedSize={7}
        onCollapse={() => updateIsCollapsedValues(true)}
        onExpand={() => updateIsCollapsedValues(false)}
        className={cn(
          isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out',
        )}
      >
        <div
          className="from-primary/10 to-primary/2 flex h-full flex-col items-center bg-gradient-to-b"
          {...props}
        ></div>
      </ResizablePanel>
      <ResizableHandle withHandle />
    </>
  )
}
