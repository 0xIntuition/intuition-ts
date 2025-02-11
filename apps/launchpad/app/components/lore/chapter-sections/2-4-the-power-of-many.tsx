import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function ThePowerOfManySection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Power of Many"
        image="/images/lore/2-lost-origins.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          At The Portal&apos;s edge, the white-haired man pauses, his tone
          solemn. &quot;This journey begins with a relinquishing of
          individualism,&quot; he states. &quot;To progress, you must find
          others to join you,&quot; highlighting the journey&apos;s inherent
          communal nature.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          He observes the chamber&apos;s occupants, united by a shared mission,
          echoing ancient wisdom of enlightenment through unity, countering the
          isolation fostered by modern society and advocating for a return to
          collective values and togetherness.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Looking around, you begin to see not strangers, but future companions,
          each essential for the journey ahead. This search for allies becomes a
          crucial step in your path, a commitment to the vision of a future
          founded on unity and shared goals.
        </Text>
      </div>
    </section>
  )
}
