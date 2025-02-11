import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function UnspokenTruthsSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="Unspoken Truths"
        image="/images/lore/4-emergence.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          A profound silence envelops the space around you. It&apos;s a silence
          filled with anticipation, as if the universe itself is pausing to
          reflect on the narrative you&apos;ve woven. In this moment of
          stillness, a deep realization washes over you—the importance of your
          intuition.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Intuition, that inner voice often drowned out by the cacophony of
          daily life, had guided you to this pivotal moment. It was intuition
          that nudged you towards the resistance, that led you to the ancient
          pyramid, and that helped you select the ten companions for your
          journey through The Portal. More than ever, you understand that
          intuition is not just a whisper in the mind; it&apos;s a powerful
          force, a compass guiding you through the complexities of existence.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This realization is accompanied by a sense of urgency, a compelling
          need to share this insight with the world. In a reality where humanity
          has increasingly outsourced its decision-making to algorithms and
          artificial intelligence, the value of human intuition has been
          undermined, its voice quieted in the pursuit of efficiency and
          certainty. You see now that reclaiming this intuitive power is
          essential for the future of humanity, for it represents a connection
          to something beyond data and logic—a connection to the essence of
          being human.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          You envision a world where intuition is recognized as a vital
          component of human consciousness, where individuals are encouraged to
          listen to their inner voices as much as they engage with the external
          world. Your realizations fill you with newfound purpose. With a sense
          of clarity and determination, you set out to share your vision,
          hopeful that it will ignite a spark of recognition in others,
          encouraging them to listen to their inner voices and, in doing so,
          rediscover the depth and richness of what it means to be truly human.
        </Text>
      </div>
    </section>
  )
}
