import { SidebarNavItemProps, SidebarNavItem } from './SidebarNavItem'

export const SidebarLayoutNavFooterItem = ({
  iconName,
  label,
  onClick,
  ...props
}: SidebarNavItemProps) => {
  return (
    <SidebarNavItem
      {...props}
      variant="text"
      label={label}
      iconName={iconName}
      onClick={onClick}
    />
  )
}
