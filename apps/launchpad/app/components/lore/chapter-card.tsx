import { cn, Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import type { Chapter } from '@lib/types/lore'
import { toRoman } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'

type ChapterCardProps = {
  chapter: Chapter
  order: number
  isSelected?: boolean
}

export function ChapterCard({
  chapter,
  order,
  isSelected = false,
}: ChapterCardProps) {
  return (
    <Link
      to={`/lore/${chapter.id}`}
      className={cn(
        'group relative block h-[72vh] md:h-[80vh] w-full overflow-hidden rounded-2xl bg-black/20 transition-all duration-300 hover:scale-[1.02]',
        isSelected && 'ring-2 ring-primary',
      )}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <img
          src={chapter.image}
          alt={chapter.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 gap-4"
        >
          <div className="flex flex-row gap-2 items-center border-b border-border/10 w-fit pb-2">
            <div
              className={cn(
                'w-10 h-10 rounded flex items-center justify-center z-10 text-primary primary-gradient-subtle border border-border/10',
              )}
            >
              <Text
                variant={TextVariant.headline}
                className="font-medium font-serif"
              >
                {toRoman(+order + 1)}
              </Text>
            </div>
            <Text variant={TextVariant.heading5} weight={TextWeight.semibold}>
              {chapter.title}
            </Text>
          </div>
          <Text variant={TextVariant.body} className="mt-2 text-white/60">
            {chapter.description}
          </Text>
        </motion.div>
      </div>
    </Link>
  )
}
