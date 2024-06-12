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
  const { isCollapsed } = useSidebarLayoutContext()
  return (
    <button className="flex gap-2 items-center" {...props}>
      {imgLogo}
      {!isCollapsed && textLogo}
    </button>
  )
}
