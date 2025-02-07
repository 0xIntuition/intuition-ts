import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function UniqueJourneySection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="A Unique Journey"
        image="/images/lore/3-transcendence.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          You have dissolved into a field of pure consciousness, the energy
          grid, the fabric of space-time itself. And although there is both
          everything and nothing all at once, you feel a presence around you
          that is viscerally distinct from yourself, another consciousness
          floating amongst the endless vastness of a fractal dimension.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Without words - just a sense of knowing - this &apos;other&apos; makes
          a request of you, seemingly gatekeeping what lies beyond. What is
          requested is &apos;proof of humanity&apos;.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In this vast expanse where the very essence of existence intertwines,
          where you are both a drop in the ocean and the ocean itself, the
          request for &apos;proof of humanity&apos; resonates deeply within you.
          It&apos;s a paradoxical challenge, given the unity of all things in
          this field of consciousness, yet it&apos;s a distinction that seeks to
          affirm your unique journey as a human being amidst the infinite.
        </Text>
      </div>
    </section>
  )
}
