import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { AnimatePresence, motion } from 'framer-motion'

export default function RelicCard() {
  return (
    <div className="flex flex-col theme-border rounded-lg p-8 gap-4 max-md:p-4">
      <>
        <motion.div>
          <div className="h-96 w-96 overflow-hidden rounded-xl">
            <AnimatePresence>
              <motion.div
                key="mediaPlayer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <MediaPlayer
                  src={
                    'https://storage.googleapis.com/intuition-ts-assets-v1/relic_legendary_v2_compressed.mp4'
                  }
                  autoPlay
                  muted
                  loop
                  load="eager"
                >
                  <MediaProvider />
                </MediaPlayer>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </>
    </div>
  )
}
