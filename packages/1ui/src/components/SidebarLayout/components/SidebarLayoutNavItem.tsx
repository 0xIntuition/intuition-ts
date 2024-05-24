import { SidebarNavItemProps, SidebarNavItem } from './SidebarNavItem'

export const SidebarLayoutNavItem = ({
  iconName,
  label,
  onClick,
  ...props
}: SidebarNavItemProps) => {
  return (
    <SidebarNavItem
      {...props}
      variant="ghost"
      label={label}
      iconName={iconName}
      onClick={onClick}
    />
  )
}
