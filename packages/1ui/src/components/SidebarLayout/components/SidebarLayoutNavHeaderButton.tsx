import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarLayoutNavHeaderButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  imgLogo: React.ReactElement
  textLogo: React.ReactElement
}

export const SidebarLayoutNavHeaderButton = ({
  imgLogo,
  textLogo,
  ...props
}: SidebarLayoutNavHeaderButtonProps) => {
  const { isMobileView, isCollapsed } = useSidebarLayoutContext()
  return (
    <button className="flex gap-3 items-center" {...props}>
      {imgLogo}
      {(!isCollapsed || isMobileView) && textLogo}
    </button>
  )
}
