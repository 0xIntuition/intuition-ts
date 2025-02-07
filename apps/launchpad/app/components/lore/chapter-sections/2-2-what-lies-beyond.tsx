import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function WhatLiesBeyondSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="What Lies Beyond"
        image="/images/lore/2-lost-origins.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As you approach the entrance to the room, the man gestures towards the
          symbols on its walls, pulsing with a soft, rhythmic light. Certain
          letters stick out to you, thats odd. &quot;This,&quot; he says,
          &quot;is more than a mere doorway. It&apos;s a crucible for change. To
          pass through, you must offer something of yourself – a belief, a
          memory, a part of your identity. It&apos;s a sacrifice, but in return,
          you&apos;ll be ready for for what lies beyond.&quot;
        </Text>
      </div>
    </section>
  )
}
