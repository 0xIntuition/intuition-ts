import {
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  Text,
} from '@0xintuition/1ui'

import { AtomDetailsCard } from './atom-details-card'

interface AtomDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  atomId: number
  data?: {
    id: number
    image: string
    name: string
    list: string
    users: number
    assets: number
  }
}

export function AtomDetailsModal({
  isOpen,
  onClose,
  atomId,
  data,
}: AtomDetailsModalProps) {
  const cardData = {
    name: data?.name ?? `Atom ${atomId}`,
    list: data?.list ?? 'Intuition',
    description: 'A detailed description of this atom will be added soon.',
    icon: data?.image ? (
      <img src={data.image} alt={data.name} className="h-6 w-6 rounded-full" />
    ) : (
      <Icon name="circles-three" className="h-6 w-6" />
    ),
    atomId,
    userCount: data?.users ?? 0,
    ethStaked: data?.assets ?? 0,
    mutualConnections: 0, // Placeholder for now
    onStake: () => console.log('Stake clicked'),
    onChat: () => console.log('Chat clicked'),
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="px-8">
          <Text className="text-neutral-400 text-lg">Atom {atomId}</Text>
        </DialogTitle>
        <div className="px-6 py-6">
          <AtomDetailsCard {...cardData} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
