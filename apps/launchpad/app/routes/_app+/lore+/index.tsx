import { useCallback, useEffect, useMemo, useState } from 'react'

import { cn, Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { ChapterCard } from '@components/lore/chapter-card'
import type { Chapter } from '@lib/types/lore'
import type { MetaFunction } from '@remix-run/node'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'

import '@styles/embla.css'

import { chapters } from '../../../components/lore/chapters'

export const meta: MetaFunction = () => {
  return [
    { title: 'Intuition Lore | Intuition Launchpad' },
    {
      name: 'description',
      content:
        'Explore the story of Intuition, a journey through consciousness, technology, and human potential.',
    },
    // Open Graph
    { property: 'og:title', content: 'Intuition Lore' },
    {
      property: 'og:description',
      content:
        'Explore the story of Intuition, a journey through consciousness, technology, and human potential.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: chapters[0].image },
    { property: 'og:site_name', content: 'Intuition Launchpad' },
    { property: 'og:locale', content: 'en_US' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Intuition Lore' },
    {
      name: 'twitter:description',
      content:
        'Explore the story of Intuition, a journey through consciousness, technology, and human potential.',
    },
    { name: 'twitter:image', content: chapters[0].image },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export default function LoreIndex() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const options = useMemo<EmblaOptionsType>(
    () => ({
      align: 'start',
      loop: false,
      dragFree: true,
      containScroll: 'trimSnaps',
      draggable: true,
    }),
    [],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return
      }
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
    }

    onInit()
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="max-w-4xl mx-auto text-center px-6 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Text weight={TextWeight.semibold} className="text-2xl md:text-4xl">
              Intuition Lore
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Text variant={TextVariant.body} className="text-primary/70">
              The story so far
            </Text>
          </motion.div>
        </div>

        <div className="embla">
          <div className="embla__viewport relative px-4 md:px-8" ref={emblaRef}>
            <div className="embla__container flex ml-4 md:-ml-4">
              {chapters
                .sort(
                  (a: Chapter, b: Chapter) => (a.order ?? 0) - (b.order ?? 0),
                )
                .map((chapter: Chapter, index: number) => (
                  <div
                    key={chapter.id}
                    className="embla__slide flex-[0_0_90%] min-w-0 pl-4 last:mr-8 sm:flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%]"
                  >
                    <ChapterCard order={index} chapter={chapter} />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn('h-1.5 w-1.5 rounded-full transition-colors', {
                  'bg-white': index === selectedIndex,
                  'bg-white/25': index !== selectedIndex,
                })}
                onClick={() => onDotButtonClick(index)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
