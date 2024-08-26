/* eslint-disable jsx-a11y/media-has-caption */
import { useCallback, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  Icon,
  IconName,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'
import {
  RELIC_LEGENDARY_V1_MP4,
  RELIC_LEGENDARY_V2_WITH_AUDIO_MP4,
  RELIC_LEGENDARY_V3_WITH_AUDIO_MP4,
} from 'app/consts'
import { AnimatePresence, motion } from 'framer-motion'

export default function RelicOnboadingVideo({
  variant,
}: {
  variant: 'v1' | 'v2' | 'v3'
}) {
  const [isMuted, setIsMuted] = useState(false)
  const videoVolume = 0.33

  const videoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      if (node) {
        node.volume = videoVolume
      }
    },
    [videoVolume],
  )

  const navigate = useNavigate()

  const handleVideoEnd = () => {
    navigate('/the-big-bang')
  }

  const getVolumeIcon = () => {
    return isMuted ? IconName.volumeMuted : IconName.volumeFull
  }

  const relicVideo =
    variant === 'v1'
      ? RELIC_LEGENDARY_V1_MP4
      : variant === 'v2'
        ? RELIC_LEGENDARY_V2_WITH_AUDIO_MP4
        : RELIC_LEGENDARY_V3_WITH_AUDIO_MP4

  return (
    <motion.div
      key="videoPlayer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      className="relative max-w-[90vw] md:max-w-[75vw]"
    >
      <div className={cn(`overflow-hidden rounded-xl relative`)}>
        <video
          ref={videoRef}
          src={relicVideo}
          title={'Relic'}
          playsInline
          autoPlay
          muted={isMuted}
          className="rounded-xl overflow-hidden w-full h-auto max-h-[75vh] shadow-lg object-contain"
          onEnded={handleVideoEnd}
        />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute flex gap-4 bottom-4 right-4 md:bottom-6 md:right-6"
          >
            <TooltipProvider>
              <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                  <Button
                    variant={ButtonVariant.primary}
                    size={ButtonSize.iconLg}
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-primary/70"
                  >
                    <Icon
                      name={getVolumeIcon()}
                      className="h-8 w-8 md:h-10 md:w-10 fill-black"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isMuted ? 'Unmute' : 'Mute'}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                  <Button
                    variant={ButtonVariant.primary}
                    size={ButtonSize.iconLg}
                    onClick={handleVideoEnd}
                    className="bg-primary/70"
                  >
                    <Icon
                      name={IconName.chevronDoubleRight}
                      className="h-8 w-8 md:h-10 md:w-10 fill-black"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Skip</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
