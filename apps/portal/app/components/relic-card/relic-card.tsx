import * as React from 'react'

import { Skeleton } from '@0xintuition/1ui'

import { useFetcher } from '@remix-run/react'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ProfileCard({
  purchaseIntentId,
}: {
  purchaseIntentId: string
}) {
  const itemDetailsFetcher = useFetcher()
  const itemDetailsFetcherResourceUrl = `/resources/get-item-details`
  const [itemDetails, setItemDetails] = React.useState<any>()
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    if (itemDetailsFetcher.data) {
      setItemDetails(itemDetailsFetcher.data)
    }
  }, [itemDetailsFetcher.data])

  React.useEffect(() => {
    const queryParam = `?id=${encodeURIComponent(purchaseIntentId)}`
    itemDetailsFetcher.load(`${itemDetailsFetcherResourceUrl}${queryParam}`)
  }, [purchaseIntentId])

  const isLoading = itemDetailsFetcher.state === 'loading'

  return (
    <div className="flex flex-col theme-border rounded-lg p-8 gap-4 max-md:p-4">
      {isLoading || !itemDetails?.attributes.image_url ? (
        <>
          <Skeleton className="h-72 w-72" />
          <Skeleton className="my-2 h-6 w-3/4" />
          <Skeleton className="my-2 h-6 w-3/4" />
        </>
      ) : (
        <>
          <motion.div>
            <div
              className="h-72 w-72 overflow-hidden rounded-xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence>
                {isHovered === false ? (
                  <motion.img
                    key="image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    alt="NFT Artwork"
                    className="h-full w-full object-cover"
                    src={itemDetails?.attributes.image_url}
                    style={{
                      aspectRatio: '16/9',
                    }}
                  />
                ) : (
                  <motion.div
                    key="mediaPlayer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MediaPlayer
                      src={itemDetails.attributes.meta_animation_url}
                      autoPlay
                      muted
                      loop
                      load="eager"
                    >
                      <MediaProvider />
                    </MediaPlayer>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* {isHovered === false ? (
                <img
                  alt="NFT Artwork"
                  className="h-full w-full  object-cover"
                  src={itemDetails?.attributes.image_url}
                  style={{
                    aspectRatio: '16/9',
                  }}
                />
              ) : (
                <MediaPlayer
                  src={itemDetails.attributes.meta_animation_url}
                  autoPlay
                  muted
                  loop
                  load="eager"
                >
                  <MediaProvider />
                </MediaPlayer>
              )} */}
            </div>
          </motion.div>
          <div className="flex flex-col items-center gap-4 space-y-2">
            <h2 className="text-xl font-bold text-foreground lg:text-2xl">
              {itemDetails?.attributes.title}
            </h2>
          </div>
          <p className="text-center text-sm text-primary-400">
            {itemDetails?.attributes.description} <br />
          </p>
        </>
      )}
    </div>
  )
}
