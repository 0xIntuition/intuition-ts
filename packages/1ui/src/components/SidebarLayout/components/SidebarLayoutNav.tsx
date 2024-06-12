import {
  PanelOnCollapse,
  PanelOnExpand,
  PanelOnResize,
} from 'react-resizable-panels'

import { ResizableHandle, ResizablePanel } from '../../../'
import { cn } from '../../../styles'
import { SIDEBAR_LOCAL_STORAGE_VARIABLE } from '../constants'
import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarLayoutNavProps {
  collapsedSize?: number | undefined
  collapsible?: boolean | undefined
  defaultSize?: number | undefined
  id?: string | undefined
  maxSize?: number | undefined
  minSize?: number | undefined
  onCollapse?: PanelOnCollapse | undefined
  onExpand?: PanelOnExpand | undefined
  onResize?: PanelOnResize | undefined
}

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
        minSize={25}
        maxSize={50}
        collapsible
        collapsedSize={7.5}
        onCollapse={() => updateIsCollapsedValues(true)}
        onExpand={() => updateIsCollapsedValues(false)}
        className={cn(
          isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out',
        )}
        {...props}
      >
        <div className="from-primary/10 to-primary/2 flex h-full flex-col items-center bg-gradient-to-b">
          {props.children}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
    </>
  )
}
