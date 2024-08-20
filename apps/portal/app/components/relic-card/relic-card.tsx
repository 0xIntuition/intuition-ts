import { RELIC_LEGENDARY_V1_MP4 } from 'app/consts'
import { AnimatePresence, motion } from 'framer-motion'

export default function RelicCard() {
  return (
    <>
      <motion.div>
        <div className="w-[250px] h-[250px] overflow-hidden rounded-xl">
          <AnimatePresence>
            <motion.div
              key="mediaPlayer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <video
                src={RELIC_LEGENDARY_V1_MP4}
                title={'Relic'}
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
