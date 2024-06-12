import { useSidebarLayoutContext } from './SidebarLayoutProvider'

export interface SidebarLayoutNavHeaderContentProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  imgLogo: React.ReactElement
  textLogo: React.ReactElement
}

export const SidebarLayoutNavHeaderContent = ({
  imgLogo,
  textLogo,
  ...props
}: SidebarLayoutNavHeaderContentProps) => {
  const { isCollapsed } = useSidebarLayoutContext()
  return (
    <button className="flex gap-2 items-center" {...props}>
      {imgLogo}
      {!isCollapsed && textLogo}
    </button>
  )
}
