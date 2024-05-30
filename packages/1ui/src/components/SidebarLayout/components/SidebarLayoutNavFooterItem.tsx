import { SidebarNavItem, SidebarNavItemProps } from './SidebarNavItem'

export const SidebarLayoutNavFooterItem = ({
  iconName,
  label,
  onClick,
  ...props
}: SidebarNavItemProps) => {
  return (
    <SidebarNavItem
      {...props}
      variant="navigation"
      label={label}
      iconName={iconName}
      onClick={onClick}
    />
  )
}
