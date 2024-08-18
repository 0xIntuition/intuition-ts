import { AnimatePresence, motion } from 'framer-motion'

export default function RelicCard() {
  return (
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
              <video
                src={
                  'https://storage.googleapis.com/intuition-ts-assets-v1/relic_legendary_v2_compressed.mp4'
                }
                autoPlay
                muted
                loop
                playsInline
                className="rounded-xl overflow-hidden h-[fit] items-center justify-center theme-border"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
