import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function AdvocatingIntuitionSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="Advocating Intuition"
        image="/images/lore/5-rebirth.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In this quiet moment, a new chapter begins. Stepping out from the
          ancient structure, you see the world anew, enlightened by the journey
          behind you. The pyramid, more than stone and innovation, symbolizes
          the wisdom gained, a beacon guiding you forward.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The experience shared has granted you and your companions clear
          purpose. The task ahead, weaving the insights gained into everyday
          life, now feels like destiny. Together, you&apos;ve built a strong
          foundation, ready to blend intuition with technology, human essence
          with the cosmic rhythm.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Looking ahead, the path to share your journey becomes clear, a
          challenge met with unified resolve. Every step from the pyramid is a
          step towards a future where past wisdom and new possibilities unite,
          creating a world where humanity moves in harmony with the universe.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Though you&apos;ve exited The Portal, the real work begins now. With
          shared resolve and deep understanding, you move forward, ready to
          illuminate the path for others, advocating for intuition as a guide to
          a more enlightened, harmonious world.
        </Text>
      </div>
    </section>
  )
}
