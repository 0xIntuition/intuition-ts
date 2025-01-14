import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTitle,
  Icon,
  IconName,
  Text,
} from '@0xintuition/1ui'

import { useCopy } from '@lib/hooks/useCopy'

export interface ShareModalProps {
  currentPath: string
  open?: boolean
  onClose: () => void
}

function ShareModalContent({ currentPath }: ShareModalProps) {
  const { copy } = useCopy()

  return (
    <DialogContent className="bg-background backdrop-blur-sm rounded-3xl shadow-2xl border border-neutral-800 flex flex-col px-0 pb-0">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <DialogTitle className='px-8'>
            <Text className="text-neutral-400 text-lg">
              Best Crypto Wallets
            </Text>
          </DialogTitle>
        </div>

        <div className="flex justify-between items-center px-8">
          <div className="flex items-baseline gap-2">
            <Text className="text-4xl font-bold text-white">$178.52</Text>
            <Text className="text-emerald-400 text-lg">
              +176.10 (+7,272.66%)
            </Text>
          </div>
          <div className="w-12 h-12 rounded-full bg-neutral-800 overflow-hidden">
            {/* Avatar placeholder */}
          </div>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-4 px-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-neutral-800/50"
            />
          ))}
        </div>

        <div className="flex justify-end pr-8">
          <Text className="text-neutral-500 text-sm">Powered by Intuition</Text>
        </div>

        <div className="flex justify-between items-center  bg-[#0F0F0F] p-8">
          <button
            onClick={() => copy(currentPath)}
            className="bg-neutral-950 rounded-full border border-emerald-500/20 px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-neutral-900 transition-colors"
          >
            <Icon
              name={IconName.checkmark}
              className="h-5 w-5 text-emerald-500"
            />
            <Text className="text-emerald-500">Copied!</Text>
          </button>

          <div className="flex gap-4">
            <button className="p-3 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <Icon name={IconName.twitter} className="h-5 w-5" />
            </button>
            <button className="p-3 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <Icon name={IconName.twitter} className="h-5 w-5" />
            </button>
          </div>
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
