import { useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconName,
  Text,
  toast,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'

import { AtomsWithTagsQuery } from '@lib/graphql'
import { useCopy } from '@lib/hooks/useCopy'

export interface EcosystemShareModalProps {
  open?: boolean
  onClose: () => void
  title: string
  atomsData: AtomsWithTagsQuery['atoms']
  tvl?: number
  percentageChange?: number
  valueChange?: number
}

function EcosystemShareModalContent({
  open,
  title,
  atomsData,
  tvl,
  percentageChange = 0,
  valueChange = 0,
}: EcosystemShareModalProps) {
  const { copy, copied } = useCopy()

  useEffect(() => {
    if (open && typeof window !== 'undefined') {
      copy(window.location.href)
    }
  }, [open])

  const handleManualCopy = () => {
    copy(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleTwitterShare = () => {
    const text = `${title}`
    const url = encodeURIComponent(window.location.href)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`
    window.open(twitterUrl, '_blank')
  }

  const handleFarcasterShare = () => {
    const text = `${title}`
    const url = encodeURIComponent(window.location.href)
    const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${url}`
    window.open(farcasterUrl, '_blank')
  }

  return (
    <DialogContent className="bg-background backdrop-blur-sm rounded-3xl shadow-2xl border border-neutral-800 flex flex-col px-0 pb-0">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <DialogTitle className="px-8">
            <Text className="text-neutral-400 text-lg">{title}</Text>
          </DialogTitle>
        </div>

        {tvl && (
          <div className="flex justify-between items-center px-8">
            <div className="flex items-baseline gap-2">
              <Text className="text-4xl font-bold text-white">
                ${tvl.toFixed(2)}
              </Text>
              {(percentageChange !== 0 || valueChange !== 0) && (
                <Text className="text-emerald-400 text-lg">
                  +{valueChange.toFixed(2)} (+{percentageChange.toFixed(2)}%)
                </Text>
              )}
            </div>
          </div>
        )}

        <div className="h-[200px] overflow-y-auto px-8">
          <div className="grid grid-cols-4 gap-4">
            {atomsData?.map((atom) => (
              <div
                key={atom.vault_id}
                className="aspect-square rounded-2xl bg-neutral-800/50 p-3 flex flex-col items-center justify-center"
              >
                {atom.image && atom.image !== 'null' ? (
                  <img
                    src={atom.image}
                    alt={atom.label ?? ''}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-neutral-900 flex items-center justify-center">
                    <Icon
                      name={IconName.fingerprint}
                      className="w-12 h-12 text-primary/40"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pr-8">
          <Text className="text-neutral-500 text-sm">Powered by Intuition</Text>
        </div>

        <div className="flex justify-between items-center bg-[#0F0F0F] p-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleManualCopy}
                  className="bg-neutral-950 rounded-full border border-neutral-800 px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-neutral-900 transition-colors"
                >
                  <Icon
                    name={copied ? IconName.checkmark : IconName.copy}
                    className={`h-5 w-5 ${copied ? 'text-emerald-500' : 'text-neutral-400'}`}
                  />
                  <Text
                    className={copied ? 'text-emerald-500' : 'text-neutral-400'}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Text>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <Text className="text-sm">{window.location.href}</Text>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex gap-4">
            <button
              onClick={handleTwitterShare}
              className="p-3 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <Icon name={IconName.twitter} className="h-5 w-5" />
            </button>
            <button
              onClick={handleFarcasterShare}
              className="p-3 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <Icon name={IconName.farcaster} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default function EcosystemShareModal({
  open,
  onClose,
  title,
  atomsData,
  tvl,
  percentageChange,
  valueChange,
}: EcosystemShareModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <EcosystemShareModalContent
        onClose={onClose}
        open={open}
        title={title}
        atomsData={atomsData}
        tvl={tvl}
        percentageChange={percentageChange}
        valueChange={valueChange}
      />
    </Dialog>
  )
}
