import { Dialog, DialogContent, DialogTitle, Icon } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'

import { AtomDetailsCard } from './atom-details-card'

interface AtomDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  atomId: number
  data?: {
    id: string
    image: string
    name: string
    list: string
    users: number
    forTvl: number
    againstTvl?: number
    position?: number
  }
  listClaim?: boolean
}

export function AtomDetailsModal({
  isOpen,
  onClose,
  atomId,
  data,
  listClaim = true,
}: AtomDetailsModalProps) {
  const cardData = {
    name: data?.name ?? `Atom ${atomId}`,
    list: data?.list ?? 'Intuition',
    description: 'A detailed description of this atom will be added soon.',
    icon: data?.image ? (
      <img
        src={data.image}
        alt={data.name}
        className="h-10 w-10 rounded-full"
      />
    ) : (
      <Icon name="fingerprint" className="h-10 w-10" />
    ),
    atomId,
    listClaim, // TODO: Add handling for regular atoms (not in a list)
    userCount: data?.users ?? 0,
    forTvl: data?.forTvl ?? 0,
    againstTvl: data?.againstTvl ?? 0,
    tvl: (data?.forTvl ?? 0) + (data?.againstTvl ?? 0),
    position: data?.position ?? 0,
    mutualConnections: 0, // Placeholder for now
    onStake: () => logger('Stake clicked'),
    onChat: () => logger('Chat clicked'),
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-lg bg-gradient-to-b from-[#060504] to-[#101010] w-full md:min-w-[480px] border-0">
        <DialogTitle className="justify-end" />
        <AtomDetailsCard {...cardData} className="bg-transparent" />
      </DialogContent>
    </Dialog>
  )
}
