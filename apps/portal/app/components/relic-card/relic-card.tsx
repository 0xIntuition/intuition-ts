import { cn } from '@0xintuition/1ui'

import {
  RELIC_LEGENDARY_V1_MP4,
  RELIC_LEGENDARY_V2_MP4,
  RELIC_LEGENDARY_V3_MP4,
} from 'app/consts'
import { AnimatePresence, motion } from 'framer-motion'

export default function RelicCard({
  variant,
  className,
}: {
  variant: 'v1' | 'v2' | 'v3'
  className?: string
}) {
  const relicVideo =
    variant === 'v1'
      ? RELIC_LEGENDARY_V1_MP4
      : variant === 'v2'
        ? RELIC_LEGENDARY_V2_MP4
        : RELIC_LEGENDARY_V3_MP4

  return (
    <>
      <motion.div>
        <div
          className={cn(
            `w-[250px] h-[250px] overflow-hidden rounded-xl`,
            className,
          )}
        >
          <AnimatePresence>
            <motion.div
              key="mediaPlayer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <video
                src={relicVideo}
                title={'Relic'}
                autoPlay
                muted
                loop
                playsInline
                className="rounded-xl overflow-hidden h-[fit] items-center justify-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
