import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function TheThresholdSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Threshold"
        image="/images/lore/3-transcendence.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Standing united with your chosen companions, the air around The Portal
          vibrates with the energy of collective resolve. The man with the white
          hair offers a nod, a silent salute to the courage that binds you
          together at this threshold.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In unison, you step into The Portal. The experience transcends
          physicality, a fusion of light and sound enveloping you, erasing the
          boundaries of self. The Portal&apos;s symbols swirl, a dance of light
          that encircles the group, a tangible manifestation of unity.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Your body and the world around you fade away. You are still
          &apos;you&apos;, but you are consciousness and will alone. You exist
          in a fractal plane of everything, your concept and presence of the
          physical world no longer existent. The vastness of the universe is
          revealed to you; infinite cogs in infinite machines, of which you are
          but one Atom - a spec, a light - yet powerful. For your will and your
          consciousness, you realize, is the power that shapes the universe.
        </Text>
      </div>
    </section>
  )
}
