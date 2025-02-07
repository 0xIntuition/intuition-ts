import { useRef } from 'react'

import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { useReducedMotion } from '@lib/hooks/useReducedMotion'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  image: string
  className?: string
}

export function SectionHeader({ title, image, className }: SectionHeaderProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <div
      ref={sectionRef}
      className={`relative h-[80px] overflow-hidden ${className}`}
    >
      <div className="absolute inset-0">
        {/* Container for parallax image */}
        <motion.div
          className="absolute inset-0 h-[150%]"
          style={{
            y: prefersReducedMotion ? '0%' : parallaxY,
          }}
        >
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover object-center opacity-20"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Text
          variant={TextVariant.headline}
          weight={TextWeight.semibold}
          className="text-primary/90"
        >
          {title}
        </Text>
      </motion.div>
    </div>
  )
}
