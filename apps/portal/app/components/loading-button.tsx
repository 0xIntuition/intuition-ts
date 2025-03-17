import {
  Avatar,
  Button,
  ButtonSize,
  ButtonVariant,
  IconName,
} from '@0xintuition/1ui'

function LoadingButton() {
  return (
    <Button
      variant={ButtonVariant.ghost}
      size={ButtonSize.lg}
      disabled
      className="w-full gap-3 theme-border justify-start"
    >
      <Avatar
        name="Loading"
        icon={IconName.inProgress}
        className="h-6 w-6 border border-border/10 animate-spin"
      />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </Button>
  )
}

export default LoadingButton
