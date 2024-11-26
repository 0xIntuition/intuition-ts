import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
  IconName,
  IdentityTag,
  Trunctacular,
} from '@0xintuition/1ui'

export interface ImageModalProps {
  displayName: string
  imageSrc: string
  isUser?: boolean
  open?: boolean
  onClose: () => void
}

export default function ImageModal({
  displayName,
  imageSrc,
  isUser,
  open,
  onClose,
}: ImageModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="bg-neutral-950 rounded-xl shadow border-theme h-[550px] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            <IdentityTag
              imgSrc={imageSrc}
              variant={isUser ? 'user' : 'non-user'}
            >
              <Trunctacular value={displayName} maxStringLength={42} />
            </IdentityTag>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center w-full h-full p-4">
          <div className="relative w-full h-full max-w-[80vw] max-h-[80vh] sm:max-w-[60vw] sm:max-h-[60vh] border-theme shadow-md rounded-lg flex items-center justify-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Profile"
                className="w-full h-full object-contain rounded-lg border-theme"
              />
            ) : (
              <Icon
                name={isUser ? IconName.cryptoPunk : IconName.fingerprint}
                className="text-primary/30 w-[80%] h-[80%] max-w-40 max-h-40"
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
