import { useEffect, useRef, useState } from 'react'

import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
  IconName,
  Text,
  toast,
} from '@0xintuition/1ui'

import intuitionIcon from '@assets/intuition-qr-icon.svg'
import { useCopy } from '@lib/hooks/useCopy'
import logger from '@lib/utils/logger'
import QRCodeStyling from '@solana/qr-code-styling'
import { ClientOnly } from 'remix-utils/client-only'

const SHARE_MODAL_MESSAGE =
  'Easily share this with others. Copy the link or use the QR code for quick access.'

export interface ShareModalProps {
  currentPath: string
  open?: boolean
  onClose: () => void
}

function getShareableUrl(path: string): string {
  return `${window.location.origin}${path.replace('/app/', '/readonly/')}`
}

function createShareQRCode(path: string) {
  return new QRCodeStyling({
    width: 256,
    height: 256,
    type: 'svg',
    // data: `${window.location.origin}${path.replace('/app/', '/readonly/')}`,
    data: getShareableUrl(path),
    dotsOptions: { type: 'classy-rounded', color: '#000000' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { type: 'dot', color: '#007AFF' },
    cornersDotOptions: { type: 'dot', color: '#000000' },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.5, margin: 2 },
    image: intuitionIcon,
  })
}

function ShareQRInner({
  currentPath,
  ...props
}: { currentPath: string } & React.HTMLAttributes<HTMLDivElement>) {
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCode = useRef<QRCodeStyling>()
  const [, setQrRendered] = useState(false)

  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = createShareQRCode(currentPath)
    }
    if (qrRef.current && qrCode.current) {
      qrCode.current.append(qrRef.current)
      setQrRendered(true)
    }
  }, [currentPath])

  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
        data: `${window.location.origin}${currentPath.replace('/app/', '/readonly/')}`,
      })
    }
  }, [currentPath])

  return <div ref={qrRef} {...props} />
}

function ShareModalContent({ currentPath }: ShareModalProps) {
  logger('currentPath', currentPath)

  const { copy } = useCopy()

  const handleCopy = () => {
    setCopied(true)
    copy(getShareableUrl(currentPath))
    setTimeout(() => setCopied(false), 2000)
    toast?.success('Copied to clipboard!')
  }

  const [copied, setCopied] = useState(false)

  return (
    <DialogContent className="bg-neutral-950 rounded-xl shadow border-theme flex flex-col">
      <DialogHeader>
        <DialogTitle>Share via Link or QR Code</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-10">
        <Text variant="caption" weight="regular" className="text-foreground/70">
          {SHARE_MODAL_MESSAGE}
        </Text>
        <div className="flex flex-col items-center justify-center w-full h-full gap-10">
          <ClientOnly fallback={<div>Loading QR Code...</div>}>
            {() => <ShareQRInner currentPath={currentPath} />}
          </ClientOnly>
          <Button variant="accent" onClick={handleCopy}>
            <Icon
              name={copied ? IconName.checkmark : IconName.chainLink}
              className={cn(`h-4 w-4`)}
            />{' '}
            Copy Link
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

export default function ShareModal({
  currentPath,
  open,
  onClose,
}: ShareModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <ShareModalContent currentPath={currentPath} onClose={onClose} />
    </Dialog>
  )
}
