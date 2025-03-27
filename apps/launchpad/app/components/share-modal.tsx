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

import { useCopy } from '@lib/hooks/useCopy'
import { ListDetailsType } from 'app/types/list-details'

export interface ShareModalProps {
  open?: boolean
  onClose: () => void
  title: string
  listData: ListDetailsType
  tvl?: number
  percentageChange?: number
  valueChange?: number
}

function ShareModalContent({
  title,
  listData,
  tvl,
  percentageChange = 0,
  valueChange = 0,
}: ShareModalProps) {
  const { copy, copied } = useCopy()

  const getOGImageUrl = (listData: ListDetailsType) => {
    // Get the host and protocol from the current URL
    const host = window.location.host
    const protocol = window.location.protocol
    const baseUrl = host.includes('ngrok')
      ? `${protocol}//${host}`
      : window.location.origin

    const params = new URLSearchParams()
    params.set('id', listData.globalTriples?.[0]?.object?.id?.toString() ?? '')
    params.set('type', 'list')
    params.set(
      'data',
      JSON.stringify({
        title: listData.globalTriples?.[0]?.object?.label ?? '',
        holders:
          listData.globalTriples?.[0]?.vault?.positions_aggregate?.aggregate
            ?.count ?? '',
        tvl:
          listData.globalTriples?.[0]?.vault?.positions_aggregate?.aggregate
            ?.sum?.shares ?? '',
        itemCount: listData.globalTriplesAggregate?.aggregate?.count ?? '',
        type: 'list',
      }),
    )
    const url = `${baseUrl}/resources/create-og?${params.toString()}`
    return url
  }

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
    const ogImageUrl = encodeURIComponent(getOGImageUrl(listData))
    const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${url}&image=${ogImageUrl}`
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

        {listData && (
          <div className="px-8 mb-4">
            <Text className="text-neutral-400 mb-2">Preview</Text>
            <div className="w-full aspect-[1.91/1] rounded-xl overflow-hidden bg-neutral-900 relative">
              <img
                src={getOGImageUrl(listData)}
                alt="Share preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* <div className="h-[200px] overflow-y-auto px-8">
          <div className="grid grid-cols-4 gap-4">
            {listData?.globalTriples?.map((triple) => (
              <div
                key={triple.vault_id}
                className="aspect-square rounded-2xl bg-neutral-800/50 p-3 flex flex-col items-center justify-center"
              >
                {triple.subject.image && triple.subject.image !== 'null' ? (
                  <img
                    src={triple.subject.image}
                    alt={triple.subject.label ?? ''}
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
        </div> */}

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

export default function ShareModal({
  open,
  onClose,
  title,
  listData,
  tvl,
  percentageChange,
  valueChange,
}: ShareModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <ShareModalContent
        onClose={onClose}
        open={open}
        title={title}
        listData={listData}
        tvl={tvl}
        percentageChange={percentageChange}
        valueChange={valueChange}
      />
    </Dialog>
  )
}
