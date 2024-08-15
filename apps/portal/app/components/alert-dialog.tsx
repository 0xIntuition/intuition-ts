import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  Text,
  TextVariant,
  AlertDialog as UIAlertDialog,
} from '@0xintuition/1ui'

export interface AlertDialogProps {
  open?: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
  setShowAlertDialog: (showAlertDialog: boolean) => void
}

export default function AlertDialog({
  open,
  onOpenChange,
  onClose,
  setShowAlertDialog,
}: AlertDialogProps) {
  return (
    <UIAlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription asChild>
          <Text
            variant={TextVariant.body}
            className="text-secondary-foreground"
          >
            Your progress will be lost if you close this modal before the
            transaction is complete.
          </Text>
        </AlertDialogDescription>
        <div className="flex flex-row gap-2">
          <Button
            variant={ButtonVariant.primary}
            onClick={() => setShowAlertDialog(false)}
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            variant={ButtonVariant.destructiveOutline}
            onClick={() => {
              setShowAlertDialog(false)
              onClose()
            }}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </AlertDialogContent>
    </UIAlertDialog>
  )
}
