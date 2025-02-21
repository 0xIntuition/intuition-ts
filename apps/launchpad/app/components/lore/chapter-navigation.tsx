import { Text, TextVariant, Trunctacular } from '@0xintuition/1ui'

import type { Chapter } from '@lib/types/lore'
import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface NavigationItem {
  id: string
  title: string
  order?: number
}

interface NavigationProps {
  prevItem?: NavigationItem
  nextItem?: NavigationItem
  type: 'chapter' | 'question'
  baseUrl: string
}

export function Navigation({
  prevItem,
  nextItem,
  type,
  baseUrl,
}: NavigationProps) {
  const labels = {
    chapter: {
      prev: 'Previous Chapter',
      next: 'Next Chapter',
      all: 'All Chapters',
    },
    question: {
      prev: 'Previous Question',
      next: 'Next Question',
      all: 'All Questions',
    },
  }

  return (
    <div className="fixed bottom-0 left-0 md:left-[256px] right-0 z-20">
      <div className="w-full h-16 sm:h-24 bg-black/5 backdrop-blur-md backdrop-saturate-150 border-t border-border/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-[95vw] md:max-w-4xl mx-auto h-full px-4 sm:px-8 grid grid-cols-3 items-center"
        >
          {prevItem ? (
            <Link
              to={`${baseUrl}/${prevItem.id}`}
              className="group flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label={`${labels[type].prev}: ${prevItem.title}`}
            >
              <motion.div
                whileHover={{ x: -4 }}
                className="p-2 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
              <div className="text-right">
                <Text
                  variant={TextVariant.small}
                  className="hidden sm:block opacity-60"
                >
                  {labels[type].prev}
                </Text>
                <Trunctacular
                  variant={TextVariant.footnote}
                  className="hidden sm:block font-medium"
                  value={prevItem.title}
                  maxStringLength={36}
                />
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            to={baseUrl}
            className="justify-self-center px-6 py-2.5 text-foreground/60 hover:text-foreground transition-colors bg-primary/5 hover:bg-primary/10 rounded-full"
          >
            <Text variant={TextVariant.footnote} className="whitespace-nowrap">
              {labels[type].all}
            </Text>
          </Link>

          {nextItem ? (
            <Link
              to={`${baseUrl}/${nextItem.id}`}
              className="group flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors justify-self-end"
              aria-label={`${labels[type].next}: ${nextItem.title}`}
            >
              <div className="text-left">
                <Text
                  variant={TextVariant.small}
                  className="hidden sm:block opacity-60"
                >
                  {labels[type].next}
                </Text>
                <Trunctacular
                  variant={TextVariant.footnote}
                  className="hidden sm:block font-medium"
                  value={nextItem.title}
                  maxStringLength={36}
                />
              </div>
              <motion.div
                whileHover={{ x: 4 }}
                className="p-2 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </div>
    </div>
  )
}

// For backward compatibility
export function ChapterNavigation({
  prevChapter,
  nextChapter,
}: {
  prevChapter?: Chapter
  nextChapter?: Chapter
}) {
  return (
    <Navigation
      prevItem={prevChapter}
      nextItem={nextChapter}
      type="chapter"
      baseUrl="/lore"
    />
  )
}
