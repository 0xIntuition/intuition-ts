import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Text,
} from '@0xintuition/1ui'

import logger from '@lib/utils/logger'

const SHARE_MODAL_MESSAGE =
  'Easily share this with others. Copy the link or use the QR code for quick access.'

export interface ShareModalProps {
  currentPath: string
  open?: boolean
  onClose: () => void
}

export default function ShareModal({
  currentPath,
  open,
  onClose,
}: ShareModalProps) {
  logger('currentPath', currentPath)
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="bg-neutral-950 rounded-xl shadow border-theme h-[550px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Share via Link or QR Code</DialogTitle>
        </DialogHeader>
        <Text variant="caption" weight="regular" className="text-foreground/70">
          {SHARE_MODAL_MESSAGE}
        </Text>
        <div className="flex flex-col items-center justify-center w-full h-full gap-10">
          <pre>qr code</pre>
          <Button variant="accent">Copy Link</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
