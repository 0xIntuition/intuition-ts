import { Dialog, DialogContent, DialogTitle, Text } from '@0xintuition/1ui'

interface AtomDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  atomId: number
}

export function AtomDetailsModal({
  isOpen,
  onClose,
  atomId,
}: AtomDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          <Text>Atom Details - {atomId}</Text>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  )
}
