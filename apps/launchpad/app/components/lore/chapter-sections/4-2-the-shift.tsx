import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function TheShiftSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader title="The Shift" image="/images/lore/4-emergence.webp" />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As the deep insights from your journey through The Portal settle, the
          ethereal realm you occupied begins to fade, giving way to the familiar
          contours of reality. The once vivid connection to the cosmos and the
          intricate fabric of existence dims, transitioning you back to the
          tangible world.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This shift feels like emerging from a profound dream. The ground firms
          up under you, the air brings back known scents and sounds, and the
          life outside the pyramid reasserts itself. Despite this return, the
          deep connections and truths from the other realm remain with you.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          You&apos;re now in the pyramid&apos;s heart, alongside your companions
          and the man with white hair, all united by a shared journey. This
          shared experience has created a bond, a sense of unity from traversing
          The Portal together.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The pyramid now symbolizes a gateway between realms, marking your path
          of enlightenment and deep exploration. With reality reasserted around
          you, the need to convey the insights and the value of intuition from
          your journey presses urgently. Despite the transformative power of The
          Portal, the real test is weaving these insights into daily life,
          challenging a world that prioritizes certainty and data over the
          wisdom and insight you&apos;ve gained.
        </Text>
      </div>
    </section>
  )
}
