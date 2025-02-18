import { useEffect, useRef, useState } from 'react'

import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { useReducedMotion } from '@lib/hooks/useReducedMotion'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ChapterHeaderProps {
  title: string
  subtitle: string
  image: string
}

export function ChapterHeader({ title, subtitle, image }: ChapterHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, headerHeight], ['0%', '-25%'])

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [])

  return (
    <div
      ref={headerRef}
      className="relative w-full h-[30vh] sm:h-[40vh] overflow-hidden bg-background mb-12 sm:mb-20"
    >
      <div className="absolute inset-0">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[125%]"
            style={{
              y: prefersReducedMotion ? '0%' : parallaxY,
            }}
          >
            <motion.img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              loading="eager"
            />
          </motion.div>
          <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        </div>
      </div>

      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <div className="max-w-[95vw] md:max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Text
              variant={TextVariant.heading2}
              weight={TextWeight.semibold}
              className="text-center text-2xl sm:text-3xl md:text-4xl"
            >
              {title}
            </Text>
          </motion.div>
          <motion.p
            className="text-lg sm:text-xl text-primary/50 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            -{'  '} {subtitle}
            {'  '}-
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
