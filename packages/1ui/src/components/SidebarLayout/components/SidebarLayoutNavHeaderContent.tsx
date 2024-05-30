import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarLayoutNavHeaderContentProps {
  imgLogo: React.ReactElement
  textLogo: React.ReactElement
}

export const SidebarLayoutNavHeaderContent = ({
  imgLogo,
  textLogo,
}: SidebarLayoutNavHeaderContentProps) => {
  const { isCollapsed } = useSidebarLayoutContext()
  return (
    <>
      {imgLogo}
      {!isCollapsed && textLogo}
    </>
  )
}
