import { Avatar, IconName, SidebarMenuButton } from '@0xintuition/1ui'

function LoadingButton() {
  return (
    <SidebarMenuButton size="lg" disabled className="w-full gap-3 theme-border">
      <Avatar
        name="Loading"
        icon={IconName.inProgress}
        className="h-6 w-6 border border-border/10 animate-spin"
      />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </SidebarMenuButton>
  )
}

export default LoadingButton
