import type { Chapter } from '@lib/types/lore'
import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ChapterNavigationProps {
  prevChapter?: Chapter
  nextChapter?: Chapter
}

export function ChapterNavigation({
  prevChapter,
  nextChapter,
}: ChapterNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 md:left-[256px] right-0 z-20">
      <div className="w-full h-16 sm:h-24 bg-background/80 backdrop-blur-md border-t border-border/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-[95vw] md:max-w-4xl mx-auto h-full px-4 sm:px-8 grid grid-cols-3 items-center"
        >
          {prevChapter ? (
            <Link
              to={`/lore/${prevChapter.id}`}
              className="group flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label={`Previous Chapter: ${prevChapter.title}`}
            >
              <motion.div
                whileHover={{ x: -4 }}
                className="p-2 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
              <div className="text-right">
                <div className="hidden sm:block text-sm opacity-60">
                  Previous Chapter
                </div>
                <div className="hidden sm:block font-medium">
                  {prevChapter.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            to="/lore"
            className="justify-self-center px-6 py-2.5 text-sm text-foreground/60 hover:text-foreground transition-colors bg-primary/5 hover:bg-primary/10 rounded-full"
          >
            All Chapters
          </Link>

          {nextChapter ? (
            <Link
              to={`/lore/${nextChapter.id}`}
              className="group flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors justify-self-end"
              aria-label={`Next Chapter: ${nextChapter.title}`}
            >
              <div className="text-left">
                <div className="hidden sm:block text-sm opacity-60">
                  Next Chapter
                </div>
                <div className="hidden sm:block font-medium">
                  {nextChapter.title}
                </div>
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
